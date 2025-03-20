/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Typography } from "@mui/material";
import { GridColumnHeaderParams, GridValidRowModel } from "@mui/x-data-grid";

export const renderHeader = <T extends GridValidRowModel>({
  colDef,
}: GridColumnHeaderParams<T, any, any>) => (
  <Typography
    sx={{
      textTransform: "capitalize",
    }}
    fontSize="15px"
    fontWeight={700}
  >
    {colDef?.headerName}
  </Typography>
);
