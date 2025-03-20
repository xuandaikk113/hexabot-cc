/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { NlpValueCreateDto, NlpValueDto } from '../dto/nlp-value.dto';
import { NlpEntityRepository } from '../repositories/nlp-entity.repository';
import { NlpValueRepository } from '../repositories/nlp-value.repository';
import {
    NlpValue,
    NlpValueFull,
    NlpValuePopulate,
} from '../schemas/nlp-value.schema';

@Injectable()
export class NlpValueSeeder extends BaseSeeder<
  NlpValue,
  NlpValuePopulate,
  NlpValueFull,
  NlpValueDto
> {
  constructor(
    nlpValueRepository: NlpValueRepository,
    private readonly nlpEntityRepository: NlpEntityRepository,
  ) {
    super(nlpValueRepository);
  }

  async seed(models: NlpValueCreateDto[]): Promise<boolean> {
    if (await this.isEmpty()) {
      const entities = await this.nlpEntityRepository.findAll();
      const modelDtos = models.map((v) => ({
        ...v,
        entity: entities.find(({ name }) => name === v.entity)?.id || null,
      }));
      await this.repository.createMany(modelDtos);
      return true;
    }
    return false;
  }
}
