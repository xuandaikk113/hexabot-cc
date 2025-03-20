/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { ChannelService } from '@/channel/channel.service';
import { HelperService } from '@/helper/helper.service';
import { CsrfInterceptor } from '@/interceptors/csrf.interceptor';
import { PluginService } from '@/plugins/plugins.service';

@UseInterceptors(CsrfInterceptor)
@Controller('i18n')
export class I18nController {
  constructor(
    private readonly pluginService: PluginService,
    private readonly helperService: HelperService,
    private readonly channelService: ChannelService,
  ) {}

  /**
   * Retrieves translations of all the installed extensions.
   * @returns An nested object that holds the translations grouped by language and extension name.
   */
  @Get()
  getTranslations() {
    const plugins = this.pluginService.getAll();
    const helpers = this.helperService.getAll();
    const channels = this.channelService.getAll();
    return [...plugins, ...helpers, ...channels].reduce((acc, curr) => {
      acc[curr.getNamespace()] = curr.getTranslations();
      return acc;
    }, {});
  }
}
