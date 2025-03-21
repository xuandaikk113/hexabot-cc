/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';

import { DtoConfig } from '@/utils/types/dto.types';

export type Lookup = 'keywords' | 'trait' | 'free-text';

export class NlpEntityCreateDto {
  @ApiProperty({ description: 'Name of the nlp entity', type: String })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Only alphanumeric characters and underscores are allowed.',
  })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    isArray: true,
    enum: ['keywords', 'trait', 'free-text'],
  })
  @IsArray()
  @IsIn(['keywords', 'trait', 'free-text'], { each: true })
  @IsOptional()
  lookups?: Lookup[];

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  doc?: string;

  @ApiPropertyOptional({ description: 'Nlp entity is builtin', type: Boolean })
  @IsBoolean()
  @IsOptional()
  builtin?: boolean;
}

export type NlpEntityDto = DtoConfig<{
  create: NlpEntityCreateDto;
}>;
