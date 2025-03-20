/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';

export class TranslationCreateDto {
  @ApiProperty({ description: 'Translation str', type: String })
  @IsNotEmpty()
  @IsString()
  str: string;

  @ApiProperty({ description: 'Translations', type: Object })
  @IsNotEmpty()
  @IsObject()
  translations: Record<string, string>;

  @ApiProperty({ description: 'Translated', type: Number })
  @IsNotEmpty()
  @IsNumber()
  translated: number;

  @ApiProperty({ description: 'Created by user', type: String })
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

export class TranslationUpdateDto {
  @ApiPropertyOptional({ description: 'Translation str', type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  str?: string;

  @ApiPropertyOptional({ description: 'Translations', type: Object })
  @IsNotEmpty()
  @IsObject()
  @IsOptional()
  translations?: Record<string, string>;
}
