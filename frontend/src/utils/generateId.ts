/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { getRandom } from "./safeRandom";

export const generateId = () => {
  const d =
    typeof performance === "undefined" ? Date.now() : performance.now() * 1000;

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (getRandom() * 16 + d) % 16 | 0;

    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};
