/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";

import {
    AttachmentViewerForm,
    AttachmentViewerFormData,
} from "./AttachmentViewerForm";

export const AttachmentViewerFormDialog = <
  T extends AttachmentViewerFormData = AttachmentViewerFormData,
>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={AttachmentViewerForm}
    rowKey="row"
    addText="label.image"
    {...props}
  />
);
