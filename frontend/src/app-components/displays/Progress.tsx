/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import {
    CircularProgress,
    CircularProgressProps,
    Stack,
    styled,
} from "@mui/material";

const StyledProgress = styled(Stack)(() => ({
  height: "100vh",
  alignItems: "center",
  placeContent: "center",
}));

export const Progress = (props: CircularProgressProps) => (
  <StyledProgress>
    <CircularProgress color="primary" {...props} />
  </StyledProgress>
);
