const path = require('path');


module.exports = {
    entry: './src/js/script.js',

    module: {
        rules: [

            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },/*Babel-Loader*/

          

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },/*File-Loader*/


            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: {
                        list: [
                      
                            '...',
                            {
                                tag: 'img',
                                attribute: 'data-src',
                                type: 'src',
                            },
                            {
                             tag: 'img',
                             attribute: 'data-srcset',
                             type: 'srcset',
                            },
                            {
                                
                                tag: 'link',
                                attribute: 'href',
                                type: 'src',
                        
                                filter: (tag, attribute, attributes, resourcePath) => {       
                                    if (/my-html\.html$/.test(resourcePath)) {
                                        return false;
                                    }
        
                                    if (!/stylesheet/i.test(attributes.rel)) {
                                        return false;
                                    }
        
                                    if (
                                        attributes.type &&
                                        attributes.type.trim().toLowerCase() !== 'text/css'
                                    ) {
                                        return false;
                                    }
        
                                    return true;
                                },
                            },
                        ],
                    },
                },
            },/*Html-Loader*/



        ]
    },
    plugins: [

    ]
};