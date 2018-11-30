module.exports = function babelConfig(api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'@assets': './assets',
						'@components': './components',
						'@constants': './constants',
						'@forms': './forms',
						'@screens': './screens',
						'@state': './state',
					},
				},
			],
		],
	};
};
