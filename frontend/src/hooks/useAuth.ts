/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useRouter } from "next/router";
import { useContext } from "react";

import { AuthContext } from "@/contexts/auth.context";
import { RouterType } from "@/services/types";

export const CURRENT_USER_KEY = "current-user";
export const PUBLIC_PATHS = [
  "/login/[[...token]]",
  "/register/[token]",
  "/reset/[token]",
  "/reset",
];

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }

  return context;
};

export const useLogoutRedirection = () => {
  const router = useRouter();
  const hasPublicPath = PUBLIC_PATHS.includes(router.pathname);
  const logoutRedirection = async (fullReload: boolean = false) => {
    if (!hasPublicPath) {
      const redirectUrl = `/${RouterType.LOGIN}?redirect=${encodeURIComponent(
        router.asPath,
      )}`;

      if (fullReload) {
        window.location.replace(redirectUrl);
      } else {
        await router.replace(redirectUrl);
      }
    }
  };

  return { logoutRedirection };
};
