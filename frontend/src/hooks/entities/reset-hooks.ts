/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useMutation } from "react-query";

import { TMutationOptions } from "@/services/types";
import { IResetPayload, IResetRequest } from "@/types/reset.types";

import { useApiClient } from "../useApiClient";

export const useRequestResetPassword = (
  options?: Omit<
    TMutationOptions<void, Error, IResetRequest, unknown>,
    "mutationFn"
  >,
) => {
  const { apiClient } = useApiClient();

  return useMutation<void, Error, IResetRequest>({
    ...options,
    mutationFn: async (payload) => {
      return await apiClient.requestReset(payload);
    },
  });
};

export const useResetPassword = (
  token: string,
  options?: Omit<
    TMutationOptions<void, Error, IResetPayload, unknown>,
    "mutationFn"
  >,
) => {
  const { apiClient } = useApiClient();

  return useMutation<void, Error, IResetPayload>({
    ...options,
    mutationFn: async (payload) => {
      return await apiClient.reset(token, payload);
    },
  });
};
