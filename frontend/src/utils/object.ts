/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

function isObject(item: any): item is Record<string, any> {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function merge<
  T extends Record<string, any>,
  U extends Record<string, any>,
>(target: T, source: U): T & U {
  const output: Record<string, any> = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (Array.isArray(source[key])) {
        if (Array.isArray(target[key])) {
          // Merge arrays uniquely
          output[key] = Array.from(new Set([...target[key], ...source[key]]));
        } else {
          output[key] = source[key];
        }
      } else if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = merge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }

  return output as T & U;
}
