/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    Validate,
    ValidateNested,
} from 'class-validator';

import { DtoConfig } from '@/utils/types/dto.types';

import { ValidateRequiredFields } from '../validators/validate-required-fields.validator';

export class FieldType {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z][a-z_0-9]*$/)
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsEnum(['text', 'url', 'textarea', 'checkbox', 'file', 'html'], {
    message:
      "type must be one of the following values: 'text', 'url', 'textarea', 'checkbox', 'file', 'html'",
  })
  type: string;
}

export class ContentTypeCreateDto {
  @ApiProperty({ description: 'Content type name', type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Content type fields', type: FieldType })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Validate(ValidateRequiredFields)
  @Type(() => FieldType)
  fields?: FieldType[];
}

export class ContentTypeUpdateDto extends PartialType(ContentTypeCreateDto) {}

export type ContentTypeDto = DtoConfig<{
  create: ContentTypeCreateDto;
}>;
