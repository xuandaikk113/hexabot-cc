/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MetadataCreateDto {
  @ApiProperty({ description: 'Metadata name', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Metadata value' })
  @IsNotEmpty()
  value: any;
}

export class MetadataUpdateDto extends PartialType(MetadataCreateDto) {}
