/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Grid, GridProps, SxProps, Theme } from "@mui/material";
import * as React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
  sx?: SxProps<Theme>;
}

export function TabPanel(props: TabPanelProps & GridProps) {
  const { children, value, index, sx, ...other } = props;

  return (
    <Grid
      item
      xs
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index ? (
        <Grid container sx={{ flexDirection: "column", ...sx }}>
          {children}
        </Grid>
      ) : null}
    </Grid>
  );
}

export function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
