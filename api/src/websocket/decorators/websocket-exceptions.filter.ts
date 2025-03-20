/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    NotFoundException,
} from '@nestjs/common';

import { SocketResponse } from '../utils/socket-response';

@Catch()
export class WebSocketExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<any>();
    const response = new SocketResponse(client);

    if (exception instanceof NotFoundException) {
      response.status(404).json({ error: 'Not Found' });
    } else {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
