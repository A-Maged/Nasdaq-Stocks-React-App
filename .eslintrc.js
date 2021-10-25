const fs = require('fs');

const topLevelFoldersInSrc = fs
  .readdirSync('src', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'prettier',
    'plugin:cypress/recommended',
  ],
  plugins: ['prettier', 'cypress', 'react', 'import'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'index',
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
        ],
        pathGroups: [
          {
            /* group top-level folders */
            pattern: `@(${topLevelFoldersInSrc.join('|')})`,
            group: 'internal',
          },
          /* group sub-folders */
          ...topLevelFoldersInSrc.map((folder) => ({
            pattern: `${folder}/**`,
            group: 'internal',
          })),
        ],
        pathGroupsExcludedImportTypes: topLevelFoldersInSrc,
      },
    ],
  },
};
