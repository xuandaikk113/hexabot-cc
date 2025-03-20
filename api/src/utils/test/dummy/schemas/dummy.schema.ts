/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseSchema } from '@/utils/generics/base-schema';
import { LifecycleHookManager } from '@/utils/generics/lifecycle-hook-manager';
import { THydratedDocument } from '@/utils/types/filter.types';

@Schema({ timestamps: true })
export class Dummy extends BaseSchema {
  @Prop({
    type: String,
    required: true,
  })
  dummy: string;
}

export type DummyDocument = THydratedDocument<Dummy>;

export const DummyModel = LifecycleHookManager.attach({
  name: Dummy.name,
  schema: SchemaFactory.createForClass(Dummy),
});
