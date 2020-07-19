const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const env = process.env.NODE_ENV;

const devWebpackConfig = merge(baseWebpackConfig, {
	mode: env || 'development',
	devtool: 'cheap-module-eval-source-map',
	watch: true,
	/*devServer: {
		//даже не запускается
		contentBase: '../var/public/build',//baseWebpackConfig.externals.paths.build,
		//allowedHosts: 'vopros.ru.local',
		//compress: true,
		host: 'http://vopros.ru.local/',
		port: 8081,
		overlay: {
			warnings: false,
			errors: true
		},
		//publicPath: 'http://localhost:8081/var/public/build/',
    proxy: [
      {
        path: /./,
        target: "http://vopros.ru.local"
      }
    ]
	},*/
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		})
	]
});

module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig);
});
