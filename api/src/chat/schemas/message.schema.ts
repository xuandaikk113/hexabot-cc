/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { Schema as MongooseSchema } from 'mongoose';

import { User } from '@/user/schemas/user.schema';
import { BaseSchema } from '@/utils/generics/base-schema';
import { LifecycleHookManager } from '@/utils/generics/lifecycle-hook-manager';
import { TFilterPopulateFields } from '@/utils/types/filter.types';

import { Subscriber } from './subscriber.schema';
import { StdIncomingMessage, StdOutgoingMessage } from './types/message';

@Schema({ timestamps: true })
export class MessageStub extends BaseSchema {
  @Prop({
    type: String,
    required: false,
    //TODO : add default value for mid
  })
  mid?: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: 'Subscriber',
  })
  sender?: unknown;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: 'Subscriber',
  })
  recipient?: unknown;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: 'User',
  })
  sentBy?: unknown;

  @Prop({
    type: Object,
    required: true,
  })
  message: StdOutgoingMessage | StdIncomingMessage;

  @Prop({
    type: Boolean,
    default: false,
  })
  read?: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  delivery?: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  handover?: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: unknown;
}

@Schema({ timestamps: true })
export class Message extends MessageStub {
  @Transform(({ obj }) => obj.createdBy.toString())
  createdBy: string;

  @Transform(({ obj }) => obj.sender?.toString())
  sender?: string;

  @Transform(({ obj }) => obj.recipient?.toString())
  recipient?: string;

  @Transform(({ obj }) => obj.sentBy?.toString())
  sentBy?: string;
}

@Schema({ timestamps: true })
export class MessageFull extends MessageStub {
  @Type(() => User)
  createdBy: User;

  @Type(() => Subscriber)
  sender?: Subscriber;

  @Type(() => Subscriber)
  recipient?: Subscriber;

  @Transform(({ obj }) => obj.sentBy?.toString())
  sentBy?: string; // sendBy is never populate
}

export const MessageModel: ModelDefinition = LifecycleHookManager.attach({
  name: Message.name,
  schema: SchemaFactory.createForClass(MessageStub),
});

export default MessageModel.schema;

export type MessagePopulate = keyof TFilterPopulateFields<Message, MessageStub>;

export const MESSAGE_POPULATE: MessagePopulate[] = ['sender', 'recipient', 'createdBy'];
