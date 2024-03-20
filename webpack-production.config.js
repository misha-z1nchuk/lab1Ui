const path                 = require('path');
const webpack              = require('webpack');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// eslint-disable-next-line import/no-commonjs
module.exports = {
    mode : 'production',

    entry : [ path.resolve(__dirname, './src/main.js') ],

    output : {
        path       : path.join(__dirname, '/public/static/build'),
        filename   : '[name].[fullhash].js',
        publicPath : '/static/build/'
    },

    module : {
        rules : [
            {
                test    : /\.js$/,
                exclude : /node_modules/,
                use     : [ 'babel-loader' ]
            },
            {
                test : /\.css$/,
                use  : [ 'style-loader', 'css-loader' ]
            },
            {
                test    : /\.less$/,
                exclude : /node_modules/,
                use     : [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader  : 'less-loader',
                        options : {
                            lessOptions : {
                                javascriptEnabled : true
                            }
                        }
                    },
                    {
                        loader  : 'postcss-loader',
                        options : {
                            postcssOptions : {
                                plugins : [ require('autoprefixer')() ]
                            }
                        }
                    }
                ]
            },
            {
                test    : /\.(otf|eot|ttf|ttc|woff|woff2|jpe?g|png|gif)$/,
                exclude : /node_modules/,
                type    : 'asset'
            },
            {
                test    : /\.svg$/,
                exclude : /node_modules/,
                use     : [
                    {
                        loader  : '@svgr/webpack',
                        options : { namedExport: 'Icon' }
                    },
                    'url-loader'
                ]
            }
        ]
    },

    plugins : [
        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV    : JSON.stringify(process.env.NODE_ENV || 'production'),
                STATIC_PATH : JSON.stringify('/static/images/')
            }
        }),
        new HtmlWebpackPlugin({
            template : path.resolve(__dirname, './etc/template.html'),
            filename : path.resolve(__dirname, './public/index.html'),
            inject   : 'body'
        }),
        new MiniCssExtractPlugin({
            filename : '[name].[fullhash].css'
        })
    ],

    optimization : {
        splitChunks : {
            chunks : 'all'
        }
    }
};
