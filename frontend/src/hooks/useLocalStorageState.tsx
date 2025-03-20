/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useEffect, useState } from "react";

export const useLocalStorageState = (key: string) => {
  const [value, setValue] = useState<string | null>("");

  if (typeof window !== "undefined") {
    // Client-side-only code
  }

  useEffect(() => {
    setValue(localStorage.getItem(key));
  }, []);

  const persist = (newValue: string) => {
    if (newValue !== value) {
      setValue(newValue);

      return localStorage.setItem(key, newValue);
    }

    return value;
  };
  const remove = () => {
    return localStorage.removeItem(key);
  };

  return { value, persist, remove };
};
