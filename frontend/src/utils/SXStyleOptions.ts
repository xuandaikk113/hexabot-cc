/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { SxProps, Theme } from "@mui/material";

export const SXStyleOptions =
  (args: SxProps<Theme>) =>
  ({ theme }: { theme: Theme }) =>
    theme.unstable_sx(args);
