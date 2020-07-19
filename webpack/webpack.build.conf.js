const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const env = process.env.NODE_ENV;

const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: env || 'production',
	plugins: []
});

module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig);
});
