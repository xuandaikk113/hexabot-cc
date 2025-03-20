/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EntityType, Format } from "@/services/types";

import { IBaseSchema, IFormat, OmitPopulate } from "./base.types";
import { IUser } from "./user.types";

export interface ILabelAttributes {
  title: string;
  name: string;
  description: string;
  builtin?: boolean;
}

export interface ILabelStub
  extends IBaseSchema,
    OmitPopulate<ILabelAttributes, EntityType.LABEL> {
  subscriber_count: number;
}

export interface ILabel extends ILabelStub, IFormat<Format.BASIC> {}

export interface ILabelFull extends ILabelStub, IFormat<Format.FULL> {
  users: IUser[];
}
