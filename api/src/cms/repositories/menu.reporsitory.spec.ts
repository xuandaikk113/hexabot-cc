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

import {
    installMenuFixtures,
    rootMenuFixtures,
} from '@/utils/test/fixtures/menu';
import {
    closeInMongodConnection,
    rootMongooseTestModule,
} from '@/utils/test/test';

import { MenuModel } from '../schemas/menu.schema';
import { MenuType } from '../schemas/types/menu';

import { MenuRepository } from './menu.repository';

describe('MenuRepository', () => {
  let menuRepository: MenuRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(installMenuFixtures),
        MongooseModule.forFeature([MenuModel]),
      ],
      providers: [MenuRepository, EventEmitter2],
    }).compile();
    menuRepository = module.get<MenuRepository>(MenuRepository);
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });

  afterEach(jest.clearAllMocks);

  describe('findOneAndPopulate', () => {
    it('should return a populated version of the document', async () => {
      const parent = await menuRepository.create({
        title: 'Test1',
        type: MenuType.nested,
      });
      const child = await menuRepository.create({
        ...rootMenuFixtures[0],
        parent: parent.id,
      });
      const result = await menuRepository.findOneAndPopulate(child.id);
      expect(result).toEqual({ ...child, parent });
    });
  });
});
