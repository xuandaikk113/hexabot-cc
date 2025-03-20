/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { BaseSchema } from '@/utils/generics/base-schema';
import { LifecycleHookManager } from '@/utils/generics/lifecycle-hook-manager';

@Schema({ timestamps: true })
export class Metadata extends BaseSchema {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: JSON, required: true })
  value: any;
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata);

export const MetadataModel: ModelDefinition = LifecycleHookManager.attach({
  name: Metadata.name,
  schema: SchemaFactory.createForClass(Metadata),
});

export type MetadataDocument = Metadata & Document;
