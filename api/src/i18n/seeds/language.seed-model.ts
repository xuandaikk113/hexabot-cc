/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { LanguageCreateDto } from '../dto/language.dto';

export const languageModels: LanguageCreateDto[] = [
  {
    title: 'English',
    code: 'en',
    isRTL: false,
    isDefault: true,
  },
  {
    title: 'Français',
    code: 'fr',
    isRTL: false,
  },
];
