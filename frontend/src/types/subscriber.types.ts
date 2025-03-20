/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EntityType, Format } from "@/services/types";

import { IBaseSchema, IFormat, OmitPopulate } from "./base.types";
import { ILabel } from "./label.types";
import { IUser } from "./user.types";

interface BaseChannelData {
  name: string;
  isSocket?: boolean;
}

type ChannelData = BaseChannelData & Record<string, any>;

export interface ISubscriberAttributes {
  first_name: string;
  last_name: string;
  locale: string;
  gender: string;
  labels: string[];
  assignedTo?: string | null;
  assignedAt?: Date | null;
  lastvisit?: Date;
  retainedFrom?: Date;
  channel: ChannelData;
  timezone?: number;
  language: string;
  country?: string;
  foreign_id?: string;
}

export interface ISubscriberStub
  extends IBaseSchema,
    OmitPopulate<ISubscriberAttributes, EntityType.SUBSCRIBER> {}

export interface ISubscriber extends ISubscriberStub, IFormat<Format.BASIC> {
  labels: string[];
  assignedTo: string | null;
}

export interface ISubscriberFull extends ISubscriberStub, IFormat<Format.FULL> {
  labels: ILabel[];
  assignedTo?: IUser;
}
