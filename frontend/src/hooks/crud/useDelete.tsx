/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useMutation, useQueryClient } from "react-query";

import { QueryType, TMutationOptions } from "@/services/types";
import {
    IBaseSchema,
    IDynamicProps,
    IEntityMapTypes,
    TType,
} from "@/types/base.types";

import { useEntityApiClient } from "../useApiClient";

import { isSameEntity } from "./helpers";

export const useDelete = <
  TEntity extends IDynamicProps["entity"],
  TAttr = TType<TEntity>["attributes"],
  TBasic extends IBaseSchema = TType<TEntity>["basic"],
  TFull extends IBaseSchema = TType<TEntity>["full"],
>(
  entity: TEntity,
  options?: Omit<
    TMutationOptions<string, Error, string, TBasic>,
    "mutationFn" | "mutationKey"
  >,
) => {
  const api = useEntityApiClient<TAttr, TBasic, TFull>(entity);
  const queryClient = useQueryClient();
  const { invalidate = true, ...otherOptions } = options || {};

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await api.delete(id);

      queryClient.removeQueries({
        predicate: ({ queryKey }) => {
          const [qType, qEntity, qId] = queryKey;

          return (
            qType === QueryType.item &&
            isSameEntity(qEntity, entity) &&
            qId === id
          );
        },
      });

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

      return result;
    },
    ...otherOptions,
  });
};

export const useDeleteFromCache = <E extends keyof IEntityMapTypes>(
  entity: E,
) => {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.removeQueries({
      predicate: ({ queryKey }) => {
        const [qType, qEntity, qId] = queryKey;

        return qType === QueryType.item && qEntity === entity && qId === id;
      },
    });
  };
};
