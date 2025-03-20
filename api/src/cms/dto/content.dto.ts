/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { DtoConfig } from '@/utils/types/dto.types';
import { IsObjectId } from '@/utils/validation-rules/is-object-id';

export class ContentCreateDto {
  @ApiProperty({ description: 'Content entity', type: String })
  @IsString()
  @IsNotEmpty()
  @IsObjectId({ message: 'Entity must be a valid ObjectId' })
  entity: string;

  @ApiProperty({ description: 'Content title', type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Content status', type: Boolean })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiPropertyOptional({ description: 'Content dynamic fields', type: Object })
  @IsOptional()
  dynamicFields: Record<string, any>;
}

export class ContentUpdateDto extends PartialType(ContentCreateDto) {}

export type ContentDto = DtoConfig<{
  create: ContentCreateDto;
}>;
