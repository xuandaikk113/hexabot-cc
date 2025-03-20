/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { NlpEntityCreateDto } from '@/nlp/dto/nlp-entity.dto';
import { NlpEntityModel } from '@/nlp/schemas/nlp-entity.schema';

export const nlpEntityFixtures: NlpEntityCreateDto[] = [
  {
    name: 'intent',
    lookups: ['trait'],
    doc: '',
    builtin: false,
  },
  {
    name: 'first_name',
    lookups: ['keywords'],
    doc: '',
    builtin: false,
  },
  {
    name: 'built_in',
    lookups: ['trait'],
    doc: '',
    builtin: true,
  },
];

export const installNlpEntityFixtures = async () => {
  const NlpEntity = mongoose.model(NlpEntityModel.name, NlpEntityModel.schema);
  return await NlpEntity.insertMany(nlpEntityFixtures);
};
