/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { TOptionsBase } from "i18next";

/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { TFilterNestedKeysOfType } from "@/types/common/object.types";

export type TTranslation = string;

export type TTranslationPrefix =
  | "message"
  | "menu"
  | "title"
  | "label"
  | "placeholder"
  | "button"
  | "input"
  | "link"
  | "help"
  | "charts"
  | "datetime"
  | "visual_editor";

export type TTranslationKeys =
  | `${TTranslationPrefix}`
  | `${TTranslationPrefix}.${TTranslation}`;

export type TNestedTranslation<T extends keyof TTranslation> =
  TFilterNestedKeysOfType<TTranslation[T]>;

export type TOptionsBaseExtended = TOptionsBase & { 0?: string };

export type TTranslateProps = {
  <K extends TTranslationKeys>(
    prop1: K,
    prop2?: TOptionsBaseExtended & object,
  ): string;
  <K extends keyof TTranslation, N = TNestedTranslation<K>>(
    prop1: K,
    prop2: N & TNestedTranslation<K>,
    prop3?: TOptionsBase & object,
  ): string;
};
