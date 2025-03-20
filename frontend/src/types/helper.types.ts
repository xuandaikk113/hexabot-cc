/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { IBaseSchema } from "./base.types";

export interface IHelperAttributes {
  name: string;
}

// @TODO: not all entities extend from IBaseSchema
export interface IHelper extends IHelperAttributes, IBaseSchema {}
