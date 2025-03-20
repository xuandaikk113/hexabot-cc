/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ContentFieldType } from "@/types/content-type.types";

export const FIELDS_FORM_NAME = "fields";
export const READ_ONLY_FIELDS = ["Title", "Status"] as const;
export const FIELDS_FORM_DEFAULT_VALUES = [
  {
    label: "Title",
    name: "title",
    type: ContentFieldType.TEXT,
  },
  {
    label: "Status",
    name: "status",
    type: ContentFieldType.CHECKBOX,
  },
];
