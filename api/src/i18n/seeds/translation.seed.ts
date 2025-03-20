/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { TranslationRepository } from '../repositories/translation.repository';
import { Translation } from '../schemas/translation.schema';

@Injectable()
export class TranslationSeeder extends BaseSeeder<Translation> {
  constructor(private readonly translationRepository: TranslationRepository) {
    super(translationRepository);
  }
}
