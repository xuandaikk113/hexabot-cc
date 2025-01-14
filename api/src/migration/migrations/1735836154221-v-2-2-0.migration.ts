/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 */

import { existsSync } from 'fs';
import { join, resolve } from 'path';

import mongoose, { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import attachmentSchema, {
  Attachment,
} from '@/attachment/schemas/attachment.schema';
import blockSchema, { Block } from '@/chat/schemas/block.schema';
import messageSchema, { Message } from '@/chat/schemas/message.schema';
import subscriberSchema, { Subscriber } from '@/chat/schemas/subscriber.schema';
import { StdOutgoingAttachmentMessage } from '@/chat/schemas/types/message';
import contentSchema, { Content } from '@/cms/schemas/content.schema';
import { config } from '@/config';
import userSchema, { User } from '@/user/schemas/user.schema';
import { moveFile, moveFiles } from '@/utils/helpers/fs';

import { MigrationAction, MigrationServices } from '../types';

/**
 * Updates subscriber documents with their corresponding avatar attachments
 * and moves avatar files to a new directory.
 *
 * @returns Resolves when the migration process is complete.
 */
const populateSubscriberAvatar = async ({ logger }: MigrationServices) => {
  const AttachmentModel = mongoose.model<Attachment>(
    Attachment.name,
    attachmentSchema,
  );
  const SubscriberModel = mongoose.model<Subscriber>(
    Subscriber.name,
    subscriberSchema,
  );

  const cursor = SubscriberModel.find().cursor();

  for await (const subscriber of cursor) {
    const foreignId = subscriber.foreign_id;
    if (!foreignId) {
      logger.debug(`No foreign id found for subscriber ${subscriber._id}`);
      continue;
    }

    const attachment = await AttachmentModel.findOne({
      name: RegExp(`^${foreignId}.jpe?g$`),
    });

    if (attachment) {
      await SubscriberModel.updateOne(
        { _id: subscriber._id },
        { $set: { avatar: attachment._id } },
      );
      logger.log(
        `Subscriber ${subscriber._id} avatar attachment successfully updated for  `,
      );

      const src = resolve(
        join(config.parameters.uploadDir, attachment.location),
      );
      if (existsSync(src)) {
        try {
          const dst = resolve(
            join(config.parameters.avatarDir, attachment.location),
          );
          await moveFile(src, dst);
          logger.log(
            `Subscriber ${subscriber._id} avatar file successfully moved to the new "avatars" folder`,
          );
        } catch (err) {
          logger.error(err);
          logger.warn(`Unable to move subscriber ${subscriber._id} avatar!`);
        }
      } else {
        logger.warn(
          `Subscriber ${subscriber._id} avatar attachment file was not found!`,
        );
      }
    } else {
      logger.warn(
        `No avatar attachment found for subscriber ${subscriber._id}`,
      );
    }
  }
};

/**
 * Reverts what the previous function does
 *
 * @returns Resolves when the migration process is complete.
 */
const unpopulateSubscriberAvatar = async ({ logger }: MigrationServices) => {
  const AttachmentModel = mongoose.model<Attachment>(
    Attachment.name,
    attachmentSchema,
  );
  const SubscriberModel = mongoose.model<Subscriber>(
    Subscriber.name,
    subscriberSchema,
  );

  // Rollback logic: unset the "avatar" field in all subscriber documents
  const cursor = SubscriberModel.find({ avatar: { $exists: true } }).cursor();

  for await (const subscriber of cursor) {
    if (subscriber.avatar) {
      const attachment = await AttachmentModel.findOne({
        _id: subscriber.avatar,
      });

      if (attachment) {
        // Move file to the old folder
        const src = resolve(
          join(config.parameters.avatarDir, attachment.location),
        );
        if (existsSync(src)) {
          try {
            const dst = resolve(
              join(config.parameters.uploadDir, attachment.location),
            );
            await moveFile(src, dst);
            logger.log(
              `Avatar attachment successfully moved back to the old "avatars" folder`,
            );
          } catch (err) {
            logger.error(err);
            logger.warn(
              `Unable to move back subscriber ${subscriber._id} avatar to the old folder!`,
            );
          }
        } else {
          logger.warn('Avatar attachment file was not found!');
        }

        // Reset avatar to null
        await SubscriberModel.updateOne(
          { _id: subscriber._id },
          { $set: { avatar: null } },
        );
        logger.log(
          `Avatar attachment successfully updated for subscriber ${subscriber._id}`,
        );
      } else {
        logger.warn(
          `No avatar attachment found for subscriber ${subscriber._id}`,
        );
      }
    }
  }
};

/**
 * Migrates and updates the paths of old folder "avatars" files for subscribers and users.
 *
 * @returns Resolves when the migration process is complete.
 */
const updateOldAvatarsPath = async ({ logger }: MigrationServices) => {
  // Make sure the old folder is moved
  const oldPath = join(process.cwd(), process.env.AVATAR_DIR || '/avatars');
  if (existsSync(oldPath)) {
    logger.verbose(
      `Moving subscriber avatar files from ${oldPath} to ${config.parameters.avatarDir} ...`,
    );
    try {
      await moveFiles(oldPath, config.parameters.avatarDir);
      logger.log('Avatars folder successfully moved to its new location ...');
    } catch (err) {
      logger.error(err);
      logger.error('Unable to move files from the old "avatars" folder');
    }
  } else {
    logger.log(`No old avatars folder found: ${oldPath}`);
  }

  // Move users avatars to the "uploads/avatars" folder
  const AttachmentModel = mongoose.model<Attachment>(
    Attachment.name,
    attachmentSchema,
  );
  const UserModel = mongoose.model<User>(User.name, userSchema);

  const cursor = UserModel.find().cursor();

  for await (const user of cursor) {
    try {
      if (user.avatar) {
        const avatar = await AttachmentModel.findOne({ _id: user.avatar });
        if (avatar) {
          const src = resolve(
            join(config.parameters.uploadDir, avatar.location),
          );
          const dst = resolve(
            join(config.parameters.avatarDir, avatar.location),
          );
          logger.verbose(`Moving user avatar file from ${src} to ${dst} ...`);
          await moveFile(src, dst);
        }
      }
    } catch (err) {
      logger.error(err);
      logger.error('Unable to move user avatar to the new folder');
    }
  }
};

/**
 * Reverts what the previous function does
 *
 * @returns Resolves when the migration process is complete.
 */
const restoreOldAvatarsPath = async ({ logger }: MigrationServices) => {
  // Move users avatars to the "/app/avatars" folder
  const AttachmentModel = mongoose.model<Attachment>(
    Attachment.name,
    attachmentSchema,
  );
  const UserModel = mongoose.model<User>(User.name, userSchema);

  const cursor = UserModel.find().cursor();

  for await (const user of cursor) {
    try {
      if (user.avatar) {
        const avatar = await AttachmentModel.findOne({ _id: user.avatar });
        if (avatar) {
          const src = resolve(
            join(config.parameters.avatarDir, avatar.location),
          );
          const dst = resolve(
            join(config.parameters.uploadDir, avatar.location),
          );
          logger.verbose(`Moving user avatar file from ${src} to ${dst} ...`);
          await moveFile(src, dst);
        }
      }
    } catch (err) {
      logger.error(err);
      logger.error('Unable to move user avatar to the new folder');
    }
  }

  //
  const oldPath = resolve(
    join(process.cwd(), process.env.AVATAR_DIR || '/avatars'),
  );
  if (existsSync(config.parameters.avatarDir)) {
    try {
      await moveFiles(config.parameters.avatarDir, oldPath);
      logger.log('Avatars folder successfully moved to the old location ...');
    } catch (err) {
      logger.error(err);
      logger.log('Unable to move avatar files to the old folder ...');
    }
  } else {
    logger.log('No avatars folder found ...');
  }
};

/**
 * Handles updates on block documents for blocks that contain "message.attachment".
 *
 * @param updateField - Field to set during the update operation.
 * @param unsetField - Field to unset during the update operation.
 * @param logger - Logger service for logging messages.
 */
const migrateAttachmentBlocks = async (
  action: MigrationAction,
  { logger }: MigrationServices,
) => {
  const updateField = action === MigrationAction.UP ? 'id' : 'attachment_id';
  const unsetField = action === MigrationAction.UP ? 'attachment_id' : 'id';
  const BlockModel = mongoose.model<Block>(Block.name, blockSchema);

  const cursor = BlockModel.find({
    'message.attachment': { $exists: true },
  }).cursor();

  for await (const block of cursor) {
    try {
      const blockMessage = block.message as StdOutgoingAttachmentMessage;
      const fieldValue =
        blockMessage.attachment?.payload &&
        unsetField in blockMessage.attachment?.payload
          ? blockMessage.attachment?.payload[unsetField]
          : null;

      await BlockModel.updateOne(
        { _id: block._id },
        {
          $set: {
            [`message.attachment.payload.${updateField}`]: fieldValue,
          },
          $unset: {
            [`message.attachment.payload.${unsetField}`]: '',
          },
        },
      );
    } catch (error) {
      logger.error(`Failed to process block ${block._id}: ${error.message}`);
    }
  }
};

/**
 * Generates a function that renames a given attribute
 * @param source Source name
 * @param target Target name
 * @returns Function to perform the renaming
 */
const buildRenameAttributeCallback =
  <A extends string, D extends Record<A, string>>(source: A, target: A) =>
  (obj: D) => {
    obj[target] = obj[source];
    delete obj[source];
    return obj;
  };

/**
 * Traverses an content document to search for any attachment object
 * @param obj
 * @param callback
 * @returns
 */
const updateAttachmentPayload = (
  obj: HydratedDocument<Content>['dynamicFields'],
  callback: ReturnType<typeof buildRenameAttributeCallback>,
) => {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object' && 'payload' in obj[key]) {
        obj[key].payload = callback(obj[key].payload);
      }
    }
  }
  return obj;
};

