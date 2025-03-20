/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import LLM_NLU_HELPER_SETTINGS, { LLM_NLU_HELPER_NAMESPACE } from './settings';

declare global {
  interface Settings extends SettingTree<typeof LLM_NLU_HELPER_SETTINGS> {}
}

declare module '@nestjs/event-emitter' {
  interface IHookExtensionsOperationMap {
    [LLM_NLU_HELPER_NAMESPACE]: TDefinition<
      object,
      SettingMapByType<typeof LLM_NLU_HELPER_SETTINGS>
    >;
  }
}
