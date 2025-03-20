/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { SetMetadata } from '@nestjs/common';

import { TRole } from '@/user/schemas/role.schema';

export const Roles = (...roles: TRole[]) => SetMetadata('roles', roles);
