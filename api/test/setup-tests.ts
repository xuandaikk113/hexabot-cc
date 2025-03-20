/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

let mockSession = null;

jest.mock('connect-mongo', () => ({
  create: jest.fn(() => ({
    set: jest.fn((_id, newSession, next) => {
      mockSession = newSession;
      next();
    }),
    get: jest.fn((_id, next) => {
      next(null, mockSession);
    }),
  })),
}));

jest.mock('@resvg/resvg-js', () => {
  return {
    Resvg: jest.fn().mockImplementation(() => ({
      render: jest.fn().mockReturnValue({ asPng: jest.fn() }),
    })),
  };
});
