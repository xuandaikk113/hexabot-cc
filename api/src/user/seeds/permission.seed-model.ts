/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { PermissionCreateDto } from '../dto/permission.dto';
import { Action } from '../types/action.type';

export const permissionModels = (
  model: string,
  role: string,
): PermissionCreateDto[] => {
  return [
    {
      model,
      action: Action.CREATE,
      role,
    },
    {
      model,
      action: Action.READ,
      role,
    },
    {
      model,
      action: Action.UPDATE,
      role,
    },
    {
      model,
      action: Action.DELETE,
      role,
    },
  ];
};
