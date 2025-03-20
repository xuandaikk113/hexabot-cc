/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { TextField, TextFieldProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

export const Input = forwardRef(
  (props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) => (
    <TextField
      ref={ref}
      type="text"
      size="small"
      fullWidth
      inputProps={{
        ...(props.required && { required: false }),
        ...props.inputProps,
      }}
      {...props}
    />
  ),
);

Input.displayName = "Input";
