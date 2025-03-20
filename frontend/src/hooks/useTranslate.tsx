/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useTranslation } from "react-i18next";

import {
    TOptionsBaseExtended,
    TTranslateProps,
    TTranslationKeys,
} from "@/i18n/i18n.types";

export const useTranslate = (ns?: string) => {
  const { t, i18n } = useTranslation(ns);
  const translate: TTranslateProps = (
    prop1: unknown,
    prop2?: unknown,
    prop3?: unknown,
  ): string => {
    // full key. For example: prop1 = label.buttons
    if (typeof prop1 === "string" && prop1.includes(".")) {
      const key = prop1 as TTranslationKeys;
      const options = (prop2 || {}) as TOptionsBaseExtended;

      return t(key, { defaultValue: "", ...options });
    }

    // key with nested key. For example: prop1=label prop2=buttons
    const options = (prop3 || {}) as TOptionsBaseExtended;

    return t([prop1, prop2].join(".") as TTranslationKeys, {
      defaultValue: "",
      ...options,
    });
  };

  return {
    t: translate,
    i18n,
  };
};
