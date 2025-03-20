/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import MongoStore from 'connect-mongo';

import { config } from '@/config';

let sessionStore: MongoStore | null = null;

export const getSessionStore = () => {
  if (!sessionStore) {
    sessionStore = MongoStore.create({
      mongoUrl: config.mongo.uri,
      dbName: config.mongo.dbName,
      collectionName: 'sessions',
    });
  }
  return sessionStore;
};
