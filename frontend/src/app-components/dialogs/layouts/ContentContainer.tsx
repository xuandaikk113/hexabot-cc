/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Grid, GridProps } from "@mui/material";
import { FC } from "react";

export type ContentContainerProps = GridProps & {
  children: React.ReactNode;
};
export const ContentContainer: FC<ContentContainerProps> = ({
  children,
  ...rest
}) => (
  <Grid container gap={1} direction="column" {...rest}>
    {children}
  </Grid>
);
