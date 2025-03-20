/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import React, { createContext, ReactNode, useEffect, useState } from "react";

import { useConfig } from "./ConfigProvider";

const CookieContext = createContext({});

export const CookieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const config = useConfig();
  const [initialized, setInitialized] = useState(false);
  const getCookie = async () => {
    try {
      await fetch(`${config.apiUrl}/__getcookie`, {
        credentials: "include",
      });
      setInitialized(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("Unable to get cookies ...");
    }
  };

  useEffect(() => {
    if (!initialized) {
      getCookie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialized) {
    return null;
  }

  return <CookieContext.Provider value={{}}>{children}</CookieContext.Provider>;
};
