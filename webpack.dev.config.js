const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//--watch
module.exports = {
	entry: {
		main: ["@babel/polyfill", "whatwg-fetch", "./src/public/index.js"],
	},
	output: {
		path: path.join(__dirname, 'dist/public/'),
		publicPath: "",
		filename: "js/[name].js"
	},
	target: 'web',
	devtool: "#source-map",
	module: {
		rules: [
			{
				// компиляция из es6+ в es5
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
            },
			{
				test: /\.html$/,
				use: {
					loader: "html-loader"
				}
            },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
            },
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
            },
			{
				test: /\.ttf$/,
				use: [
					{
						loader: 'ttf-loader',
						options: {
							name: './font/[hash].[ext]',
						},
            },
          ]
      }
        ]
	},
	plugins: [
//        new HtmlWebpackPlugin({
//			template: 'src/public/index.html',
//			filename: 'index.html',
//			excludeChunks: ['server']
//		}),
		new CopyPlugin([
			{
				from: 'src/public/img/',
				to: 'img/[name].[ext]',
				toType: 'template'
            }
        ]),
		new CopyPlugin([
			{
				from: 'src/public/fonts/',
				to: 'fonts/[name].[ext]',
				toType: 'template'
            }
        ]),
		new CopyPlugin([
			{
				from: 'src/public/pages/',
				to: 'pages/[name].[ext]',
				toType: 'template'
            }
        ]),
		new CopyPlugin([
			{
				from: 'src/public/css/',
				to: 'css/[name].[ext]',
				toType: 'template'
            }
        ]),
		new CopyPlugin([
			{
				from: 'src/public/templates/',
				to: 'templates/[name].[ext]',
				toType: 'template'
            }
        ])
    ]
}
