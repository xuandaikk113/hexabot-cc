/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable, OnModuleInit } from '@nestjs/common';

import { Extension } from '@/utils/generics/extension';

import { PluginService } from './plugins.service';
import { PluginName, PluginType } from './types';

@Injectable()
export abstract class BasePlugin extends Extension implements OnModuleInit {
  public readonly type: PluginType;

  constructor(
    public readonly name: PluginName,
    private pluginService: PluginService<BasePlugin>,
  ) {
    super(name);
  }

  async onModuleInit() {
    await super.onModuleInit();
    this.pluginService.setPlugin(this.type, this.name, this);
  }
}
