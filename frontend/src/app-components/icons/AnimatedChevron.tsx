/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Theme, styled } from "@mui/material";
import { FC } from "react";

export type ChevronProps = {
  htmlColor?: string;
  canRotate?: boolean;
  from?: string;
  to?: string;
};

const StyledChevronRight = styled(ChevronRightIcon, {
  shouldForwardProp: (prop) => prop !== "canRotate",
})(
  ({
    canRotate = false,
    htmlColor,
    theme,
    from = "0",
    to = "90",
  }: {
    theme?: Theme;
  } & ChevronProps) => ({
    color: htmlColor || theme?.palette.common.white,
    transition: "all 300ms",
    ...(from && { transform: `rotate(${from}deg)` }),
    ...(canRotate && { transform: `rotate(${to}deg)` }),
  }),
);

export const AnimatedChevron: FC<ChevronProps> = (props) => (
  <StyledChevronRight {...props} />
);
