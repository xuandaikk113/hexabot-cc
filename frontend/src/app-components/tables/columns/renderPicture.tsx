/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Grid } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

import { getAvatarSrc } from "@/components/inbox/helpers/mapMessages";
import { useConfig } from "@/hooks/useConfig";
import { EntityType } from "@/services/types";

export const buildRenderPicture = (
  entityType: EntityType.USER | EntityType.SUBSCRIBER,
) =>
  function RenderPicture(params: GridRenderCellParams) {
    const { apiUrl } = useConfig();

    return (
      <Grid
        container
        sx={{
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={getAvatarSrc(apiUrl, entityType, params.row.id)}
          style={{ width: "36px", height: "36px" }}
        />
      </Grid>
    );
  };
