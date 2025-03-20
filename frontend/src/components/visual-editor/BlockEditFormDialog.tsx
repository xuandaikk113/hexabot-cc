/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { IBlock } from "@/types/block.types";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";

import { BlockEditForm } from "./BlockEditForm";

export const BlockEditFormDialog = <
  T extends IBlock | undefined = IBlock | undefined,
>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={BlockEditForm}
    editText="title.edit_block"
    {...props}
  />
);
