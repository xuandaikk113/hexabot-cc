/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Grid } from "@mui/material";
import dynamic from "next/dynamic";

const Diagrams = dynamic(() => import("./v2/Diagrams"), { ssr: false });
const VisualEditorProvider = dynamic(() => import("./hooks/useVisualEditor"), {
  ssr: false,
});
const Aside = dynamic(() => import("./Aside"), { ssr: false });

export const VisualEditor = () => {
  return (
    <VisualEditorProvider>
      <Grid
        container
        gap={2}
        flexDirection="column"
        height="calc(100vh - 64px)"
        width="100%"
      >
        <Grid container height="100%" margin="auto">
          <Aside />
          <Grid
            item
            xs
            overflow="hidden"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Diagrams />
          </Grid>
        </Grid>
      </Grid>
    </VisualEditorProvider>
  );
};
