/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EntityType } from "@/services/types";

import { PermissionAction } from "../permission.types";
import { IRole } from "../role.types";

export interface IUserPermissions {
  roles: IRole[];
  permissions: Array<{
    action: PermissionAction;
    model: EntityType;
    relation: string;
  }>;
}
