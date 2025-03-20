/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import CONSOLE_CHANNEL_SETTINGS, {
    CONSOLE_CHANNEL_NAMESPACE,
} from './settings';

declare global {
  interface Settings extends SettingTree<typeof CONSOLE_CHANNEL_SETTINGS> {}
  interface SubscriberChannelDict {
    [CONSOLE_CHANNEL_NAME]: {
      isSocket: boolean;
      ipAddress: string;
      agent: string;
    };
  }
}

declare module '@nestjs/event-emitter' {
  interface IHookExtensionsOperationMap {
    [CONSOLE_CHANNEL_NAMESPACE]: TDefinition<
      object,
      SettingMapByType<typeof CONSOLE_CHANNEL_SETTINGS>
    >;
  }
}
