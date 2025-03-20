/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import crypto from 'crypto';

/**
 * Return a cryptographically secure random value between 0 and 1
 *
 * @returns A cryptographically secure random value between 0 and 1
 */
export const getRandom = (): number =>
  crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
