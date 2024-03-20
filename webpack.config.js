const path                      = require('path');
const webpack                   = require('webpack');
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',

    devtool: 'eval-source-map',

    devServer: {
        hot: true,
        port: 3000,
        open: true,
        compress: true,
        static: './public',
        historyApiFallback: true,
        client: {
            overlay: false
        }
    },

    entry: [path.resolve(__dirname, './src/main.js')],

    output: {
        path      : path.join(__dirname, '/public'),
        filename  : 'build.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')()]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(otf|eot|ttf|ttc|woff|woff2|jpe?g|png|gif)$/,
                exclude: /node_modules/,
                type: 'asset'
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: { namedExport: 'Icon' }
                    }, 
                    'url-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                STATIC_PATH: JSON.stringify('/static/images/')
            }
        }),
        new HtmlWebpackPlugin({
            template : path.resolve(__dirname, 'etc', 'template.html'),
            filename : 'index.html'
        }),
        new ReactRefreshWebpackPlugin()
    ]
};
