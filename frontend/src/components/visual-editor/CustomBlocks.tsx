/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Grid } from "@mui/material";

import PluginIcon from "@/app-components/svg/toolbar/PluginIcon";
import { useFind } from "@/hooks/crud/useFind";
import { useTranslate } from "@/hooks/useTranslate";
import { EntityType } from "@/services/types";

import { Block, StyledTitle } from "./Aside";

export const CustomBlocks = () => {
  const { t } = useTranslate();
  const { data: customBlocks } = useFind(
    { entity: EntityType.CUSTOM_BLOCK },
    { hasCount: false },
  );

  return customBlocks?.length ? (
    <>
      <Grid mb="2">
        <StyledTitle>{t("title.custom_blocks")}</StyledTitle>
      </Grid>
      <Grid container>
        {customBlocks?.map((customBlock) => (
          <Block
            key={customBlock.id}
            title={t(`title.${customBlock.namespace}`, {
              ns: customBlock.namespace,
            })}
            Icon={PluginIcon}
            blockTemplate={customBlock.template}
            name={customBlock.template.name}
          />
        ))}
      </Grid>
    </>
  ) : null;
};
