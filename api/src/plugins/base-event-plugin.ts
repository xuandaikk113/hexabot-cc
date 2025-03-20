/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BasePlugin } from './base-plugin.service';
import { PluginService } from './plugins.service';
import { PluginName, PluginType } from './types';

@Injectable()
export abstract class BaseEventPlugin extends BasePlugin {
  public readonly type: PluginType = PluginType.event;

  constructor(name: PluginName, pluginService: PluginService<BasePlugin>) {
    super(name, pluginService);
  }
}
