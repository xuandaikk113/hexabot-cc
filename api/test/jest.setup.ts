/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { diff } from 'jest-diff';

import { IGNORED_TEST_FIELDS } from '@/utils/test/constants';

function recursivelyOmitKeys(obj: any, keysToIgnore: string[]): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => recursivelyOmitKeys(item, keysToIgnore));
  }

  return Object.keys(obj).reduce((acc: any, key: string) => {
    if (!keysToIgnore.includes(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        acc[key] = recursivelyOmitKeys(obj[key], keysToIgnore);
      } else {
        acc[key] = obj[key];
      }
    }
    return acc;
  }, {});
}

expect.extend({
  toEqualPayload(received, expected, keysToIgnore = IGNORED_TEST_FIELDS) {
    const receivedStripped = recursivelyOmitKeys(received, keysToIgnore);
    const expectedStripped = recursivelyOmitKeys(expected, keysToIgnore);

    const pass = this.equals(receivedStripped, expectedStripped);

    const diffString = diff(expectedStripped, receivedStripped, {
      expand: this.expand,
    });

    if (pass) {
      return {
        pass: true,
        message: () =>
          `Expected objects to not be equal with keys [${keysToIgnore.join(
            ', ',
          )}] ignored`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          `Expected objects with keys [${keysToIgnore.join(
            ', ',
          )}] ignored to be equal:\n${diffString}`,
      };
    }
  },
});
