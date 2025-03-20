/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { LanguageDto } from '../dto/language.dto';
import { LanguageRepository } from '../repositories/language.repository';
import { Language } from '../schemas/language.schema';

@Injectable()
export class LanguageSeeder extends BaseSeeder<
  Language,
  never,
  never,
  LanguageDto
> {
  constructor(private readonly languageRepository: LanguageRepository) {
    super(languageRepository);
  }
}
