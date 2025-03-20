/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseService } from '@/utils/generics/base-service';

import { CategoryDto } from '../dto/category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../schemas/category.schema';

@Injectable()
export class CategoryService extends BaseService<
  Category,
  never,
  never,
  CategoryDto
> {
  constructor(readonly repository: CategoryRepository) {
    super(repository);
  }
}
