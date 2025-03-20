/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { DtoConfig } from '@/utils/types/dto.types';

export class LanguageCreateDto {
  @ApiProperty({ description: 'Language Title', type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Language Code', type: String })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Whether Language is RTL', type: Boolean })
  @IsBoolean()
  isRTL: boolean;

  @ApiPropertyOptional({ description: 'Is Default Language ?', type: Boolean })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class LanguageUpdateDto extends PartialType(LanguageCreateDto) {}

export type LanguageDto = DtoConfig<{
  create: LanguageCreateDto;
}>;
