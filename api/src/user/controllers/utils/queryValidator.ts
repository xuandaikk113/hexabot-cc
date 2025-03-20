/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

// Query() will return true even if the query is not equal to "true"
export function booleanQueryValidator(booleanQueryAsString: string): boolean {
  switch (booleanQueryAsString) {
    case 'true':
      return true;
    default:
      return false;
  }
}
