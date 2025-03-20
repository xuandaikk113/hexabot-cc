/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Grid, Typography } from "@mui/material";

import { useTranslate } from "@/hooks/useTranslate";

import NoDataIcon from "../svg/NoDataIcon";

export const NoDataOverlay = () => {
  const { t } = useTranslate();

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "fit-content",
        gap: 1,
        opacity: 0.5,
        paddingY: 1,
      }}
    >
      <NoDataIcon />
      <Grid item>
        <Typography
          style={{
            color: "text.secondary",
          }}
        >
          {t("label.no_data")}
        </Typography>
      </Grid>
    </Grid>
  );
};
