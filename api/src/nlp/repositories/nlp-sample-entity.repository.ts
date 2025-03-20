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
import { Model } from 'mongoose';

import { BaseRepository } from '@/utils/generics/base-repository';

import {
    NLP_SAMPLE_ENTITY_POPULATE,
    NlpSampleEntity,
    NlpSampleEntityFull,
    NlpSampleEntityPopulate,
} from '../schemas/nlp-sample-entity.schema';

@Injectable()
export class NlpSampleEntityRepository extends BaseRepository<
  NlpSampleEntity,
  NlpSampleEntityPopulate,
  NlpSampleEntityFull
> {
  constructor(
    readonly eventEmitter: EventEmitter2,
    @InjectModel(NlpSampleEntity.name) readonly model: Model<NlpSampleEntity>,
  ) {
    super(
      eventEmitter,
      model,
      NlpSampleEntity,
      NLP_SAMPLE_ENTITY_POPULATE,
      NlpSampleEntityFull,
    );
  }
}
