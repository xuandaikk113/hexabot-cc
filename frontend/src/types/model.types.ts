/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EntityType, Format } from "@/services/types";

import { IBaseSchema, IFormat, OmitPopulate } from "./base.types";
import { IPermission } from "./permission.types";

export type TRelation = "role" | "createdBy";

export interface IModelAttributes {
  name: string;
  identity: string;
  attributes: object;
  relation: TRelation;
}

export interface IModelStub
  extends IBaseSchema,
    OmitPopulate<IModelAttributes, EntityType.MODEL> {}

export interface IModel extends IModelStub, IFormat<Format.BASIC> {
  permissions: string[]; //populated by default
}

export interface IModelFull extends IModelStub, IFormat<Format.FULL> {
  permissions: IPermission[];
}
