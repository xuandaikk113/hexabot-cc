/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { DtoConfig } from '@/utils/types/dto.types';

export class ContextVarCreateDto {
  @ApiProperty({ description: 'Context var label', type: String })
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty({ description: 'Context var name', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Is context var permanent', type: Boolean })
  @IsOptional()
  @IsBoolean()
  permanent?: boolean;
}

export class ContextVarUpdateDto extends PartialType(ContextVarCreateDto) {}

export type ContextVarDto = DtoConfig<{
  create: ContextVarCreateDto;
}>;
