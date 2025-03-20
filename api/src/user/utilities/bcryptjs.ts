/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { hashSync } from 'bcryptjs';

import { config } from '@/config';

export const hash = (plainPassword: string) =>
  hashSync(plainPassword, config.authentication.jwtOptions.salt);
