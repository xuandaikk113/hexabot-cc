/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { SubscriberStub } from '@/chat/schemas/subscriber.schema';

declare module 'express-session' {
  interface SessionUser {
    id?: string;
    first_name?: string;
    last_name?: string;
  }

  interface SessionData<T extends SubscriberStub> {
    passport?: {
      user?: SessionUser;
    };
    web?: {
      profile?: T;
      isSocket: boolean;
      messageQueue: any[];
      polling: boolean;
    };
  }

  interface Session {
    csrfSecret?: string;
    passport?: {
      user?: SessionUser;
    };
    web?: {
      profile?: SubscriberStub;
      isSocket: boolean;
      messageQueue: any[];
      polling: boolean;
    };
  }
}
