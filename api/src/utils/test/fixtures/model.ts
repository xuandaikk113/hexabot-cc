/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { ModelCreateDto } from '@/user/dto/model.dto';
import { ModelModel } from '@/user/schemas/model.schema';

export const modelFixtures: ModelCreateDto[] = [
  {
    name: 'ContentType',
    identity: 'contenttype',
    attributes: { att: 'att' },
    relation: 'role',
  },

  {
    name: 'Content',
    identity: 'content',
    attributes: { att: 'att' },
    relation: 'role',
  },
];

export const installModelFixtures = async () => {
  const Model = mongoose.model(ModelModel.name, ModelModel.schema);
  return await Model.insertMany(modelFixtures);
};
