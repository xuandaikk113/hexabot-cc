/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Format } from "@/services/types";

import { IBaseSchema, IFormat } from "./base.types";

export interface IInvitationAttributes {
  email: string;
  roles: string[];
}

export interface IInvitationStub extends IBaseSchema, IInvitationAttributes {
  token: string;
}

export interface IInvitation extends IInvitationStub, IFormat<Format.BASIC> {}
