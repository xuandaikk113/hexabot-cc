/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EntityType, Format } from "@/services/types";

import { IBaseSchema, IFormat, OmitPopulate } from "./base.types";
import { IPermission } from "./permission.types";
import { IUser } from "./user.types";

export interface IRoleAttributes {
  name: string;
}

export interface IRoleStub
  extends IBaseSchema,
    OmitPopulate<IRoleAttributes, EntityType.ROLE> {
  name: string;
}

export interface IRole extends IRoleStub, IFormat<Format.BASIC> {}

export interface IRoleFull extends IRoleStub, IFormat<Format.FULL> {
  users: IUser[];
  permissions: IPermission[];
}
