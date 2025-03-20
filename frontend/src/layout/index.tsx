/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { BoxProps, Grid } from "@mui/material";
import { useState } from "react";

import { ChatWidget } from "@/app-components/widget/ChatWidget";

import { Content } from "./content";
import { Header } from "./Header";
import { VerticalMenu } from "./VerticalMenu";

export interface IContentPaddingProps {
  hasNoPadding?: boolean;
}

export type LayoutProps = IContentPaddingProps & {
  children: JSX.Element;
  sxContent?: BoxProps;
};
export const Layout: React.FC<LayoutProps> = ({
  children,
  sxContent,
  ...rest
}) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <Grid container>
      <Header
        isSideBarOpen={isSideBarOpen}
        onToggleSidebar={() => setIsSideBarOpen(true)}
      />
      <VerticalMenu
        isSideBarOpen={isSideBarOpen}
        onToggleIn={() => setIsSideBarOpen(true)}
        onToggleOut={() => setIsSideBarOpen(false)}
      />
      <Content sx={sxContent} {...rest}>
        {children}
      </Content>
      <ChatWidget />
    </Grid>
  );
};
