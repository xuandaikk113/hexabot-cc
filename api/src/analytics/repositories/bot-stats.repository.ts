/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@/utils/generics/base-repository';

import { BotStats, BotStatsType } from '../schemas/bot-stats.schema';

@Injectable()
export class BotStatsRepository extends BaseRepository<BotStats> {
  constructor(
    readonly eventEmitter: EventEmitter2,
    @InjectModel(BotStats.name) readonly model: Model<BotStats>,
  ) {
    super(eventEmitter, model, BotStats);
  }

  /**
   * Retrieves message statistics based on the provided types and time range.
   *
   * @param from - Start date for filtering messages.
   * @param to - End date for filtering messages.
   * @param types - An array of message types to filter.
   * @returns A promise that resolves to an array of message statistics.
   */
  async findMessages(
    from: Date,
    to: Date,
    types: BotStatsType[],
  ): Promise<BotStats[]> {
    const query = this.model.find({
      type: { $in: types },
      day: { $gte: from, $lte: to },
    });
    return await this.execute(query, BotStats);
  }

  /**
   * Retrieves the aggregated sum of values for popular blocks within a specified time range.
   *
   * @param from Start date for the time range
   * @param to End date for the time range
   * @param limit Optional maximum number of results to return (defaults to 5)
   * @returns A promise that resolves to an array of objects containing the block ID and the aggregated value
   */
  async findPopularBlocks(
    from: Date,
    to: Date,
    limit: number = 5,
  ): Promise<{ id: string; value: number }[]> {
    return await this.model.aggregate([
      {
        $match: {
          day: { $gte: from, $lte: to },
          type: BotStatsType.popular,
        },
      },
      {
        $group: {
          _id: '$name',
          id: { $sum: 1 },
          value: { $sum: '$value' },
        },
      },
      {
        $sort: {
          value: -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $addFields: { id: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
    ]);
  }
}
