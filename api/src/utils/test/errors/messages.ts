/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export const getUpdateOneError = (entity: string, id?: string) =>
  new Error(`Unable to update ${entity}${id ? ` with ID \"${id}\"` : ''}`);
