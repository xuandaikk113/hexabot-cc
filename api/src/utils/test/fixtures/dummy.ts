/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { DummyCreateDto } from '@/utils/test/dummy/dto/dummy.dto';
import { DummyModel } from '@/utils/test/dummy/schemas/dummy.schema';

export const dummyFixtures: DummyCreateDto[] = [
  {
    dummy: 'dummy test 1',
  },
  {
    dummy: 'dummy test 2',
  },
  {
    dummy: 'dummy test 3',
  },
  {
    dummy: 'dummy test 4',
  },
];

export const installDummyFixtures = async () => {
  const Dummy = mongoose.model(DummyModel.name, DummyModel.schema);
  return await Dummy.insertMany(dummyFixtures);
};
