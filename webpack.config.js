const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'internetSpeed.js',
        library: 'internetSpeed',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-numeric-separator',
                            '@babel/plugin-proposal-optional-chaining',
                            '@babel/plugin-transform-runtime',
                            'syntax-dynamic-import',
                        ],
                    },
                },
            },
            {
                test: /\.random$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
    resolve: {
        extensions: ['.js'],
    },
    node: { fs: 'empty', net: 'empty', tls: 'empty', __dirname: false },
};
