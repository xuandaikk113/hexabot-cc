/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";
import { ISubscriber } from "@/types/subscriber.types";

import { SubscriberForm } from "./SubscriberForm";

export const SubscriberFormDialog = <T extends ISubscriber = ISubscriber>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={SubscriberForm}
    editText="title.manage_subscribers"
    {...props}
  />
);
