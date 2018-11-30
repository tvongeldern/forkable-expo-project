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
		'arrow-parens': 'as-needed',
	},
};