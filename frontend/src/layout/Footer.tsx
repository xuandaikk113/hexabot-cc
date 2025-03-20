/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Typography, styled } from "@mui/material";

const StyledTypography = styled(Typography)(() => ({
  color: "#fff",
  right: "20px",
  bottom: "15px",
  zIndex: 2,
  position: "fixed",
  fontSize: "15px",
  fontWeight: 700,
  textShadow: "0 0 7px #000b",
}));

export const Footer = () => {
  return (
    <StyledTypography>
      © 2018 Hexabot - All rights are reserved
    </StyledTypography>
  );
};
