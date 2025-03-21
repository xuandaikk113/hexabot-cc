/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { createContext, useEffect, useState } from "react";

export const ConfigContext = createContext<IConfig | null>(null);

export interface IConfig {
  apiUrl: string;
  ssoEnabled: boolean;
  maxUploadSize: number;
}

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState<IConfig | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/config");
        const data = (await res.json()) as IConfig;

        setConfig(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch configuration:", error);
      }
    };

    fetchConfig();
  }, []);

  if (!config) {
    // You can return a loader here if you want
    return null;
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};
