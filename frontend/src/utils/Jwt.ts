/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { TJwtPayload } from "@/types/jwt.types";

export class JWT<T extends TJwtPayload> {
  decode(token: string): T {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url?.replace("-", "+").replace("_", "/");

      return JSON.parse(window.atob(base64));
    } catch (e) {
      throw new Error("Invalid Token");
    }
  }

  isExpired({ exp }: T): boolean {
    if (exp) return exp < Date.now() / 1000;

    return true;
  }
}
