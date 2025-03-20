/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Grid } from "@mui/material";

import { useTranslate } from "@/hooks/useTranslate";
import { TTranslationKeys } from "@/i18n/i18n.types";
import { FormButtonsProps } from "@/types/common/dialogs.types";

export const DialogFormButtons = ({
  onSubmit,
  onCancel,
  cancelButtonProps,
  confirmButtonProps,
}: FormButtonsProps) => {
  const { t } = useTranslate();
  const cancelButtonTitle = (cancelButtonProps?.value ||
    "button.cancel") as TTranslationKeys;
  const confirmButtonTitle = (confirmButtonProps?.value ||
    "button.submit") as TTranslationKeys;

  return (
    <Grid
      p="0.3rem 1rem"
      width="100%"
      display="flex"
      justifyContent="space-between"
    >
      <Button
        color="error"
        variant="outlined"
        onClick={onCancel}
        startIcon={<CloseIcon />}
        {...cancelButtonProps}
      >
        {t(cancelButtonTitle)}
      </Button>
      <Button
        variant="contained"
        onClick={onSubmit}
        startIcon={<CheckIcon />}
        {...confirmButtonProps}
      >
        {t(confirmButtonTitle)}
      </Button>
    </Grid>
  );
};
