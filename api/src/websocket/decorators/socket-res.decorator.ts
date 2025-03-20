/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SocketRes = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient<any>();
    return client.response; // Assuming `response` is attached to the client object
  },
);
