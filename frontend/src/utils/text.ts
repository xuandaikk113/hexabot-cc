/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export const truncate = (text: string, length = 300) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
