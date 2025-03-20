/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { MoveUp } from "@mui/icons-material";

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";

import { BlockMoveForm, BlockMoveFormData } from "./BlockMoveForm";

export const BlockMoveFormDialog = <
  T extends BlockMoveFormData = BlockMoveFormData,
>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={BlockMoveForm}
    rowKey="row"
    addText="message.select_category"
    confirmButtonProps={{ value: "button.move", startIcon: <MoveUp /> }}
    {...props}
  />
);
