module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    plugins: ['prettier', 'import', 'unicorn'],
    extends: ['eslint:recommended', 'plugin:node/recommended'],
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
        'unicorn/explicit-length-check': 'error',
        'no-useless-rename': 'error',
        'import/no-cycle': 'error',
        'import/order': ['error', {}],
        'import/newline-after-import': 'error',
        'import/group-exports': 'error',
        'node/prefer-promises/fs': 'error',
        'node/exports-style': ['error', 'module.exports'],
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
