/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseService } from '@/utils/generics/base-service';

import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';
import { User, UserFull, UserPopulate } from '../schemas/user.schema';

@Injectable()
export class UserService extends BaseService<
  User,
  UserPopulate,
  UserFull,
  UserDto
> {
  constructor(readonly repository: UserRepository) {
    super(repository);
  }
}
