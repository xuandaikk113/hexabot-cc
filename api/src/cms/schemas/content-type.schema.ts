/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 */

import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';

import { User } from '@/user/schemas/user.schema';
import { BaseSchema } from '@/utils/generics/base-schema';
import { LifecycleHookManager } from '@/utils/generics/lifecycle-hook-manager';

@Schema({ timestamps: true })
export class ContentTypeStub extends BaseSchema {
  /**
   * The name the content type.
   */
  @Prop({ type: String, required: true, unique: true })
  name: string;

  /**
   * The way this type is defined and is presented.
   */

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    default: [
      {
        name: 'title',
        label: 'Title',
        type: 'text',
      },
      {
        name: 'status',
        label: 'Status',
        type: 'checkbox',
      },
    ],
  })
  fields: {
    name: string;
    label: string;
    type: string;
  }[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: unknown;
}

@Schema({ timestamps: true })
export class ContentType extends ContentTypeStub {
  @Transform(({ obj }) => obj.createdBy.toString())
  createdBy: string;
}

@Schema({ timestamps: true })
export class ContentTypeFull extends ContentTypeStub {
  @Type(() => User)
  createdBy: User;
}

export const ContentTypeModel: ModelDefinition = LifecycleHookManager.attach({
  name: ContentType.name,
  schema: SchemaFactory.createForClass(ContentTypeStub),
});

export default ContentTypeModel.schema;
