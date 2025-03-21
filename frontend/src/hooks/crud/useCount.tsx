/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useQuery, UseQueryOptions } from "react-query";

import { EntityType, QueryType } from "@/services/types";
import { IDynamicProps, TType } from "@/types/base.types";

import { useEntityApiClient } from "../useApiClient";

export const useCount = <TEntity extends IDynamicProps["entity"]>(
  entity: TEntity,
  params?: Partial<TType<TEntity>["basic"]>,
  options?: Omit<
    UseQueryOptions<
      { count: number },
      Error,
      { count: number },
      [QueryType, EntityType, unknown]
    >,
    "queryFn"
  >,
) => {
  const api = useEntityApiClient(entity);

  return useQuery({
    ...options,
    queryFn: () => api.count({ where: params }),
    queryKey: [QueryType.count, entity, JSON.stringify(params)],
  });
};
