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
export class LanguageStub extends BaseSchema {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  code: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDefault: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isRTL: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: unknown;
}

@Schema({ timestamps: true })
export class Language extends LanguageStub {
  @Transform(({ obj }) => obj.createdBy.toString())
  createdBy: string;
}

@Schema({ timestamps: true })
export class LanguageFull extends LanguageStub {
  @Type(() => User)
  createdBy: User;
}

export const LanguageModel: ModelDefinition = LifecycleHookManager.attach({
  name: Language.name,
  schema: SchemaFactory.createForClass(LanguageStub),
});

export type LanguageDocument = THydratedDocument<Language>;

export default LanguageModel.schema;
