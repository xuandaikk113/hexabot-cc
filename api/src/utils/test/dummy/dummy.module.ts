/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';

import { installDummyFixtures } from '@/utils/test/fixtures/dummy';
import { rootMongooseTestModule } from '@/utils/test/test';

import { DummyRepository } from './repositories/dummy.repository';
import { DummyModel } from './schemas/dummy.schema';
import { DummyService } from './services/dummy.service';

@Module({
  imports: [
    rootMongooseTestModule(installDummyFixtures),
    MongooseModule.forFeature([DummyModel]),
  ],
  providers: [DummyRepository, DummyService, EventEmitter2],
})
export class DummyModule {}
