/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

import { useTranslate } from "@/hooks/useTranslate";

interface DialogButtonsProps {
  closeDialog?: () => void;
  handleSubmit?: () => void;
}

const DialogButtons: React.FC<DialogButtonsProps> = ({
  closeDialog,
  handleSubmit,
}) => {
  const { t } = useTranslate();

  return (
    <>
      <Button
        startIcon={<CheckIcon />}
        variant="contained"
        type="submit"
        onClick={handleSubmit}
      >
        {t("button.submit")}
      </Button>
      <Button
        startIcon={<CloseIcon />}
        variant="outlined"
        color="error"
        onClick={closeDialog}
      >
        {t("button.cancel")}
      </Button>
    </>
  );
};

export default DialogButtons;
