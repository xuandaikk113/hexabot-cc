/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { SortOrder } from 'mongoose';

import { BaseSchema } from '../generics/base-schema';

export type QuerySortDto<T> = [
  Exclude<keyof T | keyof BaseSchema | '_id', 'id'>,
  SortOrder,
];

export type PageQueryDto<T> = {
  skip: number | undefined;
  limit: number | undefined;
  sort?: QuerySortDto<T>;
};
