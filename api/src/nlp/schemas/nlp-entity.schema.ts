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

import { Lookup } from '../dto/nlp-entity.dto';

import { NlpValue } from './nlp-value.schema';
import { NlpEntityMap } from './types';

@Schema({ timestamps: true })
export class NlpEntityStub extends BaseSchema {
  /**
   * This entity foreign id (nlp provider).
   */
  @Prop({ type: String, required: false, unique: false })
  foreign_id?: string;

  /**
   * The entity name.
   */
  @Prop({
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_]+$/,
  })
  name: string;

  /**
   * Lookup strategy can contain : keywords, trait, free-text
   */
  @Prop({ type: [String], default: ['keywords'] })
  lookups: Lookup[];

  /**
   * Description of the entity purpose.
   */
  @Prop({ type: String })
  doc?: string;

  /**
   * Either or not this entity a built-in (either fixtures or shipped along with the 3rd party ai).
   */
  @Prop({ type: Boolean, default: false })
  builtin: boolean;

  /**
   * Returns a map object for entities
   * @param entities - Array of entities
   * @returns {NlpEntityMap} - Object that contains entities identified by key=entity.id
   
   */
  static getEntityMap<T extends NlpEntityStub>(entities: T[]) {
    return entities.reduce((acc, curr: T) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as NlpEntityMap<T>);
  }

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: unknown;
}

@Schema({ timestamps: true })
export class NlpEntity extends NlpEntityStub {
  @Transform(({ obj }) => obj.createdBy.toString())
  createdBy: string;

  @Exclude()
  values?: never;
}

@Schema({ timestamps: true })
export class NlpEntityFull extends NlpEntityStub {
  @Type(() => User)
  createdBy: User;

  @Type(() => NlpValue)
  values: NlpValue[];
}

export type NlpEntityDocument = THydratedDocument<NlpEntity>;

export const NlpEntityModel: ModelDefinition = LifecycleHookManager.attach({
  name: NlpEntity.name,
  schema: SchemaFactory.createForClass(NlpEntityStub),
});

NlpEntityModel.schema.virtual('values', {
  ref: 'NlpValue',
  localField: '_id',
  foreignField: 'entity',
});

export default NlpEntityModel.schema;

export type NlpEntityPopulate = keyof TFilterPopulateFields<
  NlpEntity,
  NlpEntityStub
>;

export const NLP_ENTITY_POPULATE: NlpEntityPopulate[] = ['values', 'createdBy'];
