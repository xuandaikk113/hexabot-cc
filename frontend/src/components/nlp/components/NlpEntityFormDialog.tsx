/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";
import { INlpEntity } from "@/types/nlp-entity.types";

import { NlpEntityVarForm } from "./NlpEntityForm";

export const NlpEntityFormDialog = <T extends INlpEntity = INlpEntity>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={NlpEntityVarForm}
    addText="title.new_nlp_entity"
    editText="title.edit_nlp_entity"
    {...props}
  />
);
