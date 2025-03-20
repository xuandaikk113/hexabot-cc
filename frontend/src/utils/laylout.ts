/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { FULL_WIDTH_PATHNAMES } from "@/services/types";

type TLayout = "default" | "full_width";

export const getLayout = (pathname: string): TLayout =>
  FULL_WIDTH_PATHNAMES.some((path) => pathname.startsWith(path))
    ? "full_width"
    : "default";
