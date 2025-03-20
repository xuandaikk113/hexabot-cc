/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EntityType, Format } from "@/services/types";

import { IBaseSchema, IFormat, OmitPopulate } from "./base.types";

export interface IContextVarAttributes {
  name: string;
  label: string;
  permanent: boolean;
}

export interface IContextVarStub
  extends IBaseSchema,
    OmitPopulate<IContextVarAttributes, EntityType.CONTEXT_VAR> {}

export interface IContextVar extends IContextVarStub, IFormat<Format.BASIC> {}

export interface IContextVarFull
  extends IContextVarStub,
    IFormat<Format.FULL> {}
