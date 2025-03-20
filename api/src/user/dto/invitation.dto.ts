/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsObjectId } from '@/utils/validation-rules/is-object-id';

export class InvitationCreateDto {
  @ApiProperty({ description: 'Invitation roles', type: String })
  @IsNotEmpty()
  @IsArray()
  @IsObjectId({ each: true, message: 'Invalid Object Id' })
  roles: string[];

  @ApiProperty({ description: 'Invitation email', type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
