/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Schema as MongooseSchema } from 'mongoose';

import { User } from '@/user/schemas/user.schema';
import { BaseSchema } from '@/utils/generics/base-schema';
import { LifecycleHookManager } from '@/utils/generics/lifecycle-hook-manager';
import {
    TFilterPopulateFields,
    THydratedDocument,
} from '@/utils/types/filter.types';

import { Subscriber } from './subscriber.schema';

@Schema({ timestamps: true })
export class LabelStub extends BaseSchema {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    match: /^[A-Z_0-9]+$/,
  })
  name: string;

  @Prop({
    type: Object,
  })
  label_id?: Record<string, any>; // Indexed by channel name

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  builtin: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: unknown;
}

@Schema({ timestamps: true })
export class Label extends LabelStub {
  @Transform(({ obj }) => obj.createdBy.toString())
  createdBy: string;

  @Exclude()
  users?: never;
}

@Schema({ timestamps: true })
export class LabelFull extends LabelStub {
  @Type(() => User)
  createdBy: User;

  @Type(() => Subscriber)
  users?: Subscriber[];
}

export type LabelDocument = THydratedDocument<Label>;

export const LabelModel: ModelDefinition = LifecycleHookManager.attach({
  name: Label.name,
  schema: SchemaFactory.createForClass(LabelStub),
});

LabelModel.schema.virtual('users', {
  ref: 'Subscriber',
  localField: '_id',
  foreignField: 'labels',
  justOne: false,
});

export default LabelModel.schema;

export type LabelPopulate = keyof TFilterPopulateFields<Label, LabelStub>;

export const LABEL_POPULATE: LabelPopulate[] = ['users'];
