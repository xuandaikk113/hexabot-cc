/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import SendIcon from "@mui/icons-material/Send";

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";

import { InviteUserForm } from "./InviteUserForm";

export const InviteUserFormFormDialog = <T extends undefined = undefined>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={InviteUserForm}
    addText="title.invite_new_user"
    confirmButtonProps={{ startIcon: <SendIcon /> }}
    {...props}
  />
);
