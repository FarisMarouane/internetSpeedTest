const path = require('path');

module.exports = {
    target: 'node',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
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
    resolve: {
        extensions: ['.js'],
    },
    node: { fs: 'empty', net: 'empty', tls: 'empty' },
};
