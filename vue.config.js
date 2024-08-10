const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	pages: {
		index: {
			entry: 'src/main.js',
			title: 'ToDo Card List',
		},
	},
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
});
