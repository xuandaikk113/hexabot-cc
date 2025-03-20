/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';

import { IsObjectId } from '@/utils/validation-rules/is-object-id';

import {
    StdIncomingMessage,
    StdOutgoingMessage,
} from '../schemas/types/message';
import { IsValidMessageText } from '../validation-rules/is-valid-message-text';

export class MessageCreateDto {
  @ApiProperty({ description: 'Message id', type: String })
  @IsOptional()
  @IsString()
  mid?: string;

  @ApiProperty({ description: 'Reply to Message id', type: String })
  @IsOptional()
  @IsString()
  inReplyTo?: string;

  @ApiPropertyOptional({ description: 'Message sender', type: String })
  @IsString()
  @IsOptional()
  @IsObjectId({ message: 'Sender must be a valid ObjectId' })
  sender?: string;

  @ApiPropertyOptional({ description: 'Message recipient', type: String })
  @IsString()
  @IsOptional()
  @IsObjectId({ message: 'Recipient must be a valid ObjectId' })
  recipient?: string;

  @ApiPropertyOptional({ description: 'Message sent by', type: String })
  @IsString()
  @IsOptional()
  @IsObjectId({ message: 'SentBy must be a valid ObjectId' })
  sentBy?: string;

  @ApiProperty({ description: 'Message', type: Object })
  @IsObject()
  @IsNotEmpty()
  @IsValidMessageText({ message: 'Message should have text property' })
  message: StdOutgoingMessage | StdIncomingMessage;

  @ApiPropertyOptional({ description: 'Message is read', type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  read?: boolean;

  @ApiPropertyOptional({ description: 'Message is delivered', type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  delivery?: boolean;

  @ApiPropertyOptional({ description: 'Message is handed over', type: Boolean })
  @IsBoolean()
  @IsOptional()
  handover?: boolean;

  @ApiProperty({ description: 'Created by user', type: String })
  @IsString()
  @IsNotEmpty()
  @IsObjectId({ message: 'CreatedBy must be a valid ObjectId' })
  createdBy: string;
}

export class MessageUpdateDto extends PartialType(MessageCreateDto) {}
