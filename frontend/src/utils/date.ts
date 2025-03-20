/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { DATE_TIME_FORMAT } from "../constants";

export const getDateTimeFormatter = (date: Date) => ({
  date,
  formatParams: {
    val: DATE_TIME_FORMAT,
  },
});
