const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, '../src'),
	build: path.join(__dirname, '../public/build'),
	public: path.join(__dirname, '../public'),
	assets: 'assets/',
	static: ''
};

module.exports = {
	externals: {
		paths: PATHS
	},
	//entry: {
	//index: PATHS.src,
	//test: /test\.js/.test(glob.sync(`${PATHS.src}/**.js`))?`${PATHS.src}/test.js`:PATHS.src
	//},
	entry: glob.sync(`${PATHS.src}/**.js`).reduce((acc, pathGlob) => {
		const entry = pathGlob.match(/\w+\/(?<name>\w+).js$/)[1];
		acc[entry] = pathGlob;
		return acc;
	}, {}),
	output: {
		filename: (process.env.NODE_ENV === 'development') ? `${PATHS.assets}js/[name].js` : `${PATHS.assets}js/[name].[contenthash].js`,
		path: PATHS.build,
		publicPath: `${PATHS.build}/`
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		},
    usedExports: true
  },
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
					}
				],
				exclude: '/node_modules/'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
              //hmr: process.env.NODE_ENV === 'development',
              // if Hot Module Reloading does not work, this is a forceful method.
              //reloadAll: true,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: { path: `${PATHS.src}/postcss/postcss.config.js` }
						}
					}
				]
			},
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: { path: `${PATHS.src}/postcss/postcss.config.js` }
						}
					},
					{
						loader: 'stylus-loader',
						options: { sourceMap: true }
					}
				]
			},
      {
        test: /\.(svg|eot|ttf|woff|woff2|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `/${PATHS.assets}fonts/`,
              publicPath: `/build/${PATHS.assets}fonts/`,
              limit: 8192
            }
          }
        ]
      },
			{
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `/${PATHS.assets}images`,
              publicPath: `/build/${PATHS.assets}images`,
              limit: 8192
            }
          }
				]
			}
		]
	},
	plugins: [
    new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: (process.env.NODE_ENV === 'development') ? `${PATHS.assets}css/[name].css` : `${PATHS.assets}css/[name].[contenthash].css`,
		}),
		//new CopyWebpackPlugin([
		//	{ from: `${PATHS.src}/${PATHS.assets}`, to: `${PATHS.public}/static` }
		//]),
    new ManifestPlugin({
      publicPath: '/build/',
		})
	]
};
