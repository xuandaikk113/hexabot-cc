/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { LanguageCreateDto } from '@/i18n/dto/language.dto';
import { LanguageModel } from '@/i18n/schemas/language.schema';

export const languageFixtures: LanguageCreateDto[] = [
  {
    title: 'English',
    code: 'en',
    isDefault: true,
    isRTL: false,
  },
  {
    title: 'Français',
    code: 'fr',
    isDefault: false,
    isRTL: false,
  },
];

export const installLanguageFixtures = async () => {
  const Language = mongoose.model(LanguageModel.name, LanguageModel.schema);
  return await Language.insertMany(languageFixtures);
};
