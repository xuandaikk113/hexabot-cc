/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import SearchIcon from "@mui/icons-material/Search";
import { TextFieldProps } from "@mui/material";

import { useTranslate } from "@/hooks/useTranslate";

import { Adornment } from "./Adornment";
import { Input } from "./Input";

export const FilterTextfield = (props: TextFieldProps) => {
  const { t } = useTranslate();

  //TODO: replace the native delete text button by a styled custom button
  return (
    <Input
      type="search"
      InputProps={{
        startAdornment: <Adornment Icon={SearchIcon} />,
      }}
      placeholder={t("placeholder.keywords")}
      {...props}
    />
  );
};
