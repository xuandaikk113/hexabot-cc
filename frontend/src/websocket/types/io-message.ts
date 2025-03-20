/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export interface IOIncomingMessage<T = any> {
  statusCode: number;
  body: T;
  headers: Record<string, string>;
}

export interface IOOutgoingMessage<T = any> {
  method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
  headers: Record<string, string>;
  data: T;
  // params: Record<string, any>;
  url: string;
}
