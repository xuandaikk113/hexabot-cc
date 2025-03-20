/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { Migration, MigrationModel } from '@/migration/migration.schema';
import { MigrationAction } from '@/migration/types';

const migrationFixtures: Migration[] = [
  {
    version: 'v2.1.2',
    status: MigrationAction.UP,
  },
  {
    version: 'v2.1.1',
    status: MigrationAction.DOWN,
  },
];

export const installMigrationFixtures = async () => {
  const Migration = mongoose.model(MigrationModel.name, MigrationModel.schema);
  return await Migration.insertMany(migrationFixtures);
};
