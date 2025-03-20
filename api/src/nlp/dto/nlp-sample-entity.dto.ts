/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { IsObjectId } from '@/utils/validation-rules/is-object-id';

export class NlpSampleEntityCreateDto {
  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  start?: number;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  end?: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsObjectId({ message: 'Entity must be a valid ObjectId' })
  entity: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsObjectId({ message: 'Value must be a valid ObjectId' })
  value: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsObjectId({ message: 'Sample must be a valid ObjectId' })
  sample: string;
}
