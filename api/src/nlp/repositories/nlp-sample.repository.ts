/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Query } from 'mongoose';

import { BaseRepository, DeleteResult } from '@/utils/generics/base-repository';
import { TFilterQuery } from '@/utils/types/filter.types';

import { TNlpSampleDto } from '../dto/nlp-sample.dto';
import {
    NLP_SAMPLE_POPULATE,
    NlpSample,
    NlpSampleFull,
    NlpSamplePopulate,
} from '../schemas/nlp-sample.schema';

import { NlpSampleEntityRepository } from './nlp-sample-entity.repository';

@Injectable()
export class NlpSampleRepository extends BaseRepository<
  NlpSample,
  NlpSamplePopulate,
  NlpSampleFull,
  TNlpSampleDto
> {
  constructor(
    readonly eventEmitter: EventEmitter2,
    @InjectModel(NlpSample.name) readonly model: Model<NlpSample>,
    private readonly nlpSampleEntityRepository: NlpSampleEntityRepository,
  ) {
    super(eventEmitter, model, NlpSample, NLP_SAMPLE_POPULATE, NlpSampleFull);
  }

  /**
   * Deletes NLP sample entities associated with the provided criteria before deleting the sample itself.
   *
   * @param query - The query object used for deletion.
   * @param criteria - Criteria to identify the sample(s) to delete.
   */
  async preDelete(
    _query: Query<
      DeleteResult,
      Document<NlpSample, any, any>,
      unknown,
      NlpSample,
      'deleteOne' | 'deleteMany'
    >,
    criteria: TFilterQuery<NlpSample>,
  ) {
    if (criteria._id) {
      await this.nlpSampleEntityRepository.deleteMany({
        sample: criteria._id,
      });
    } else {
      throw new Error(
        'Attempted to delete a NLP sample using unknown criteria',
      );
    }
  }
}
