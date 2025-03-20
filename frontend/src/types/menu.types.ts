/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EntityType, Format } from "@/services/types";

import { IBaseSchema, IFormat, OmitPopulate } from "./base.types";

export enum MenuType {
  web_url = "web_url",
  postback = "postback",
  nested = "nested",
}

export interface IMenuItemAttributes {
  type: MenuType;
  url?: string;
  title: string;
  payload?: string;
  parent?: string;
}

export interface IMenuItemStub
  extends IBaseSchema,
    OmitPopulate<IMenuItemAttributes, EntityType.MENU> {}

export interface IMenuItem extends IMenuItemStub, IFormat<Format.BASIC> {
  parent?: string;
}

export interface IMenuItemFull extends IMenuItemStub, IFormat<Format.FULL> {
  parent?: IMenuItem[];
}
