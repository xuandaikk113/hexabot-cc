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

const ConversationChart = () => {
  const { t, i18n } = useTranslate();
  const { data: conversations } = useFindStats<LineChartStats>("conversation");
  const { data: conversationData, domainKeys: conversationDomains } =
    transformToLine(conversations);

  return (
    <Card>
      <StyledCardHeader
        title={t("charts.conversations")}
        description={t("charts.desc.conversations")}
      />
      <Divider />
      <CardContent>
        {conversationData.length > 0 ? (
          <ResponsiveChartContainer>
            <MultiLineChart
              {...buildMultiLineChartConfig(i18n.language)({
                data: conversationData,
                domainKeys: conversationDomains,
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

ConversationChart.displayName = "ConversationChart";

export default ConversationChart;
