/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { UserCreateDto } from '../dto/user.dto';

export const userModels = (roles: string[]): UserCreateDto[] => {
  return [
    {
      username: 'admin',
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@admin.admin',
      password: 'adminadmin',
      roles,
      avatar: null,
    },
  ];
};
