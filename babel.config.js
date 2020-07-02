module.exports = function(api) {
    api.cache(true);

    const presets = ['@babel/preset-env'];
    const plugins = [
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-runtime',
        'syntax-dynamic-import',
    ];

    return {
        presets,
        plugins,
    };
};
