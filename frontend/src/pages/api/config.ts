/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  apiUrl: string;
  ssoEnabled: boolean;
  maxUploadSize: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  res.status(200).json({
    apiUrl: process.env.NEXT_PUBLIC_API_ORIGIN || "http://localhost:4000",
    ssoEnabled: process.env.NEXT_PUBLIC_SSO_ENABLED === "true" || false,
    maxUploadSize: process.env.UPLOAD_MAX_SIZE_IN_BYTES
      ? Number(process.env.UPLOAD_MAX_SIZE_IN_BYTES)
      : 20 * 1024 * 1024, // 20 MB in bytes
  });
}
