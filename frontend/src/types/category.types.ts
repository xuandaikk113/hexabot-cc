/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Format } from "@/services/types";

import { IBaseSchema, IFormat } from "./base.types";

export interface ICategoryAttributes {
  label: string;
  zoom?: number;
  offset?: [number, number];
}

export interface ICategoryStub extends IBaseSchema, ICategoryAttributes {
  label: string;
}

export interface ICategory extends ICategoryStub, IFormat<Format.BASIC> {}
