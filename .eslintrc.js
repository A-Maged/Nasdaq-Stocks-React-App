const fs = require('fs');

const folders = fs
  .readdirSync('src', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

module.exports = {
  extends: ['react-app', 'react-app/jest', 'prettier'],
  plugins: ['prettier', 'react', 'import'],
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
            pattern: `@(${folders.join('|')})`,
            group: 'internal',
          },
          /* group sub-folders */
          ...folders.map((folder) => ({
            pattern: `${folder}/**`,
            group: 'internal',
          })),
        ],
        pathGroupsExcludedImportTypes: folders,
      },
    ],
  },
};
