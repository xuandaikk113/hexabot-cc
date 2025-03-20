/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { BaseBlockPlugin } from './base-block-plugin';
import { BaseEventPlugin } from './base-event-plugin';
import { BasePlugin } from './base-plugin.service';
import { PluginType } from './types';

const PLUGIN_TYPE_MAP = {
  [PluginType.event]: BaseEventPlugin,
  [PluginType.block]: BaseBlockPlugin,
};

export type PluginTypeMap = typeof PLUGIN_TYPE_MAP;

export type PluginInstance<T extends PluginType> = InstanceType<
  PluginTypeMap[T]
> &
  BasePlugin;
