/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Config } from "../types/config.types";

export const DEFAULT_CONFIG: Config = {
  apiUrl: process.env.REACT_APP_WIDGET_API_URL || "http://localhost:4000",
  channel: process.env.REACT_APP_WIDGET_CHANNEL || "console-channel",
  language: "en",
  maxUploadSize: process.env.UPLOAD_MAX_SIZE_IN_BYTES
    ? Number(process.env.UPLOAD_MAX_SIZE_IN_BYTES)
    : 20 * 1024 * 1024, // 20 MB in bytes
};
