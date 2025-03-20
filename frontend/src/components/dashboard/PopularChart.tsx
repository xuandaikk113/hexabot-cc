/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Card, CardContent, Divider } from "@mui/material";
import { ColumnChart, ResponsiveChartContainer } from "eazychart-react";

import { StyledCardHeader } from "@/app-components/card/StyledCardHeader";
import { useFindStats } from "@/hooks/entities/bot-stat-hooks";
import { useTranslate } from "@/hooks/useTranslate";
import { ColumnChartStats } from "@/types/bot-stat.types";
import { buildColumnChartConfig } from "@/utils/chart";

import { NoDataChart } from "./NoDataChart";

const PopularChart = () => {
  const { t } = useTranslate();
  const { data } = useFindStats<ColumnChartStats>("popularBlocks");

  return (
    <Card>
      <StyledCardHeader
        title={t("charts.popular_blocks")}
        description={t("charts.desc.popular_blocks")}
      />
      <Divider />
      <CardContent>
        {data && data.length > 0 ? (
          <ResponsiveChartContainer>
            <ColumnChart
              {...buildColumnChartConfig({
                data,
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

PopularChart.displayName = "PopularChart";

export default PopularChart;
