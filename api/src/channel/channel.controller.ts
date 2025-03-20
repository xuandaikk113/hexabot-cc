/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Controller, Get } from '@nestjs/common';

import { ChannelService } from './channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  /**
   * Retrieves the list of channels.
   *
   * @returns An array of objects where each object represents a channel with a `name` property.
   */
  @Get()
  getChannels(): { name: string }[] {
    return this.channelService.getAll().map((handler) => {
      return {
        name: handler.getName(),
      };
    });
  }
}
