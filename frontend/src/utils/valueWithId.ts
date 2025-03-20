/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { generateId } from "./generateId";

export type ValueWithId<T> = {
  id: string;
  value: T;
};

export const createValueWithId = <T>(value: T): ValueWithId<T> => {
  return { id: generateId(), value };
};
