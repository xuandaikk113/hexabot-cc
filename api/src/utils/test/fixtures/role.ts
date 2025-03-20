/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { RoleCreateDto } from '@/user/dto/role.dto';
import { RoleModel } from '@/user/schemas/role.schema';

export const roleFixtures: RoleCreateDto[] = [
  {
    name: 'admin',
    active: true,
  },
  {
    name: 'manager',
    active: true,
  },
  {
    name: 'public',
    active: true,
  },
];

export const installRoleFixtures = async () => {
  const Role = mongoose.model(RoleModel.name, RoleModel.schema);
  return await Role.insertMany(roleFixtures);
};
