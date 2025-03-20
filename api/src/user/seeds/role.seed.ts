/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { RoleDto } from '../dto/role.dto';
import { RoleRepository } from '../repositories/role.repository';
import { Role, RoleFull, RolePopulate } from '../schemas/role.schema';

@Injectable()
export class RoleSeeder extends BaseSeeder<
  Role,
  RolePopulate,
  RoleFull,
  RoleDto
> {
  constructor(private readonly roleRepository: RoleRepository) {
    super(roleRepository);
  }
}
