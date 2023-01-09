module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'generator-star-spacing': 'off',
        'no-mixed-operators': 0,
        'no-trailing-spaces': 0,
        'key-spacing': 0,
        'space-before-blocks': 1,
        'comma-spacing': 1,
        'brace-style': 1,
        'object-curly-spacing': 0,
        'vue/html-indent': 0,
        'vue/multi-word-component-names': ['error', {
            'ignores': ['index', 'Board']
        }],
        'vue/attribute-hyphenation': 0,
        'vue/html-self-closing': 0,
        'vue/component-name-in-template-casing': 0,
        'vue/html-closing-bracket-spacing': 0,
        'vue/singleline-html-element-content-newline': 0,
        'vue/no-unused-components': 0,
        'vue/multiline-html-element-content-newline': 0,
        'vue/no-use-v-if-with-v-for': 0,
        'vue/html-closing-bracket-newline': 0,
        'vue/no-parsing-error': 0,
        'no-tabs': 0,
        'space-before-function-paren': 0,
        'comma-dangle': 0,
        'eol-last': 0,
        'vue/require-default-prop': 0,
        'quotes': [
            2,
            'single',
            {
                'avoidEscape': true,
                'allowTemplateLiterals': true
            }
        ],
        'semi': [
            0,
            'never',
            {
                'beforeStatementContinuationChars': 'never'
            }
        ],
        'no-delete-var': 2,
        'prefer-const': [
            2,
            {
                'ignoreReadBeforeAssign': false
            }
        ],
        'template-curly-spacing': 'off',
        'indent': 'off'
    },
    overrides: [{
        files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
            jest: true
        }
    }]
}