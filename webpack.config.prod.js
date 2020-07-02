const merge = require('webpack-merge');
const common = require('./webpack.config');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        nodeEnv: 'production', // Removes checks and warnings usually unnecessary in production
        minimize: true,
        minimizer: [new TerserPlugin({ sourceMap: true })],
    },
});
