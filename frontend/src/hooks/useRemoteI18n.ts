/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useEffect, useRef } from "react";

import i18n from "@/i18n/config";

import { useApiClient } from "./useApiClient";
import { useAuth } from "./useAuth";

export const useRemoteI18n = () => {
  const { isAuthenticated } = useAuth();
  const { apiClient } = useApiClient();
  const isRemoteI18nLoaded = useRef(false);

  useEffect(() => {
    const fetchRemoteI18n = async () => {
      try {
        const additionalTranslations = await apiClient.fetchRemoteI18n();

        Object.keys(additionalTranslations).forEach((namespace) => {
          Object.keys(additionalTranslations[namespace]).forEach((lang) => {
            i18n.addResourceBundle(
              lang,
              namespace,
              additionalTranslations[namespace][lang],
              true,
              true,
            );
          });
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch remote i18n translations:", error);
      }
    };

    if (isAuthenticated && !isRemoteI18nLoaded.current) {
      fetchRemoteI18n();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
};
