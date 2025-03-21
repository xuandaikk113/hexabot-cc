/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Box } from "@mui/material";
import React from "react";

import { StyledCardHeader } from "@/app-components/card/StyledCardHeader";
import { useCount } from "@/hooks/crud/useCount";
import { useTranslate } from "@/hooks/useTranslate";
import { EntityType } from "@/services/types";
import { NlpSampleType } from "@/types/nlp-sample.types";

const NlpDatasetCounter: React.FC = () => {
  const { t } = useTranslate();
  const train = useCount(EntityType.NLP_SAMPLE, { type: NlpSampleType.train });
  const test = useCount(EntityType.NLP_SAMPLE, { type: NlpSampleType.test });
  const entity = useCount(EntityType.NLP_ENTITY, {});

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledCardHeader
        title={`${t("label.total")}: ${
          train.isLoading
            ? `${t("charts.loading")}...`
            : train.data?.count ?? t("charts.error")
        }`}
        description={`${t("label.training_set")}`}
      />
      <StyledCardHeader
        title={`${t("label.total")}: ${
          test.isLoading
            ? `${t("charts.loading")}...`
            : test.data?.count ?? t("charts.error")
        }`}
        description={`${t("label.test_set")}`}
      />
      <StyledCardHeader
        title={`${t("label.total")}: ${
          entity.isLoading
            ? `${t("charts.loading")}...`
            : entity.data?.count ?? t("charts.error")
        }`}
        description={`${t("label.entities")}`}
      />
    </Box>
  );
};

export default NlpDatasetCounter;
