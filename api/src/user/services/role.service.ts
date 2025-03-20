/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseService } from '@/utils/generics/base-service';

import { RoleDto } from '../dto/role.dto';
import { RoleRepository } from '../repositories/role.repository';
import { Role, RoleFull, RolePopulate } from '../schemas/role.schema';

@Injectable()
export class RoleService extends BaseService<
  Role,
  RolePopulate,
  RoleFull,
  RoleDto
> {
  constructor(readonly repository: RoleRepository) {
    super(repository);
  }
}
