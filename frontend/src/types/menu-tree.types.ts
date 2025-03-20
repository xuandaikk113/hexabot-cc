/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Format } from "@/services/types";

import { IBaseSchema, IFormat } from "./base.types";

export enum MenuType {
  web_url = "web_url",
  postback = "postback",
  nested = "nested",
}

export interface IMenuNodeAttributes {
  type: MenuType;
  url?: string;
  title: string;
  payload?: string;
  parent?: string;
}

export interface IMenuNodeStub extends IBaseSchema, IMenuNodeAttributes {}

export interface IMenuNode extends IMenuNodeStub, IFormat<Format.BASIC> {
  call_to_actions?: string[];
}

export interface IMenuNodeFull extends IMenuNodeStub, IFormat<Format.BASIC> {
  call_to_actions?: IMenuNode[];
}
