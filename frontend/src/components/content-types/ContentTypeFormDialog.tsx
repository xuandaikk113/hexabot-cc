/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";
import { IContentType } from "@/types/content-type.types";

import { ContentTypeForm } from "./ContentTypeForm";

export const ContentTypeFormDialog = <T extends IContentType = IContentType>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={ContentTypeForm}
    addText="title.new_content_type"
    editText="title.edit_content_type"
    {...props}
  />
);
