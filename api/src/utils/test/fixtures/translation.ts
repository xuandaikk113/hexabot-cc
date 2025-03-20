/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { TranslationUpdateDto } from '@/i18n/dto/translation.dto';
import { TranslationModel } from '@/i18n/schemas/translation.schema';

export const translationFixtures: TranslationUpdateDto[] = [
  {
    str: 'Welcome',
    translations: {
      en: 'Welcome',
      fr: 'Bienvenue',
    },
    // translated: 100,
  },
];

export const installTranslationFixtures = async () => {
  const Translation = mongoose.model(
    TranslationModel.name,
    TranslationModel.schema,
  );
  return await Translation.insertMany(translationFixtures);
};
