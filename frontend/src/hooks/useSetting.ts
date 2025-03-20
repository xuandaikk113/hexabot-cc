/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useContext } from "react";

import { SettingsContext } from "@/contexts/setting.context";

export const useSetting = (type: string, label: string) => {
  const { settings } = useContext(SettingsContext);
  const value = settings?.[type]?.find(
    (setting) => setting.label === label,
  )?.value;

  return value;
};
