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

import { BotStatsController } from './controllers/bot-stats.controller';
import { BotStatsRepository } from './repositories/bot-stats.repository';
import { BotStatsModel } from './schemas/bot-stats.schema';
import { BotStatsService } from './services/bot-stats.service';

@Module({
  imports: [MongooseModule.forFeature([BotStatsModel]), EventEmitter2],
  controllers: [BotStatsController],
  providers: [BotStatsService, BotStatsRepository],
})
export class AnalyticsModule {}
