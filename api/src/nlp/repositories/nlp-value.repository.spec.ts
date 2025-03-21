/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EventEmitter2 } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { nlpEntityFixtures } from '@/utils/test/fixtures/nlpentity';
import { installNlpSampleEntityFixtures } from '@/utils/test/fixtures/nlpsampleentity';
import { nlpValueFixtures } from '@/utils/test/fixtures/nlpvalue';
import { getPageQuery } from '@/utils/test/pagination';
import {
    closeInMongodConnection,
    rootMongooseTestModule,
} from '@/utils/test/test';
import { TFixtures } from '@/utils/test/types';

import { NlpEntityModel } from '../schemas/nlp-entity.schema';
import { NlpSampleEntityModel } from '../schemas/nlp-sample-entity.schema';
import {
    NlpValue,
    NlpValueFull,
    NlpValueModel,
} from '../schemas/nlp-value.schema';

import { NlpSampleEntityRepository } from './nlp-sample-entity.repository';
import { NlpValueRepository } from './nlp-value.repository';

describe('NlpValueRepository', () => {
  let nlpValueRepository: NlpValueRepository;
  let nlpSampleEntityRepository: NlpSampleEntityRepository;
  let nlpValues: NlpValue[];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(installNlpSampleEntityFixtures),
        MongooseModule.forFeature([
          NlpValueModel,
          NlpSampleEntityModel,
          NlpEntityModel,
        ]),
      ],
      providers: [NlpValueRepository, NlpSampleEntityRepository, EventEmitter2],
    }).compile();
    nlpValueRepository = module.get<NlpValueRepository>(NlpValueRepository);
    nlpSampleEntityRepository = module.get<NlpSampleEntityRepository>(
      NlpSampleEntityRepository,
    );
    nlpValues = await nlpValueRepository.findAll();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  afterEach(jest.clearAllMocks);

  describe('findOneAndPopulate', () => {
    it('should return a nlp value with populate', async () => {
      const result = await nlpValueRepository.findOneAndPopulate(
        nlpValues[1].id,
      );
      expect(result).toEqualPayload({
        ...nlpValueFixtures[1],
        entity: nlpEntityFixtures[0],
      });
    });
  });

  describe('findPageAndPopulate', () => {
    it('should return all nlp entities with populate', async () => {
      const pageQuery = getPageQuery<NlpValue>({
        sort: ['value', 'desc'],
      });
      const result = await nlpValueRepository.findPageAndPopulate(
        {},
        pageQuery,
      );
      const nlpValueFixturesWithEntities = nlpValueFixtures.reduce(
        (acc, curr) => {
          const ValueWithEntities = {
            ...curr,
            entity: nlpEntityFixtures[
              parseInt(curr.entity!)
            ] as NlpValueFull['entity'],
            builtin: curr.builtin!,
            expressions: curr.expressions!,
            metadata: curr.metadata!,
          };
          acc.push(ValueWithEntities);
          return acc;
        },
        [] as TFixtures<NlpValueFull>[],
      );
      expect(result).toEqualPayload(nlpValueFixturesWithEntities);
    });
  });

  describe('The deleteCascadeOne function', () => {
    it('should delete a nlp Value', async () => {
      const result = await nlpValueRepository.deleteOne(nlpValues[1].id);
      expect(result.deletedCount).toEqual(1);
      const sampleEntities = await nlpSampleEntityRepository.find({
        value: nlpValues[1].id,
      });
      expect(sampleEntities.length).toEqual(0);
    });
  });
});
