module.exports = {
	extends: ['airbnb', 'plugin:react-native/all'],
	parser: 'babel-eslint',
	env: {
		jest: true,
		browser: true,
		node: true,
		'react-native/react-native': true,
	},
	settings: {
		'import/resolver': {
			node: {
				paths: [
					'./',
					'node_modules',
				],
				alias: [
					['@components', './components'],
				],
				extensions: ['', '.json', '.js', '.jsx']
			}
		}
	},
	plugins: ['react-native'],
	rules: {
		indent: ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'no-tabs': 0,
		'react/jsx-filename-extension': 0,
		'import/no-unresolved': 1, // eslint config cannot handle aliases with the @ character in them
		'react/forbid-prop-types': 0,
		'arrow-parens': 0,
		'class-methods-use-this': 1,
		'react/jsx-closing-bracket-location': 0,
		'react/jsx-indent-props': [1, 'tab'],
		'prefer-promise-reject-errors': 0,
		'arrow-body-style': 1,
	},
};