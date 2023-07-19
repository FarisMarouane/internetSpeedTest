module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
    ],
    parser: 'babel-eslint',
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        'react/prop-types': 0,
    },
};
