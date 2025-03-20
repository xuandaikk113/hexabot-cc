/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Stack, Typography } from "@mui/material";
import { FC, SVGProps } from "react";

export const FormSectionTitle = ({
  title,
  Icon: Icon,
}: {
  title: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}) => {
  return (
    <Stack direction="row" alignItems="center" gap={1} mb={1}>
      <Icon width="24px" height="24px" />
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
    </Stack>
  );
};
