const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    devtool: 'source-map',
    devServer:
    {
        contentBase: './dist',
        open: true,
        hot: true
    },

    plugins:
    [
        new CopyWebpackPlugin([ { from: 'static' } ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../src/index.html'),
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../src/pages/about.html'),
            inject: true,
            chunks: ['about'],
            filename:'about.html'
        })
    ],

    entry: {
        index: './src/index.js',
        about:'./src/js/about.js'
    },
    output:
    {
        filename: 'bundle.[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    module:
    {
        rules:
        [
            {
                test: /\.js*/,
                use:
                [
                    'babel-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|ico)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    }
}