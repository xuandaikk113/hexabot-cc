/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import axios from "axios";
import { createContext, FC, ReactNode } from "react";

import { getApiClientByEntity, useAxiosInstance } from "@/hooks/useApiClient";
import { ApiClient, EntityApiClient } from "@/services/api.class";
import { EntityType } from "@/services/types";
import { IBaseSchema } from "@/types/base.types";

interface ApiClientContextProps {
  children: ReactNode;
}

export interface ApiClientContext {
  apiClient: ApiClient;
  getApiClientByEntity: <TAttr, TStub extends IBaseSchema, TFull = never>(
    type: EntityType,
  ) => EntityApiClient<TAttr, TStub, TFull>;
}

export const ApiClientContext = createContext<ApiClientContext>({
  apiClient: new ApiClient(axios.create()),
  getApiClientByEntity: () => {
    throw new Error(
      "getApiClientByEntity must be used within an ApiClientProvider",
    );
  },
});

export const ApiClientProvider: FC<ApiClientContextProps> = ({ children }) => {
  const axiosInstance = useAxiosInstance();
  const apiClient = new ApiClient(axiosInstance);

  return (
    <ApiClientContext.Provider
      value={{
        apiClient,
        getApiClientByEntity: (type) => getApiClientByEntity(type, apiClient),
      }}
    >
      {children}
    </ApiClientContext.Provider>
  );
};