/**
 * Updates content documents for blocks that contain attachment "*.payload":
 * - Rename 'attachment_id' to 'id'
 *
 * @returns Resolves when the migration process is complete.
 */
const migrateAttachmentContents = async (
  action: MigrationAction,
  { logger }: MigrationServices,
) => {
  const updateField = action === MigrationAction.UP ? 'id' : 'attachment_id';
  const unsetField = action === MigrationAction.UP ? 'attachment_id' : 'id';
  const ContentModel = mongoose.model<Content>(Content.name, contentSchema);
  // Find blocks where "message.attachment" exists
  const cursor = ContentModel.find({}).cursor();

  for await (const content of cursor) {
    try {
      content.dynamicFields = updateAttachmentPayload(
        content.dynamicFields,
        buildRenameAttributeCallback(unsetField, updateField),
      );

      await ContentModel.replaceOne({ _id: content._id }, content);
    } catch (error) {
      logger.error(`Failed to update content ${content._id}: ${error.message}`);
    }
  }
};

/**
 * Updates message documents that contain attachment "message.attachment"
 * to apply one of the following operation:
 * - Rename 'attachment_id' to 'id'
 * - Parse internal url for to get the  'id'
 * - Fetch external url, stores the attachment and store the 'id'
 *
 * @returns Resolves when the migration process is complete.
 */
