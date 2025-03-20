/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Test } from '@nestjs/testing';

import { LoggerModule } from '@/logger/logger.module';
import { DummyPlugin } from '@/utils/test/dummy/dummy.plugin';

import { BaseBlockPlugin } from './base-block-plugin';
import { PluginService } from './plugins.service';
import { PluginType } from './types';

describe('PluginsService', () => {
  let pluginsService: PluginService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [PluginService, DummyPlugin],
      imports: [LoggerModule],
    }).compile();
    pluginsService = module.get<PluginService>(PluginService);
    await module.get<DummyPlugin>(DummyPlugin).onModuleInit();
  });
  afterAll(async () => {
    jest.clearAllMocks();
  });
  describe('getAll', () => {
    it('should return an array of instances of base plugin', () => {
      const result = pluginsService.getAllByType(PluginType.block);
      expect(result.every((p) => p instanceof BaseBlockPlugin)).toBeTruthy();
    });
  });

  describe('getPlugin', () => {
    it('should return the required plugin', () => {
      const result = pluginsService.getPlugin(PluginType.block, 'dummy-plugin');
      expect(result).toBeInstanceOf(DummyPlugin);
    });
  });
});
