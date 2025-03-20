/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { InputAdornment, TextFieldProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

import { Input } from "./Input";

export const RegexInput = forwardRef(
  (
    {
      onChange,
      value,
      ...props
    }: TextFieldProps & { value: string; onChange: (value: string) => void },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Input
        ref={ref}
        {...props}
        InputProps={{
          startAdornment: <InputAdornment position="start">/</InputAdornment>,
          endAdornment: <InputAdornment position="end">/gi</InputAdornment>,
        }}
        value={value}
        onChange={(e) => {
          onChange(`/${e.target.value}/`);
        }}
      />
    );
  },
);

RegexInput.displayName = "Input";
