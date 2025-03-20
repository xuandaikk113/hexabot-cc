/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { CategoryDto } from '../dto/category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../schemas/category.schema';

@Injectable()
export class CategorySeeder extends BaseSeeder<
  Category,
  never,
  never,
  CategoryDto
> {
  constructor(private readonly categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }
}
