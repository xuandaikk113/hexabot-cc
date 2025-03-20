/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ParseArrayPipe } from '@nestjs/common';

export const populateQueryPipe = new ParseArrayPipe({
  items: String,
  separator: ',',
  optional: true,
});
