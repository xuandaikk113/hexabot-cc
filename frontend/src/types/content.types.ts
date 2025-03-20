/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Format } from "@/services/types";

import { IBaseSchema, IFormat } from "./base.types";
import { IContentType } from "./content-type.types";

export interface IContentAttributes {
  entity: string;
  title: string;
  status: boolean;
  dynamicFields: Record<string, any>;
}

export interface IContentStub extends IBaseSchema {
  title: string;
  status: boolean;
  dynamicFields: Record<string, any>;
}

export interface IContent extends IContentStub, IFormat<Format.BASIC> {
  entity: string;
}

export interface IContentFull extends IContentStub, IFormat<Format.FULL> {
  entity: IContentType;
}
