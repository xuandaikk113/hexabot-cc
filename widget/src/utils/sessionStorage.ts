/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

function setItem<T>(key: string, value: T) {
  if (typeof value === "undefined")
    throw new Error("Value cannot be undefined");
  sessionStorage.setItem(key, JSON.stringify(value));

  return true;
}

function getItem<T>(key: string) {
  const value = sessionStorage.getItem(key);

  if (value === null) return null;

  return JSON.parse(value) as T;
}

export const SessionStorage = { setItem, getItem };
