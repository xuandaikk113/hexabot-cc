/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EventEmitter2 } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { OutgoingMessageFormat } from '@/chat/schemas/types/message';
import { ContentOptions } from '@/chat/schemas/types/options';
import { LoggerService } from '@/logger/logger.service';
import { IGNORED_TEST_FIELDS } from '@/utils/test/constants';
import {
    contentFixtures,
    installContentFixtures,
} from '@/utils/test/fixtures/content';
import { getPageQuery } from '@/utils/test/pagination';
import {
    closeInMongodConnection,
    rootMongooseTestModule,
} from '@/utils/test/test';

import { ContentTypeRepository } from '../repositories/content-type.repository';
import { ContentRepository } from '../repositories/content.repository';
import { ContentTypeModel } from '../schemas/content-type.schema';
import { Content, ContentModel } from '../schemas/content.schema';

import { ContentTypeService } from './content-type.service';
import { ContentService } from './content.service';

describe('ContentService', () => {
  let contentService: ContentService;
  let contentTypeService: ContentTypeService;
  let contentRepository: ContentRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(installContentFixtures),
        MongooseModule.forFeature([ContentTypeModel, ContentModel]),
      ],
      providers: [
        ContentTypeRepository,
        ContentRepository,
        ContentTypeService,
        ContentService,
        LoggerService,
        EventEmitter2,
      ],
    }).compile();
    contentService = module.get<ContentService>(ContentService);
    contentTypeService = module.get<ContentTypeService>(ContentTypeService);
    contentRepository = module.get<ContentRepository>(ContentRepository);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  afterEach(jest.clearAllMocks);

  describe('findOneAndPopulate', () => {
    it('should return a content and populate its corresponding content type', async () => {
      const findSpy = jest.spyOn(contentRepository, 'findOneAndPopulate');
      const content = await contentService.findOne({ title: 'Jean' });

      const contentType = await contentTypeService.findOne(content!.entity);
      const result = await contentService.findOneAndPopulate(content!.id);
      expect(findSpy).toHaveBeenCalledWith(content!.id, undefined);
      expect(result).toEqualPayload({
        ...contentFixtures.find(({ title }) => title === 'Jean'),
        entity: contentType,
      });
    });
  });

  describe('findPage', () => {
    const pageQuery = getPageQuery<Content>({ limit: 1, sort: ['_id', 'asc'] });
    it('should return contents and populate their corresponding content types', async () => {
      const findSpy = jest.spyOn(contentRepository, 'findPageAndPopulate');
      const results = await contentService.findPageAndPopulate({}, pageQuery);
      const contentType = await contentTypeService.findOne(
        results[0].entity.id,
      );
      expect(findSpy).toHaveBeenCalledWith({}, pageQuery);
      expect(results).toEqualPayload([
        {
          ...contentFixtures.find(({ title }) => title === 'Jean'),
          entity: contentType,
        },
      ]);
    });
  });

  describe('getContent', () => {
    const contentOptions: ContentOptions = {
      display: OutgoingMessageFormat.list,
      fields: {
        title: 'title',
        subtitle: 'description',
        image_url: 'image',
      },
      buttons: [],
      limit: 10,
    };

    it('should get content that is published', async () => {
      const actualData = await contentService.findPage(
        { status: true },
        { skip: 0, limit: 10, sort: ['createdAt', 'desc'] },
      );
      const flattenedElements = actualData.map(Content.toElement);
      const content = await contentService.getContent(contentOptions, 0);
      expect(content?.elements).toEqualPayload(flattenedElements, [
        ...IGNORED_TEST_FIELDS,
        'payload',
      ]);
    });

    it('should get content for a specific entity', async () => {
      const contentType = await contentTypeService.findOne({ name: 'Product' });
      const actualData = await contentService.findPage(
        { status: true, entity: contentType!.id },
        { skip: 0, limit: 10, sort: ['createdAt', 'desc'] },
      );
      const flattenedElements = actualData.map(Content.toElement);
      const content = await contentService.getContent(
        {
          ...contentOptions,
          entity: contentType!.id,
        },
        0,
      );
      expect(content?.elements).toEqualPayload(flattenedElements);
    });

    it('should get content using query', async () => {
      contentOptions.entity = 1;
      const contentType = await contentTypeService.findOne({ name: 'Product' });
      const actualData = await contentService.findPage(
        { status: true, entity: contentType!.id, title: /^Jean/ },
        { skip: 0, limit: 10, sort: ['createdAt', 'desc'] },
      );
      const flattenedElements = actualData.map(Content.toElement);
      const content = await contentService.getContent(
        {
          ...contentOptions,
          query: { title: /^Jean/ },
          entity: 1,
        },
        0,
      );
      expect(content?.elements).toEqualPayload(flattenedElements);
    });

    it('should get content skiping 2 elements', async () => {
      const actualData = await contentService.findPage(
        { status: true },
        { skip: 2, limit: 2, sort: ['createdAt', 'desc'] },
      );
      const flattenedElements = actualData.map(Content.toElement);
      const content = await contentService.getContent(
        {
          ...contentOptions,
          query: {},
          entity: undefined,
          limit: 2,
        },
        2,
      );
      expect(content?.elements).toEqualPayload(flattenedElements, [
        ...IGNORED_TEST_FIELDS,
        'payload',
      ]);
    });
  });
});
