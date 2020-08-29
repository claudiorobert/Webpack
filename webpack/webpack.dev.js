const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const common = require("./webpack.common");
const {merge}= require("webpack-merge");

module.exports = merge(common, {
    mode: "development",

    devtool: 'source-map',
    devServer: {
        port: 3555,/*Aqui você pôde alterar a Porta do Server*/
        open: true,
        hot:true,
        contentBase: './views/',
        watchContentBase: true,
    },
    module: {
        rules: [

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader", //3. Inject styles into DOM
                    "css-loader", //2. Turns css into commonjs
                    "sass-loader" //1. Turns sass into css
                ]
            },/*Sass|Css Dev*/

            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/',
                            useRelativePath: true
                        }
                    },
                ]
            },/*Image Dev*/

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: './src/views/index.html'}),
        new webpack.HotModuleReplacementPlugin({})
    ],

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/bundle.js'
    },

    target:"web"
});