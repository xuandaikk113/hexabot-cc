/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";
import { INlpDatasetSample } from "@/types/nlp-sample.types";

import { NlpSampleForm } from "./NlpSampleForm";

export const NlpSampleFormDialog = <
  T extends INlpDatasetSample = INlpDatasetSample,
>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={NlpSampleForm}
    editText="title.edit_nlp_sample"
    {...props}
  />
);
