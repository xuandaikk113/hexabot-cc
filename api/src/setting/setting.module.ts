/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { SettingController } from './controllers/setting.controller';
import { MetadataRepository } from './repositories/metadata.repository';
import { SettingRepository } from './repositories/setting.repository';
import { MetadataModel } from './schemas/metadata.schema';
import { SettingModel } from './schemas/setting.schema';
import { MetadataSeeder } from './seeds/metadata.seed';
import { SettingSeeder } from './seeds/setting.seed';
import { MetadataService } from './services/metadata.service';
import { SettingService } from './services/setting.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([SettingModel, MetadataModel]),
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [
    SettingRepository,
    MetadataRepository,
    SettingSeeder,
    MetadataSeeder,
    SettingService,
    MetadataService,
  ],
  controllers: [SettingController],
  exports: [SettingService, MetadataService],
})
export class SettingModule {}
