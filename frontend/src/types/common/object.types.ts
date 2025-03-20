/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export type TFilterNestedKeysOfType<T, U = string> = T extends object
  ? {
      [K in keyof T]: T[K] extends U
        ? `${K & string}`
        : T[K] extends object
        ? Array<any> extends T[K]
          ? never
          : `${K & string}.${TFilterNestedKeysOfType<T[K], U>}`
        : never;
    }[keyof T]
  : never;
