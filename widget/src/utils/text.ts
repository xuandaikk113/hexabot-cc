/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export const truncate = (s: string, length = 100) => {
  return s.length > length ? s.substr(0, length) + "..." : s;
};

export const linebreak = (s: string) => {
  return s.replace(/\n/g, "<br />");
};

export const processContent = (s: string) => {
  let result = truncate(s, 50);

  result = linebreak(s);

  return result;
};
