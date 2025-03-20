/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

/**
 * Return a cryptographically secure random value between 0 and 1
 *
 * @returns A cryptographically secure random value between 0 and 1
 */
export const getRandom = (): number =>
  window.crypto.getRandomValues(new Uint32Array(1))[0] * Math.pow(2, -32);