const migrateAttachmentMessages = async ({
  logger,
  http,
  attachmentService,
}: MigrationServices) => {
  const MessageModel = mongoose.model<Message>(Message.name, messageSchema);

  // Find blocks where "message.attachment" exists
  const cursor = MessageModel.find({
    'message.attachment.payload': { $exists: true },
    'message.attachment.payload.id': { $exists: false },
  }).cursor();

  // Helper function to update the attachment ID in the database
  const updateAttachmentId = async (
    messageId: mongoose.Types.ObjectId,
    attachmentId: string | null,
  ) => {
    await MessageModel.updateOne(
      { _id: messageId },
      { $set: { 'message.attachment.payload.id': attachmentId } },
    );
  };

  for await (const msg of cursor) {
    try {
      if (
        'attachment' in msg.message &&
        'payload' in msg.message.attachment &&
        msg.message.attachment.payload
      ) {
        if ('attachment_id' in msg.message.attachment.payload) {
          await updateAttachmentId(
            msg._id,
            msg.message.attachment.payload.attachment_id as string,
          );
        } else if ('url' in msg.message.attachment.payload) {
          const url = msg.message.attachment.payload.url;
          const regex =
            /^https?:\/\/[\w.-]+\/attachment\/download\/([a-f\d]{24})\/.+$/;
          // Test the URL and extract the ID
          const match = url.match(regex);
          if (match) {
            const [, attachmentId] = match;
            await updateAttachmentId(msg._id, attachmentId);
          } else if (url) {
            logger.log(
              `Migrate message ${msg._id}: Handling an external url ...`,
            );
            const response = await http.axiosRef.get(url, {
              responseType: 'arraybuffer', // Ensures the response is returned as a Buffer
            });
            const fileBuffer = Buffer.from(response.data);
            const attachment = await attachmentService.store(fileBuffer, {
              name: uuidv4(),
              size: fileBuffer.length,
              type: response.headers['content-type'],
              channel: {},
            });
            await updateAttachmentId(msg._id, attachment.id);
          }
        } else {
          logger.warn(
            `Unable to migrate message ${msg._id}: No ID nor URL was found`,
          );

          throw new Error(
            'Unable to process message attachment: No ID or URL to be processed',
          );
        }
      } else {
        throw new Error(
          'Unable to process message attachment: Invalid Payload',
        );
      }
    } catch (error) {
      logger.error(
        `Failed to update message ${msg._id}: ${error.message}, defaulting to null`,
      );
      try {
        await updateAttachmentId(msg._id, null);
      } catch (err) {
        logger.error(
          `Failed to update message ${msg._id}: ${error.message}, unable to default to null`,
        );
      }
    }
  }
};

module.exports = {
  async up(services: MigrationServices) {
    await populateSubscriberAvatar(services);
    await updateOldAvatarsPath(services);
    await migrateAttachmentBlocks(MigrationAction.UP, services);
    await migrateAttachmentContents(MigrationAction.UP, services);
    // Given the complexity and inconsistency data, this method does not have
    // a revert equivalent, at the same time, thus, it doesn't "unset" any attribute
    await migrateAttachmentMessages(services);
    return true;
  },
  async down(services: MigrationServices) {
    await unpopulateSubscriberAvatar(services);
    await restoreOldAvatarsPath(services);
    await migrateAttachmentBlocks(MigrationAction.DOWN, services);
    await migrateAttachmentContents(MigrationAction.DOWN, services);
    return true;
  },
};
