/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";

import { EditUserForm, EditUserFormData } from "./EditUserForm";

export const CategoryFormDialog = <
  T extends EditUserFormData = EditUserFormData,
>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={EditUserForm}
    editText="title.manage_roles"
    {...props}
  />
);
