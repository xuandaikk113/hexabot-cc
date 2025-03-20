/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import CloseIcon from "@mui/icons-material/Close";
import {
    IconButton,
    DialogTitle as MuiDialogTitle,
    Typography,
    styled,
} from "@mui/material";

const StyledDialogTitle = styled(Typography)(() => ({
  fontSize: "18px",
  lineHeight: "1",
}));

export const DialogTitle = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => (
  <MuiDialogTitle>
    <StyledDialogTitle>{children}</StyledDialogTitle>
    {onClose ? (
      <IconButton size="small" aria-label="close" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    ) : null}
  </MuiDialogTitle>
);
