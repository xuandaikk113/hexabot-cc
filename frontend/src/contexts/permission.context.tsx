/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { createContext, ReactNode, useCallback, useMemo } from "react";

import { Progress } from "@/app-components/displays/Progress";
import { useUserPermissions } from "@/hooks/entities/auth-hooks";
import { EntityType } from "@/services/types";
import { PermissionAction } from "@/types/permission.types";

export const PermissionContext = createContext<{
  getAllowedActions: (_type: EntityType) => undefined | PermissionAction[];
}>({
  getAllowedActions: (_type: EntityType) => undefined,
});

PermissionContext.displayName = "PermissionContext";

export interface PermissionProviderProps {
  children: ReactNode;
}

export const PermissionProvider = ({
  children,
}: PermissionProviderProps): JSX.Element => {
  const { data, isLoading } = useUserPermissions();
  const permissionMap = useMemo(
    () =>
      data?.permissions.reduce((acc, { model, action }) => {
        if (!(model in acc)) {
          acc[model] = [];
        }

        acc[model]?.push(action);

        return acc;
      }, {} as { [key in EntityType]?: PermissionAction[] }),
    [data?.permissions],
  );
  const getAllowedActions = useCallback(
    (type: EntityType) => {
      return permissionMap && type in permissionMap ? permissionMap[type] : [];
    },
    [permissionMap],
  );

  if (isLoading) return <Progress />;

  return (
    <PermissionContext.Provider
      value={{
        getAllowedActions,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};
