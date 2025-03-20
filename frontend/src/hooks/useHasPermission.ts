/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useCallback, useContext } from "react";

import { PermissionContext } from "@/contexts/permission.context";
import { EntityType } from "@/services/types";
import { PermissionAction } from "@/types/permission.types";

export const useHasPermission = () => {
  const { getAllowedActions } = useContext(PermissionContext);
  const hasPermission = useCallback(
    (type: EntityType, action: PermissionAction) => {
      const allowedActions = getAllowedActions(type);

      return !!allowedActions && allowedActions?.includes(action);
    },
    [getAllowedActions],
  );

  return hasPermission;
};
