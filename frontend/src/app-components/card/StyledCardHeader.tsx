/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Grid, styled, Typography } from "@mui/material";

import { SXStyleOptions } from "@/utils/SXStyleOptions";

const StyledCardTitle = styled(Typography)(() => ({
  fontSize: "1.17em",
  fontWeight: 700,
}));
const StyledCardDescription = styled(Typography)(
  SXStyleOptions({
    paddingTop: 1,
    fontStyle: "italic",
    fontSize: ".75rem",
    color: "grey",
  }),
);

export const StyledCardHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Grid p={3}>
    <StyledCardTitle>{title}</StyledCardTitle>
    <StyledCardDescription>{description}</StyledCardDescription>
  </Grid>
);
