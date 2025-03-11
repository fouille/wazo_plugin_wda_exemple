const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    performance: {},
    devtool: "source-map",
    entry: {
        app: [path.resolve(__dirname, "src", "app", "index.js")]
      },
    devServer: {
        host: 'localhost',
        port: "3000",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "app", "index.html"),
            filename: "app/index.html",
            chunks: ["app"],
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "routeur", "index.html"),
            filename: "routeur/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json', to: 'manifest.json' },
                { from: './src/openurl.js', to: 'openurl.js' }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                // include: [
                //     path.resolve(__dirname, 'assets')
                // ],
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
                generator: {
                    dataUrl(content) {
                    content = content.toString();
                    return miniSVGDataURI(content);
                    }
                },
                use: 'svgo-loader'
            },
            {
                test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
                include: [
                    path.resolve(__dirname, 'assets/img')
                ],
                type: 'asset'
            }

        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
    } else {
        config.mode = 'development';
    }
    return config;
};