/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

import { ContentElement } from '@/chat/schemas/types/message';
import { config } from '@/config';
import { User } from '@/user/schemas/user.schema';
import { BaseSchema } from '@/utils/generics/base-schema';
import { LifecycleHookManager } from '@/utils/generics/lifecycle-hook-manager';
import { TFilterPopulateFields } from '@/utils/types/filter.types';

import { ContentType } from './content-type.schema';

export type ContentDocument = Document<Content>;

@Schema({ timestamps: true, strict: false })
export class ContentStub extends BaseSchema {
  /**
   * The content type of this content.
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ContentType',
  })
  entity: unknown;

  /**
   * The title of the content.
   */
  @Prop({ type: String, required: true })
  title: string;

  /**
   * Either of not this content is active.
   */
  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  dynamicFields: Record<string, any>;

  @Prop({ type: String })
  rag?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: unknown;

  /**
   * Helper to return the internal url of this content.
   */
  static getUrl(item: ContentElement): string {
    return new URL('/content/view/' + item.id, config.apiBaseUrl).toString();
  }

  /**
   * Helper that returns the relative chatbot payload for this content.
   */
  static getPayload(item: ContentElement): string {
    return 'postback' in item ? (item.postback as string) : item.title;
  }
}

@Schema({ timestamps: true })
export class Content extends ContentStub {
  @Transform(({ obj }) => obj.createdBy.toString())
  createdBy: string;

  @Transform(({ obj }) => obj.entity.toString())
  entity: string;

  /**
   * Converts a content object to an element (A flat representation of a content)
   *
   * @param content
   * @returns An object that has all dynamic fields accessible at top level
   */
  static toElement(content: Content): ContentElement {
    return {
      id: content.id,
      title: content.title,
      ...content.dynamicFields,
    };
  }
}

@Schema({ timestamps: true })
export class ContentFull extends ContentStub {
  @Type(() => User)
  createdBy: User;

  @Type(() => ContentType)
  entity: ContentType;
}

const ContentSchema = SchemaFactory.createForClass(ContentStub);
ContentSchema.index(
  {
    title: 'text',
    rag: 'text',
  },
  {
    weights: {
      title: 2,
      rag: 1,
    },
    background: false,
  },
);

export const ContentModel: ModelDefinition = LifecycleHookManager.attach({
  name: Content.name,
  schema: ContentSchema,
});

export default ContentModel.schema;

export type ContentPopulate = keyof TFilterPopulateFields<Content, ContentStub>;

export const CONTENT_POPULATE: ContentPopulate[] = ['entity', 'createdBy'];
