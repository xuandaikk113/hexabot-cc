/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Card, CardContent, Divider } from "@mui/material";
import { MultiLineChart, ResponsiveChartContainer } from "eazychart-react";

import { StyledCardHeader } from "@/app-components/card/StyledCardHeader";
import { useFindStats } from "@/hooks/entities/bot-stat-hooks";
import { useTranslate } from "@/hooks/useTranslate";
import { LineChartStats } from "@/types/bot-stat.types";
import { buildMultiLineChartConfig, transformToLine } from "@/utils/chart";

import { NoDataChart } from "./NoDataChart";

const AudienceChart = () => {
  const { t, i18n } = useTranslate();
  const { data: stats } = useFindStats<LineChartStats>("audiance");
  const { data, domainKeys } = transformToLine(stats);

  return (
    <Card>
      <StyledCardHeader
        title={t("charts.audience")}
        description={t("charts.desc.audience")}
      />
      <Divider />
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveChartContainer>
            <MultiLineChart
              {...buildMultiLineChartConfig(i18n.language)({
                data,
                domainKeys,
              })}
            />
          </ResponsiveChartContainer>
        ) : (
          <NoDataChart />
        )}
      </CardContent>
    </Card>
  );
};

AudienceChart.displayName = "AudienceChart";

export default AudienceChart;
