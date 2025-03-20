/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";

import { ContentForm, ContentFormData } from "./ContentForm";

export const ContentFormDialog = <T extends ContentFormData = ContentFormData>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={ContentForm}
    rowKey="content"
    addText="title.new_content"
    editText="title.edit_node"
    {...props}
  />
);
