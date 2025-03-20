/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";
import { IContextVar } from "@/types/context-var.types";

import { ContextVarForm } from "./ContextVarForm";

export const ContextVarFormDialog = <T extends IContextVar = IContextVar>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={ContextVarForm}
    addText="title.new_context_var"
    editText="title.edit_context_var"
    {...props}
  />
);
