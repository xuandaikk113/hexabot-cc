/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Grid, GridProps } from "@mui/material";

export const ContentItem = ({
  children,
  ...rest
}: { children: React.ReactNode } & GridProps) => {
  return (
    <Grid py={1} px={0} {...rest}>
      {children}
    </Grid>
  );
};
