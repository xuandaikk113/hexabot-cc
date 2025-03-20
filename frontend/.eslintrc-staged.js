module.exports = {
  extends: './.eslintrc.js',
  rules: {
    'header/header': [
      2,
      'block',
      [
        '',
        ' * Copyright © ' +
        new Date().getFullYear() +
        ' Hexastack. All rights reserved.',
        ' *',
        ' * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :',
        ' * 1. .',
        ' * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software\'s "About" section, documentation, and README file).',
        ' ',
      ],
      2,
    ],
  },
};
