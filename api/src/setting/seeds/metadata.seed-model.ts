/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { MetadataCreateDto } from '../dto/metadata.dto';

export const DEFAULT_METADATA = [
  {
    name: 'db-version',
    value: process.env.npm_package_version,
  },
] as const satisfies MetadataCreateDto[];
