/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Grid, Typography } from "@mui/material";

import { ChipEntity } from "@/app-components/displays/ChipEntity";
import { EntityType } from "@/services/types";

import { useChat } from "../hooks/ChatContext";

export const ChatHeader = () => {
  const { subscriber } = useChat();

  return (
    <Grid container gap="7px" direction="row">
      <Grid>
        <Typography fontSize="1.17em" fontWeight={700}>
          {subscriber?.first_name} {subscriber?.last_name} :
        </Typography>
      </Grid>
      <Grid gap="4px" container width="fit-content">
        {subscriber
          ? subscriber?.labels?.map((label) => (
              <ChipEntity
                id={label}
                key={label}
                variant="role"
                field="title"
                entity={EntityType.LABEL}
              />
            ))
          : null}
      </Grid>
    </Grid>
  );
};
