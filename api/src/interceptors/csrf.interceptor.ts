/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';
import {
    CsrfMiddlewareOptions,
    CsrfInterceptor as NestjsCsrfInterceptor,
} from '@tekuconcept/nestjs-csrf';

@Injectable()
export class CsrfInterceptor extends NestjsCsrfInterceptor {
  constructor(options: CsrfMiddlewareOptions = {}) {
    super({
      methods: {
        create: ['GET', 'POST', 'PATCH', 'DELETE'],
        validate: ['GET', 'POST', 'PATCH', 'DELETE'],
      },
      ...options,
    });
  }
}
