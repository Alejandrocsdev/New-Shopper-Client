import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from './prettier.config.mjs'

export default [
  {
    files: ['**/*.{mjs,jsx}'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: {
          jsx: true // Parsing error: Unexpected token <
        }
      }
    },
    settings: {
      react: {
        version: 'detect' // Warning: React version not specified in eslint-plugin-react settings.
      }
    },
    plugins: {
      prettier: prettierPlugin,
      react: pluginReact
    },
    ignores: ['node_modules/', 'dist/'],
    rules: {
      'prettier/prettier': ['error', prettierConfig],
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    }
  }
]
