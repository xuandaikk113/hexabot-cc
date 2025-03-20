/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { I18nService } from './i18n/services/i18n.service';

@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService) {}

  getHello(): string {
    return this.i18n.t('welcome', { lang: 'en' });
  }
}
