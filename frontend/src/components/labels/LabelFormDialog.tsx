/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";
import { ILabel } from "@/types/label.types";

import { LabelForm } from "./LabelForm";

export const LabelFormDialog = <T extends ILabel = ILabel>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={LabelForm}
    addText="title.new_label"
    editText="title.edit_label"
    {...props}
  />
);
