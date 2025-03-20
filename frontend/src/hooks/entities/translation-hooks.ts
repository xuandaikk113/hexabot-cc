/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useMutation } from "react-query";

import { TMutationOptions } from "@/services/types";

import { useApiClient } from "../useApiClient";

export const useRefreshTranslations = (
  options?: Omit<
    TMutationOptions<
      {
        acknowledged: boolean;
        deletedCount: number;
      },
      Error,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const { apiClient } = useApiClient();

  return useMutation({
    ...options,
    async mutationFn() {
      return await apiClient.refreshTranslations();
    },
  });
};
