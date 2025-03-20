/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { InputAdornment, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

import { theme } from "@/layout/themes/theme";

export const Adornment = ({
  Icon,
  color = theme.palette.text.secondary,
}: {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  color?: string;
}) => {
  return (
    <InputAdornment position="start" disablePointerEvents>
      <Icon htmlColor={color} />
    </InputAdornment>
  );
};
