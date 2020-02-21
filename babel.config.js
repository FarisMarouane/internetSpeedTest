module.exports = function(api) {
    api.cache(true);

    const presets = ['@babel/preset-env'];
    const plugins = ['@babel/plugin-proposal-numeric-separator'];

    return {
        presets,
        plugins,
    };
};
