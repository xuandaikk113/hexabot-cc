/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

import { Input } from "./Input";

export const Textarea = forwardRef<any, TextFieldProps>((props, ref) => (
  <Input ref={ref} multiline minRows="2" {...props} />
));

Textarea.displayName = "Textarea";
