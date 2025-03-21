/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useCallback } from "react";

import { useTranslations } from "../providers/TranslationProvider";

// Define a recursive interface for nested objects
interface NestedTranslation {
  [key: string]: string | NestedTranslation;
}

const getNestedTranslation = (
  obj: NestedTranslation,
  path: string,
): string | undefined => {
  return path
    .split(".")
    .reduce((acc: NestedTranslation | string | undefined, part) => {
      if (typeof acc === "object" && acc !== null) {
        return acc[part];
      }

      return undefined;
    }, obj) as string | undefined;
};

export const useTranslation = () => {
  const { translations, language } = useTranslations();
  const t = useCallback(
    (key: string, variables: Record<string, string> = {}): string => {
      const translation =
        getNestedTranslation(translations[language], key) || key;

      return translation.replace(
        /{(\w+)}/g,
        (_, v) => variables[v] || `{${v}}`,
      );
    },
    [language, translations],
  );

  return { t };
};
