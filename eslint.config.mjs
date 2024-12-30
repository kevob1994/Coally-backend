import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: { globals: globals.browser },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            import: eslintPluginImport,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
        },
    },
    {
        ignores: ['dist/**', '*.mjs'],
    },
];
