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

function mapTemplateToContext({ parentName, templateName }) {
	return {
		'action-async': `${REDUCERS_PATH}/${parentName}/actions`,
		'action-sync': `${REDUCERS_PATH}/${parentName}/actions`,
		reducer: REDUCERS_PATH,
		component: COMPONENTS_PATH,
		container: CONTAINERS_PATH,
	}[templateName];
};

(async function interactiveGenerator() {
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
	// Base yeoman commands
	const commands = [
		YEOMAN_PATH,
		'tvg-react-templates',
		`--moduleName=${moduleName}`,
		`--templateName=${templateName}`,
		`--parentName=${parentName}`,
		`--context=${mapTemplateToContext({ parentName, templateName })}`,
	];
	// Throw error for action with no parent
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
	execSync(commands.join(' '), { stdio: [0, 1, 2] });
})();