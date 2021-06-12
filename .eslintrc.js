module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    plugins: ['prettier', 'unicorn'],
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'error',
        'prefer-const': 'error',
        'unicorn/filename-case': [
            'error',
            {
                case: 'kebabCase',
            },
        ],
        'unicorn/no-abusive-eslint-disable': 'error',
    },
    overrides: [
        {
            // unit test overrides
            files: ['jest-config/*', '*.spec.js'],
            plugins: ['jest'],
            extends: ['plugin:jest/recommended'],
            env: {
                jest: true,
            },
        },
    ],
};
