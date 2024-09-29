/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
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
