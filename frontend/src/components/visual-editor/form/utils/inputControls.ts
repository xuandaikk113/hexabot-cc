/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import {
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";

export const getInputControls =
  <T extends FieldValues = FieldValues>(
    field: string,
    errors: FieldErrors<T>,
    register: UseFormRegister<T>,
    requiredMessage?: string,
  ) =>
  (index: number) => ({
    ...register(
      `${field}.${index}` as Path<T>,
      requiredMessage
        ? {
            required: requiredMessage,
          }
        : {},
    ),
    error: !!errors?.[field]?.[index],
    helperText: errors?.[field]?.[index]?.message,
  });
