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

import { isSameEntity } from "./helpers";

export const useUpdateMany = <
  TEntity extends IDynamicProps["entity"],
  TAttr = TType<TEntity>["attributes"],
  TBasic extends IBaseSchema = TType<TEntity>["basic"],
  TFull extends IBaseSchema = TType<TEntity>["full"],
>(
  entity: TEntity,
  options?: Omit<
    TMutationOptions<
      string,
      Error,
      {
        ids: string[];
        payload: Partial<TAttr>;
      },
      TBasic
    >,
    "mutationFn" | "mutationKey"
  >,
) => {
  const api = useEntityApiClient<TAttr, TBasic, TFull>(entity);
  const queryClient = useQueryClient();
  const { invalidate = true, ...otherOptions } = options || {};

  return useMutation({
    mutationFn: async ({
      ids,
      payload,
    }: {
      ids: string[];
      payload: Partial<TAttr>;
    }) => {
      const result = await api.updateMany(ids, payload);

      queryClient.removeQueries({
        predicate: ({ queryKey }) => {
          const [qType, qEntity, qId] = queryKey;

          return (
            qType === QueryType.item &&
            isSameEntity(qEntity, entity) &&
            ids.includes(qId as string)
          );
        },
      });

      if (invalidate) {
        queryClient.invalidateQueries({
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
