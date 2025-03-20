/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { HelperSetting } from '@/helper/types';
import { SettingType } from '@/setting/schemas/types';

export const TEST_HELPER_NAME = 'test-helper';

export const TEST_HELPER_NAMESPACE = 'test_helper';

export default [
  {
    group: TEST_HELPER_NAMESPACE,
    label: 'test',
    value: 'test',
    type: SettingType.text,
  },
] as const satisfies HelperSetting<typeof TEST_HELPER_NAME>[];
