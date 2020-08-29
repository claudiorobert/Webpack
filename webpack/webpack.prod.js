const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const common = require("./webpack.common");
const {merge}= require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",

    module: {
        rules: [

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browser: ["last 13 versions"]
                            },
                            plugins: () => [
                                autoprefixer
                            ]
                        }
                    },
                    'sass-loader',
                ],
            },/*Sass Build*/

            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[contentHash].[ext]',
                            outputPath: 'img/',
                            useRelativePath: true,
                            //publicPath: "",
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            
            }/*Image Build*/


        ]
    },

    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({

                template: './src/views/index.html',
                filename: 'index.[hash].html',
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    caseSensitive: true,
                    removeComments: true,
                    removeEmptyElements: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                    removeAttributeQuotes: true,
                },

            }),

        ]
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: "style.[contentHash].css",
            //chunkFilename: "[id].css"
        })
    ],

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].[contentHash].bundle.js",
    },

});


