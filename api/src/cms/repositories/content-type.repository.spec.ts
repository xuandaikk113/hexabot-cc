/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EventEmitter2 } from '@nestjs/event-emitter';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { BlockRepository } from '@/chat/repositories/block.repository';
import { BlockModel } from '@/chat/schemas/block.schema';
import { BlockService } from '@/chat/services/block.service';
import {
    ContentType,
    ContentTypeModel,
} from '@/cms/schemas/content-type.schema';
import { LoggerService } from '@/logger/logger.service';
import {
    closeInMongodConnection,
    rootMongooseTestModule,
} from '@/utils/test/test';

import { Content, ContentModel } from '../schemas/content.schema';

import { installContentFixtures } from './../../utils/test/fixtures/content';
import { ContentTypeRepository } from './content-type.repository';
import { ContentRepository } from './content.repository';

describe('ContentTypeRepository', () => {
  let contentTypeRepository: ContentTypeRepository;
  let contentTypeModel: Model<ContentType>;
  let contentModel: Model<Content>;
  let blockService: BlockService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(installContentFixtures),
        MongooseModule.forFeature([ContentTypeModel, ContentModel, BlockModel]),
      ],
      providers: [
        LoggerService,
        ContentRepository,
        ContentTypeRepository,
        BlockService,
        BlockRepository,
        {
          provide: BlockService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        EventEmitter2,
      ],
    }).compile();
    blockService = module.get<BlockService>(BlockService);
    contentTypeRepository = module.get<ContentTypeRepository>(
      ContentTypeRepository,
    );
    contentTypeModel = module.get<Model<ContentType>>(
      getModelToken('ContentType'),
    );

    contentModel = module.get<Model<Content>>(getModelToken('Content'));
  });

  afterAll(closeInMongodConnection);

  afterEach(jest.clearAllMocks);

  describe('deleteCascadeOne', () => {
    it('should delete a contentType by id if no associated block was found', async () => {
      jest.spyOn(blockService, 'findOne').mockResolvedValueOnce(null);
      const contentType = await contentTypeModel.findOne({ name: 'Store' });
      const result = await contentTypeRepository.deleteOne(contentType!.id);
      expect(result).toEqual({ acknowledged: true, deletedCount: 1 });
      const contents = await contentModel.find({
        entity: contentType!.id,
      });
      expect(contents).toEqual([]);
    });
  });
});
