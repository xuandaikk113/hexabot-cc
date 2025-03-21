/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Box, Typography } from "@mui/material";

import { useTranslate } from "@/hooks/useTranslate";

import HexabotLogoRound from "../logos/HexabotLogoRound";

export const ChatWidgetHeader = () => {
  const { t } = useTranslate();

  return (
    <Box display="flex" alignItems="center" ml={2}>
      <HexabotLogoRound width={32} height={32} />
      <Typography component="h2" fontSize="1.25rem" ml={2}>
        {t("title.console")}
      </Typography>
    </Box>
  );
};
