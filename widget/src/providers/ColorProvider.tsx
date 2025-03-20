/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import React, { createContext, ReactNode, useContext } from "react";

import colors from "../constants/colors";
import { ColorState } from "../types/colors.types";

import { useSettings } from "./SettingsProvider";

const initialState: ColorState = colors["orange"];
const ColorContext = createContext<{
  colors: ColorState;
}>({
  colors: initialState,
});

export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const settings = useSettings();

  return (
    <ColorContext.Provider value={{ colors: colors[settings.color] }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => {
  const context = useContext(ColorContext);

  if (!context) {
    throw new Error("useColors must be used within a ColorProvider");
  }

  return context;
};
