/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useMutation, useQueryClient } from "react-query";

import { QueryType, TMutationOptions } from "@/services/types";
import { IBaseSchema, IDynamicProps, TType } from "@/types/base.types";

import { useEntityApiClient } from "../useApiClient";

import { isSameEntity, useNormalizeAndCache } from "./helpers";

export const useCreate = <
  TEntity extends IDynamicProps["entity"],
  TAttr = TType<TEntity>["attributes"],
  TBasic extends IBaseSchema = TType<TEntity>["basic"],
  TFull extends IBaseSchema = TType<TEntity>["full"],
>(
  entity: TEntity,
  options?: Omit<
    TMutationOptions<TBasic, Error, TAttr, TBasic>,
    "mutationFn" | "mutationKey"
  >,
) => {
  const api = useEntityApiClient<TAttr, TBasic, TFull>(entity);
  const queryClient = useQueryClient();
  const normalizeAndCache = useNormalizeAndCache<TBasic, string>(entity);
  const { invalidate = true, ...otherOptions } = options || {};

  return useMutation({
    mutationFn: async (variables: TAttr) => {
      const data = await api.create(variables);
      const { entities, result } = normalizeAndCache(data);

      // Invalidate all counts & collections
      if (invalidate) {
        queryClient.removeQueries({
          predicate: ({ queryKey }) => {
            const [qType, qEntity] = queryKey;

            return (
              (qType === QueryType.count || qType === QueryType.collection) &&
              isSameEntity(qEntity, entity)
            );
          },
        });
      }

      return entities[entity]?.[result] as unknown as TBasic;
    },
    ...otherOptions,
  });
};
