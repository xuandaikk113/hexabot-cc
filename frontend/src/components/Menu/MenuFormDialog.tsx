/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";

import { MenuForm, MenuFormData } from "./MenuForm";

export const MenuFormDialog = <T extends MenuFormData = MenuFormData>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={MenuForm}
    addText="title.add_menu_item"
    editText="title.edit_menu_item"
    {...props}
  />
);
