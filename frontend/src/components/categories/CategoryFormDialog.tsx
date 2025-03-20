/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ICategory } from "@/types/category.types";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";

import { CategoryForm } from "./CategoryForm";

export const CategoryFormDialog = <T extends ICategory = ICategory>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={CategoryForm}
    addText="title.new_category"
    editText="title.edit_category"
    {...props}
  />
);
