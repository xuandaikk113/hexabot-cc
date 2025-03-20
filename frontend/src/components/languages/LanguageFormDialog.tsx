/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";
import { ILanguage } from "@/types/language.types";

import { LanguageForm } from "./LanguageForm";

export const LanguageFormDialog = <T extends ILanguage = ILanguage>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={LanguageForm}
    addText="title.new_language"
    editText="title.edit_language"
    {...props}
  />
);
