/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    ValidateIf,
} from 'class-validator';

import { DtoConfig } from '@/utils/types/dto.types';
import { IsObjectId } from '@/utils/validation-rules/is-object-id';

import { MenuType } from '../schemas/types/menu';

export class MenuCreateDto {
  @ApiProperty({ description: 'Menu title', type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Menu parent', type: String })
  @IsOptional()
  @IsString()
  @IsObjectId({
    message: 'Parent must be a valid objectId',
  })
  parent?: string;

  @ApiProperty({ description: 'Menu type', enum: MenuType, type: MenuType })
  @IsEnum(MenuType)
  @IsNotEmpty()
  type: MenuType;

  @ApiPropertyOptional({ description: 'Menu payload', type: String })
  @ValidateIf((o) => o.type == MenuType.postback)
  @IsOptional()
  @IsString()
  payload?: string;

  @ApiPropertyOptional({ description: 'Menu url', type: String })
  @ValidateIf((o) => o.type == MenuType.web_url)
  @IsOptional()
  @IsUrl()
  url?: string;
}

export class MenuQueryDto extends PartialType(MenuCreateDto) {}

export type MenuDto = DtoConfig<{
  create: MenuCreateDto;
}>;
