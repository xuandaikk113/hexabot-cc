/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Box } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

import { TMenuItem } from "@/app-components/menus/Sidebar";

import { Title } from "./Title";

export const PageHeader = (
  props: PropsWithChildren<{
    title: string;
    icon: TMenuItem["Icon"];
    chip?: ReactNode;
  }>,
) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        flexWrap: "nowrap",
        width: "100%",
      }}
    >
      <Title title={props.title} icon={props.icon} chip={props.chip} />

      {props.children}
    </Box>
  );
};
