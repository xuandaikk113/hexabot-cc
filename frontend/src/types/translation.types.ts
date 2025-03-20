/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EntityType, Format } from "@/services/types";

import { IBaseSchema, IFormat, OmitPopulate } from "./base.types";

export type ITranslations = Record<string, string>;

export interface ITranslationAttributes {
  str: string;
  translations: ITranslations;
  translated: number;
}

export interface ITranslationStub
  extends IBaseSchema,
    OmitPopulate<ITranslationAttributes, EntityType.TRANSLATION> {}

export interface ITranslation extends ITranslationStub, IFormat<Format.BASIC> {}
