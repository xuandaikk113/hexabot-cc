/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { INestApplication } from '@nestjs/common';

export class AppInstance {
  private static app: INestApplication;

  static setApp(app: INestApplication) {
    this.app = app;
  }

  static getApp(): INestApplication {
    if (!this.app) {
      throw new Error('App instance has not been set yet.');
    }
    return this.app;
  }
}
