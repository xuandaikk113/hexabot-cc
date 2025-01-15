/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 */


import { EntityType, Format } from "@/services/types";

import { IBaseSchema, IFormat, OmitPopulate } from "./base.types";
import { ISubscriber } from "./subscriber.types";
import { IUser } from "./user.types";

/**
 * Defines the types of owners for an attachment,
 * indicating whether the file belongs to a User or a Subscriber.
 */
export enum AttachmentCreatedByRef {
  User = "User",
  Subscriber = "Subscriber",
}

export type TAttachmentCreatedByRef = `${AttachmentCreatedByRef}`;

/**
 * Defines the various contexts in which an attachment can exist.
 * These contexts influence how the attachment is uploaded, stored, and accessed:
 */
export enum AttachmentContext {
  SettingAttachment = "setting_attachment", // Attachments related to app settings, restricted to users with specific permissions.
  UserAvatar = "user_avatar", // Avatar files for users, only the current user can upload, accessible to those with appropriate permissions.
  SubscriberAvatar = "subscriber_avatar", // Avatar files for subscribers, uploaded programmatically, accessible to authorized users.
  BlockAttachment = "block_attachment", // Files sent by the bot, public or private based on the channel and user authentication.
  ContentAttachment = "content_attachment", // Files in the knowledge base, usually public but could vary based on specific needs.
  MessageAttachment = "message_attachment", // Files sent or received via messages, uploaded programmatically, accessible to users with inbox permissions.;
}

export type TAttachmentContext = `${AttachmentContext}`;

export interface IAttachmentAttributes {
  name: string;
  type: string;
  size: number;
  location: string;
  url: string;
  channel?: Record<string, any>;
  context: TAttachmentContext;
  createdByRef: TAttachmentCreatedByRef;
  createdBy: string | null;
}

export interface IAttachmentStub
  extends IBaseSchema,
    OmitPopulate<IAttachmentAttributes, EntityType.ATTACHMENT> {}

export interface IAttachment extends IAttachmentStub, IFormat<Format.BASIC> {
  createdBy: string | null;
}

export interface ISubscriberAttachmentFull
  extends IAttachmentStub,
    IFormat<Format.FULL> {
  createdBy: (ISubscriber | IUser)[];
}
