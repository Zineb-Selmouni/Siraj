import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

/**
 * Configuration ESLint (format « flat »).
 *
 * Le typage est déjà vérifié par `tsc` : ESLint ne le double pas. Il couvre
 * ce que le compilateur ne voit pas — les règles des hooks React, les
 * variables mortes, et quelques pièges propres au navigateur.
 */
export default tseslint.config(
  // Fichiers générés : tokens.css par build-tokens, marks.ts par
  // build-logo. Ni l'un ni l'autre n'est écrit à la main.
  {
    ignores: ['dist', 'node_modules', 'src/styles/tokens.css', 'src/components/logo/marks.ts'],
  },

  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Un underscore en tête marque une variable délibérément inutilisée
      // (destructuration partielle, paramètre imposé par une signature).
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],

      // `any` désactive le typage là où il est le plus utile.
      '@typescript-eslint/no-explicit-any': 'error',

      // Pièges de sécurité côté navigateur.
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-script-url': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      eqeqeq: ['error', 'smart'],
      'prefer-const': 'error',
    },
  },

  // Les scripts de build tournent sous Node, pas dans le navigateur.
  {
    files: ['scripts/**/*.mjs', '*.config.{js,ts}'],
    languageOptions: { globals: globals.node },
    rules: { 'no-console': 'off' },
  },
)
