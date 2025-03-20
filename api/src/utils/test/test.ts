/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (
  fixturesFn: (...args: any) => Promise<any>,
  options: MongooseModuleOptions = {},
) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      const dbName = 'test';
      mongod = await MongoMemoryServer.create({
        instance: { dbName },
      });
      const uri = mongod.getUri();
      await mongoose.connect(`${uri}`);
      await fixturesFn({ uri, dbName });
      return {
        uri,
        ...options,
      };
    },
  });

export const closeInMongodConnection = async () => {
  try {
    await mongoose.disconnect();
    if (mongod) await mongod.stop();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Unable to close MongoDB connection', err);
  }
};
