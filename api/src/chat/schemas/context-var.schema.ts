/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 */

import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { Schema as MongooseSchema } from 'mongoose';

import { User } from '@/user/schemas/user.schema';
import { BaseSchema } from '@/utils/generics/base-schema';
import { LifecycleHookManager } from '@/utils/generics/lifecycle-hook-manager';
import { THydratedDocument } from '@/utils/types/filter.types';

@Schema({ timestamps: true })
export class ContextVarStub extends BaseSchema {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  label: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    match: /^[a-z_0-9]+$/,
  })
  name: string;

  /**
   * The permanent attribute allows the chatbot to know where to store the context variable.
   * If the context variable is not permanent, it will be stored in the converation context, which is temporary.
   * If the context variable is permanent, it will be stored in the subscriber context, which is permanent.
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  permanent: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: unknown;
}

@Schema({ timestamps: true })
export class ContextVar extends ContextVarStub {
  @Transform(({ obj }) => obj.createdBy.toString())
  createdBy: string;
}

@Schema({ timestamps: true })
export class ContextVarFull extends ContextVarStub {
  @Type(() => User)
  createdBy: User;
}

export const ContextVarModel: ModelDefinition = LifecycleHookManager.attach({
  name: ContextVar.name,
  schema: SchemaFactory.createForClass(ContextVarStub),
});

export type ContextVarDocument = THydratedDocument<ContextVar>;

export default ContextVarModel.schema;
