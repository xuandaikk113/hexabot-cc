/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EntityType, Format } from "@/services/types";

import { IBaseSchema, IFormat, OmitPopulate } from "./base.types";

export type ILanguages = Record<string, string>;

export interface ILanguageAttributes {
  title: string;
  code: string;
  isDefault: boolean;
  isRTL: boolean;
}

export interface ILanguageStub
  extends IBaseSchema,
    OmitPopulate<ILanguageAttributes, EntityType.LANGUAGE> {}

export interface ILanguage extends ILanguageStub, IFormat<Format.BASIC> {}
