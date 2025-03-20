/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { MetadataCreateDto } from '@/setting/dto/metadata.dto';
import { MetadataModel } from '@/setting/schemas/metadata.schema';

const metadataFixtures: MetadataCreateDto[] = [
  {
    name: 'app-version',
    value: '2.2.0',
  },
];

export const installMetadataFixtures = async () => {
  const Metadata = mongoose.model(MetadataModel.name, MetadataModel.schema);
  return await Metadata.insertMany(metadataFixtures);
};
