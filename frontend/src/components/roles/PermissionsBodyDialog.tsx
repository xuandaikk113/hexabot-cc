/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GenericFormDialog } from "@/app-components/dialogs";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";
import { IRole } from "@/types/role.types";

import { PermissionsBody } from "./PermissionsBody";

export const PermissionBodyDialog = <T extends IRole = IRole>(
  props: ComponentFormDialogProps<T>,
) => (
  <GenericFormDialog<T>
    Form={PermissionsBody}
    editText="title.manage_permissions"
    {...props}
  />
);
