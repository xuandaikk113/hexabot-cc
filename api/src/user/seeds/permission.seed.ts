/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { PermissionDto } from '../dto/permission.dto';
import { PermissionRepository } from '../repositories/permission.repository';
import {
    Permission,
    PermissionFull,
    PermissionPopulate,
} from '../schemas/permission.schema';

@Injectable()
export class PermissionSeeder extends BaseSeeder<
  Permission,
  PermissionPopulate,
  PermissionFull,
  PermissionDto
> {
  constructor(private readonly permissionRepository: PermissionRepository) {
    super(permissionRepository);
  }
}
