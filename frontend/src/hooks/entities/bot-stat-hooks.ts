/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useQuery } from "react-query";

import { StatsType } from "@/types/bot-stat.types";

import { useApiClient } from "../useApiClient";

export const useFindStats = <T>(type: StatsType) => {
  const { apiClient } = useApiClient();

  return useQuery({
    queryKey: ["stats", type],
    queryFn: async () => {
      return await apiClient.getBotStats<T>(type);
    },
  });
};
