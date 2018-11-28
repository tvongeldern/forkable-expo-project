import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { lstatSync, readdirSync } from 'fs';
import { prompt } from 'inquirer';
import camelcase from 'camelcase';
import chalk from 'chalk';

// Filepaths
const ROOT_PATH = path.join(__dirname, '../');
const YEOMAN_PATH = `${ROOT_PATH}/node_modules/.bin/yo`;
const COMPONENTS_PATH = `${ROOT_PATH}/components`;
const CONTAINERS_PATH = `${ROOT_PATH}/screens`;
const STATE_PATH = `${ROOT_PATH}/state`;
const REDUCERS_PATH = `${STATE_PATH}/reducers`;
// File system state
const EXISTING_REDUCER_NAMES = readdirSync(REDUCERS_PATH)
	.filter(filename => lstatSync(path.join(REDUCERS_PATH, filename)).isDirectory());
// Parsed input
const TEMPLATE_NAME = process.argv[2];
// Validation lists
const VALID_TEMPLATE_NAMES = [
	'component',
	'container',
	'action-async',
	'reducer',
	'action-sync',
];
const PASCAL_CASE_TEMPLATES = [
	'component',
	'container',
];
// Standard outputs
const COMMENT_WARNING = `/*
*  This file is dynamically updated.
*  Try to avoid manually updating this file, instead,
*  try using [npm run gen] script.
*/
`;

/*
*	Private methods
*/

// Maps Yeoman template names
// to their appropriate directory in this repository
function mapTemplateToContext({ parentName, templateName }) {
	return {
		'action-async': `${REDUCERS_PATH}/${parentName}/actions`,
		'action-sync': `${REDUCERS_PATH}/${parentName}/actions`,
		reducer: REDUCERS_PATH,
		component: COMPONENTS_PATH,
		container: CONTAINERS_PATH,
	}[templateName];
};

// Updates the proper index file to make sure that newly created modules
// are properly imported/exported to be useful
function updateExportFile({ templateName, moduleName, parentName, fileName, importName }) {
	const INDEX_PATH = `${mapTemplateToContext({ parentName, templateName })}/${fileName}`;
	const indexFileText = readFileSync(INDEX_PATH, 'utf8');
	// Split index file text into an array of export lines
	const exportLines = indexFileText.split('export')
		.filter(line => line.includes(' from ')) // filter out non-export lines
		.map(line => `export ${line.trim().replace(/\;/g, '')};`); // format export lines
	// Add comment at beginning of file
	exportLines.unshift(COMMENT_WARNING);
	// Add new export line at end of file
	if (templateName.includes('action')) {
		exportLines.push(`export { ${importName} as ${moduleName} } from './${moduleName}';`);
	} else if (templateName !== 'reducer') {
		exportLines.push(`export ${moduleName} from './${moduleName}';`);
	} else {
		exportLines.push(`export { reducer as ${moduleName} } from './${moduleName}';`);
	}
	// Join into a string
	const updatedIndexFileText = exportLines.join('\n') + '\n';
	// Write back to index file
	return writeFileSync(INDEX_PATH, updatedIndexFileText);
}

(async function interactiveGenerator() {
	// Interactive prompt menu
	const { moduleName, templateName = TEMPLATE_NAME, parentName } = await prompt([
		// Get template name (if applicable)
		{
			type: 'list',
			name: 'templateName',
			message: 'What are you trying to generate?',
			choices: VALID_TEMPLATE_NAMES,
			when: () => !TEMPLATE_NAME,
		},
		// Get module name
		{
			type: 'input',
			name: 'moduleName',
			message: ({ templateName = TEMPLATE_NAME }) => `What would you like to name your ${templateName}?`,
			validate: (input, { templateName = TEMPLATE_NAME }) => {
				const pascalCase = PASCAL_CASE_TEMPLATES.includes(templateName);
				if (camelcase(input, { pascalCase }) === input) {
					return true;
				}
				return `${templateName}s must be in ${pascalCase ? 'pascal' : 'camel'} case`;
			},
		},
		// Get parentName (if applicable)
		{
			type: 'list',
			name: 'parentName',
			message: 'What is the parent reducer of this action?',
			choices: EXISTING_REDUCER_NAMES,
			when: ({ templateName = TEMPLATE_NAME }) => templateName.includes('action') && EXISTING_REDUCER_NAMES.length > 0,
		},
	]);

	// Handle action with no parent
	if (templateName.includes('action')) {
		if (!parentName) {
			return console.error(
				'\n',
				chalk.red('ERROR'),
				'Must specify parent reducer when creating a Redux action.',
				'If no reducers have been created yet, then create one.',
				'\n',
			);
		}
	};

	// Build and execute Yeoman command
	const context = mapTemplateToContext({ parentName, templateName });
	const commands = [
		YEOMAN_PATH,
		'tvg-react-templates',
		`--moduleName=${moduleName}`,
		`--templateName=${templateName}`,
		`--parentName=${parentName}`,
		`--context=${context}`,
	];
	execSync(commands.join(' '), { stdio: [0, 1, 2] });

	// Update export files
	updateExportFile({ templateName, moduleName, parentName, fileName: 'index.js', importName: 'actionCreator' });
	// additional export file update for redux actions
	if (templateName.includes('action')) {
		updateExportFile({ templateName, moduleName, parentName, fileName: 'reducers.js', importName: 'reducer' });
	}
})();
