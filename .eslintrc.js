const fs = require('fs');

const folders = fs
  .readdirSync('src', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

console.log(folders);
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
        pathGroups: folders.map((folder) => ({
          pattern: folder,
          group: 'internal',
        })),
        pathGroupsExcludedImportTypes: folders,
      },
    ],
  },
};
