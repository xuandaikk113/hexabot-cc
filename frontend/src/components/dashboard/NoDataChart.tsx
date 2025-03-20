/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled, Typography } from "@mui/material";

import { useTranslate } from "@/hooks/useTranslate";
import { SXStyleOptions } from "@/utils/SXStyleOptions";

export const StyledMessage = styled(Typography)(
  SXStyleOptions({
    color: "grey.400",
    fontSize: "body1.fontSize",
    fontWeight: "700",
    display: "block",
    margin: 0,
  }),
);

export const NoDataChart = () => {
  const { t } = useTranslate();

  return (
    <StyledMessage>
      <FontAwesomeIcon icon={faChartLine} />
      {t("charts.no_data")}
    </StyledMessage>
  );
};
