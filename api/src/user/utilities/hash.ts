/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { createHash } from 'node:crypto';

const hash = (value: string) =>
  createHash('sha256').update(value).digest('base64url');

export { hash };
