/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Format } from "@/services/types";

import { IBaseSchema, IFormat } from "./base.types";
import { INlpEntity } from "./nlp-entity.types";

export interface INlpValueAttributes {
  entity: string;
  foreign_id?: string;
  value: string;
  expressions?: string[];
  metadata?: Record<string, any>;
  builtin?: boolean;
}

export interface INlpValueStub extends IBaseSchema, INlpValueAttributes {}
export interface INlpValue extends INlpValueStub, IFormat<Format.BASIC> {}

export interface INlpValueFull
  extends Omit<INlpValueStub, "entity">,
    IFormat<Format.FULL> {
  entity: INlpEntity;
}
