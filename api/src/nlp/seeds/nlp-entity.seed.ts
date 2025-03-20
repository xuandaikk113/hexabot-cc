/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { NlpEntityDto } from '../dto/nlp-entity.dto';
import { NlpEntityRepository } from '../repositories/nlp-entity.repository';
import {
    NlpEntity,
    NlpEntityFull,
    NlpEntityPopulate,
} from '../schemas/nlp-entity.schema';

@Injectable()
export class NlpEntitySeeder extends BaseSeeder<
  NlpEntity,
  NlpEntityPopulate,
  NlpEntityFull,
  NlpEntityDto
> {
  constructor(nlpEntityRepository: NlpEntityRepository) {
    super(nlpEntityRepository);
  }
}
