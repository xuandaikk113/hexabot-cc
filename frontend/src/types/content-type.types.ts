/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Format } from "@/services/types";

import { IBaseSchema, IFormat } from "./base.types";

export enum ContentFieldType {
  TEXT = "text",
  URL = "url",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  FILE = "file",
  HTML = "html",
}

export type ContentField = {
  name: string;
  label: string;
  type: ContentFieldType;
};

export interface IContentTypeAttributes {
  name: string;
  fields?: ContentField[];
}

export interface IContentTypeStub extends IBaseSchema {
  name: string;
  fields?: ContentField[];
}

export interface IContentType extends IContentTypeStub, IFormat<Format.BASIC> {}
