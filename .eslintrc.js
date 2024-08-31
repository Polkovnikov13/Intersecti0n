module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'eslint-disable @typescript-eslint/no-non-null-assertion': 'off',
    'eslint-disable @typescript-eslint/restrict-template-expressions': 'off',
    'eslint-disable @typescript-eslint/no-non-null-assertion' : 'off',
    'eslint-disable @typescript-eslint/no-unsafe-argument' : 'off',
    'eslint-disable @typescript-eslint/strict-boolean-expressions' : 'off',
    'eslint-disable @typescript-eslint/restrict-template-expressions' : 'off',
    'eslint-disable @typescript-eslint/no-non-null-assertion' : 'off',
    'eslint-disable @typescript-eslint/strict-boolean-expressions': 'off',
    'eslint-disable @typescript-eslint/no-non-null-assertion': 'off',
    'eslint-disable @typescript-eslint/strict-boolean-expressions' : 'off',
    }
}
