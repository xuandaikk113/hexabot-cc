/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { SettingCreateDto } from '../dto/setting.dto';
import { SettingType } from '../schemas/types';

export const DEFAULT_SETTINGS = [
  {
    group: 'chatbot_settings',
    label: 'default_nlu_helper',
    value: 'llm-nlu-helper',
    type: SettingType.select,
    config: {
      multiple: false,
      allowCreate: false,
      entity: 'Helper',
      idKey: 'name',
      labelKey: 'name',
    },
    weight: 1,
  },
  {
    group: 'chatbot_settings',
    label: 'default_llm_helper',
    value: 'ollama-helper',
    type: SettingType.select,
    config: {
      multiple: false,
      allowCreate: false,
      entity: 'Helper',
      idKey: 'name',
      labelKey: 'name',
    },
    weight: 2,
  },
  {
    group: 'chatbot_settings',
    label: 'default_storage_helper',
    value: 'local-storage-helper',
    type: SettingType.select,
    config: {
      multiple: false,
      allowCreate: false,
      entity: 'Helper',
      idKey: 'name',
      labelKey: 'name',
    },
    weight: 3,
  },
  {
    group: 'chatbot_settings',
    label: 'global_fallback',
    value: true,
    type: SettingType.checkbox,
    weight: 4,
  },
  {
    group: 'chatbot_settings',
    label: 'fallback_block',
    value: '',
    options: [],
    type: SettingType.select,
    config: {
      multiple: false,
      allowCreate: false,
      entity: 'Block',
      idKey: 'id',
      labelKey: 'name',
    },
    weight: 5,
  },
  {
    group: 'chatbot_settings',
    label: 'fallback_message',
    value: [
      "Sorry but i didn't understand your request. Maybe you can check the menu",
      "I'm really sorry but i don't quite understand what you are saying :(",
    ] as string[],
    type: SettingType.multiple_text,
    weight: 6,
    translatable: true,
  },
  {
    group: 'contact',
    label: 'contact_email_recipient',
    value: 'admin@example.com',
    type: SettingType.text,
    weight: 1,
  },
  {
    group: 'contact',
    label: 'company_name',
    value: 'Your company name',
    type: SettingType.text,
    weight: 2,
  },
  {
    group: 'contact',
    label: 'company_phone',
    value: '(+999) 9999 9999 999',
    type: SettingType.text,
    weight: 3,
  },
  {
    group: 'contact',
    label: 'company_email',
    value: 'contact[at]mycompany.com',
    type: SettingType.text,
    weight: 4,
  },
  {
    group: 'contact',
    label: 'company_address1',
    value: '71 Pilgrim Avenue',
    type: SettingType.text,
    weight: 5,
  },
  {
    group: 'contact',
    label: 'company_address2',
    value: '',
    type: SettingType.text,
    weight: 6,
  },
  {
    group: 'contact',
    label: 'company_city',
    value: 'Chevy Chase',
    type: SettingType.text,
    weight: 7,
  },
  {
    group: 'contact',
    label: 'company_zipcode',
    value: '85705',
    type: SettingType.text,
    weight: 8,
  },
  {
    group: 'contact',
    label: 'company_state',
    value: 'Orlando',
    type: SettingType.text,
    weight: 9,
  },
  {
    group: 'contact',
    label: 'company_country',
    value: 'US',
    type: SettingType.text,
    weight: 10,
  },
] as const satisfies SettingCreateDto[];
