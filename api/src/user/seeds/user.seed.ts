/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { UserRepository } from '../repositories/user.repository';
import { User, UserFull, UserPopulate } from '../schemas/user.schema';

@Injectable()
export class UserSeeder extends BaseSeeder<User, UserPopulate, UserFull> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
