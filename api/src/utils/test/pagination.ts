/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { config } from '@/config';

import { PageQueryDto } from '../pagination/pagination-query.dto';

export const getPageQuery = <T>(
  props?: Partial<PageQueryDto<T>>,
): PageQueryDto<T> => ({
  skip: 0,
  limit: config.pagination.limit,
  sort: ['createdAt', 'desc'],
  ...props,
});
