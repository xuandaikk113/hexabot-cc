/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { join } from 'path';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AttachmentModule } from '@/attachment/attachment.module';
import { LoggerModule } from '@/logger/logger.module';

import { MigrationCommand } from './migration.command';
import { MigrationModel } from './migration.schema';
import { MigrationService } from './migration.service';

@Module({
  imports: [
    MongooseModule.forFeature([MigrationModel]),
    LoggerModule,
    HttpModule,
    AttachmentModule,
  ],
  providers: [
    MigrationService,
    MigrationCommand,
    {
      provide: 'MONGO_MIGRATION_DIR',
      useValue: join(__dirname, 'migrations'),
    },
  ],
  exports: [MigrationService],
})
export class MigrationModule {}
