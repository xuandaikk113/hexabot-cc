/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { LoggerService } from '@/logger/logger.service';
import {
    installMenuFixtures,
    rootMenuFixtures,
} from '@/utils/test/fixtures/menu';
import {
    closeInMongodConnection,
    rootMongooseTestModule,
} from '@/utils/test/test';

import { MenuRepository } from '../repositories/menu.repository';
import { MenuModel } from '../schemas/menu.schema';
import { MenuType } from '../schemas/types/menu';
import { verifyTree } from '../utilities/verifyTree';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  let menuService: MenuService;
  let menuRepository: MenuRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(installMenuFixtures),
        MongooseModule.forFeature([MenuModel]),
      ],
      providers: [
        MenuRepository,
        MenuService,
        EventEmitter2,
        {
          provide: CACHE_MANAGER,
          useValue: {
            del: jest.fn(),
            get: jest.fn(),
            set: jest.fn(),
          },
        },
        LoggerService,
      ],
    }).compile();
    menuService = module.get<MenuService>(MenuService);
    menuRepository = module.get<MenuRepository>(MenuRepository);
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });

  afterEach(jest.clearAllMocks);
  describe('create', () => {
    it('should create the menu successfully', async () => {
      const testingItem = rootMenuFixtures[0];
      jest.spyOn(menuRepository, 'create');
      const result = await menuService.create(testingItem);
      expect(result).toEqualPayload(testingItem);
      expect(menuRepository.create).toHaveBeenCalled();
    });
    it('should throw a 404 error', async () => {
      const testingItem = rootMenuFixtures[0];
      testingItem.parent = '542c2b97bac0595474108b48';
      await expect(menuService.create(testingItem)).rejects.toThrow(
        NotFoundException,
      );
    });
    it('should throw validation errors', async () => {
      const testingItem = rootMenuFixtures[0];
      testingItem.type = MenuType.postback;
      testingItem.payload = undefined;
      await expect(menuService.create(testingItem)).rejects.toThrow();
      testingItem.type = MenuType.web_url;
      testingItem.url = undefined;
      await expect(menuService.create(testingItem)).rejects.toThrow();
    });
  });

  describe('getTree', () => {
    it('should create a valid menu tree', async () => {
      const result = await menuService.getTree();
      expect(verifyTree(result)).toBeTruthy();
    });
  });
});
