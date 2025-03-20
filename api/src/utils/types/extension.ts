/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ChannelName } from '@/channel/types';
import { HelperName } from '@/helper/types';
import { PluginName } from '@/plugins/types';

export type ExtensionName = ChannelName | HelperName | PluginName;

export type HyphenToUnderscore<S extends string> =
  S extends `${infer P}-${infer Q}` ? `${P}_${HyphenToUnderscore<Q>}` : S;
