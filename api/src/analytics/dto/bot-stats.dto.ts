/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Type } from 'class-transformer';
import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import { BotStatsType } from '../schemas/bot-stats.schema';
import { IsLessThanDate } from '../validation-rules/is-less-than-date';

export class BotStatsCreateDto {
  @IsNotEmpty()
  @IsString()
  type: BotStatsType;

  @IsString()
  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class BotStatsFindDto {
  /**
   * Start date for message retrieval.
   */
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @IsLessThanDate('to', {
    message: 'From date must be less than or equal to To date',
  })
  from?: Date;

  /**
   * End date for message retrieval.
   */
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  to?: Date;
}

export class BotStatsFindDatumDto extends BotStatsFindDto {
  /**
   * Type for message to retrieve.
   */
  @IsEnum(BotStatsType)
  @IsNotEmpty()
  type: BotStatsType;
}
