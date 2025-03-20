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
import { THydratedDocument } from '@/utils/types/filter.types';

@Schema({ timestamps: true })
export class CategoryStub extends BaseSchema {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  label: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  builtin: boolean;

  @Prop({
    type: Number,
    default: 100,
  })
  zoom: number;

  @Prop({
    type: [Number, Number],
    default: [0, 0],
  })
  offset: [number, number];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: unknown;
}

@Schema({ timestamps: true })
export class Category extends CategoryStub {
  @Transform(({ obj }) => obj.createdBy.toString())
  createdBy: string;
}

@Schema({ timestamps: true })
export class CategoryFull extends CategoryStub {
  @Type(() => User)
  createdBy: User;
}

export const CategoryModel: ModelDefinition = LifecycleHookManager.attach({
  name: Category.name,
  schema: SchemaFactory.createForClass(CategoryStub),
});

export type CategoryDocument = THydratedDocument<Category>;

export default CategoryModel.schema;
