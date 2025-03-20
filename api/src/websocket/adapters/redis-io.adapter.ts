/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { InternalServerErrorException } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ServerOptions } from 'socket.io';

import { config } from '@/config';

export class RedisIoAdapter extends IoAdapter {
  private adapter: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    if (config.cache.host !== 'redis') {
      throw new InternalServerErrorException(
        `Unable to run connect to redis host is ${config.cache.host} instead of 'redis'`,
      );
    }
    // @todo : add zod validation
    const redisConfig = {
      socket: {
        host: config.cache.host,
        port: config.cache.port,
      },
    };
    const pubClient = createClient(redisConfig);
    const subClient = pubClient.duplicate();
    pubClient.on('error', (error) => {
      throw error;
    });
    subClient.on('error', (error) => {
      throw error;
    });
    await Promise.all([pubClient.connect(), subClient.connect()]);
    this.adapter = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapter);
    return server;
  }
}
