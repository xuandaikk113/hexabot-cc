/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

import { TRelation } from '../types/index.type';
import { TModel } from '../types/model.type';

export class ModelCreateDto {
  @ApiProperty({ description: 'Name of the model', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Identity of the model', type: String })
  @IsNotEmpty()
  @IsString()
  identity: TModel;

  @ApiProperty({
    description: 'Attributes of the model',
    type: Object,
    nullable: true,
  })
  @IsNotEmpty()
  @IsObject()
  attributes: object;

  @ApiProperty({
    description: 'relation of the model',
    type: String,
  })
  @IsString()
  @IsOptional()
  relation?: TRelation;
}
