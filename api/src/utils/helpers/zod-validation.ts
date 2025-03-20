/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ZodSchema } from 'zod';

export function buildZodSchemaValidator<T>(zodSchema: ZodSchema<T>) {
  return (data: unknown) => {
    return zodSchema.safeParse(data).success;
  };
}
