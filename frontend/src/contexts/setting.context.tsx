/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { createContext, ReactNode } from "react";

import { Progress } from "@/app-components/displays/Progress";
import { useLoadSettings } from "@/hooks/entities/auth-hooks";
import { useRemoteI18n } from "@/hooks/useRemoteI18n";
import { ISetting } from "@/types/setting.types";

export const SettingsContext = createContext<{
  settings: { [key: string]: ISetting[] } | undefined;
}>({ settings: undefined });

SettingsContext.displayName = "SettingsContext";

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({
  children,
}: SettingsProviderProps): JSX.Element => {
  const { data, isLoading } = useLoadSettings();

  // Load API i18n Translations (extensions, ...)
  useRemoteI18n();

  if (isLoading) return <Progress />;

  return (
    <SettingsContext.Provider
      value={{
        settings: data,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
