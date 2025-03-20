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
} from 'class-validator';

import { SettingType } from '../schemas/types';

export class SettingCreateDto {
  @ApiProperty({ description: 'Setting group', type: String })
  @IsNotEmpty()
  @IsString()
  group: string;

  @ApiProperty({ description: 'Setting subgroup', type: String })
  @IsOptional()
  @IsString()
  subgroup?: string;

  @ApiProperty({ description: 'Setting label (system name)', type: String })
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty({
    description: 'Setting type',
    enum: [
      'text',
      'multiple_text',
      'checkbox',
      'select',
      'number',
      'attachment',
      'multiple_attachment',
    ],
  })
  @IsNotEmpty()
  @IsIn(Object.values(SettingType))
  type: SettingType;

  @ApiProperty({ description: 'Setting value' })
  @IsNotEmpty()
  value: any;

  @ApiPropertyOptional({
    description: 'Setting options (required when type is select)',
    isArray: true,
    type: Array,
  })
  @IsArray()
  @IsOptional()
  options?: string[];

  //TODO: adding swagger decorators
  config?: Record<string, any>;

  @ApiPropertyOptional({
    description:
      'Defines the display order of the setting in the user interface',
    type: Number,
  })
  weight: number;

  @ApiPropertyOptional({
    description: 'Indicates whether this setting supports translation',
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  translatable?: boolean;
}

export class SettingUpdateDto {
  @ApiProperty({ description: 'value of the setting' })
  value: null | string | number | boolean | string[] | Record<string, any>;
}
