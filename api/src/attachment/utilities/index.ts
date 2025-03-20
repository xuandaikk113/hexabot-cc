/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { createReadStream, existsSync } from 'fs';
import { extname } from 'path';

import { Logger, StreamableFile } from '@nestjs/common';
import { StreamableFileOptions } from '@nestjs/common/file-stream/interfaces/streamable-options.interface';
import { v4 as uuidv4 } from 'uuid';

import { config } from '@/config';

import { AttachmentResourceRef } from '../types';

export const MIME_REGEX = /^[a-z-]+\/[0-9a-z\-.]+$/gm;

/**
 * Validates if a given string matches the MIME type format.
 *
 * @param type The string to validate.
 * @returns Whether the string is a valid MIME type.
 */
export const isMime = (type: string): boolean => {
  return MIME_REGEX.test(type);
};

/**
 * Checks if a file exists in the specified upload directory.
 * @param filePath The relative location of the file.
 * @returns True if the file exists.
 */
export const fileExists = (filePath: string): boolean => {
  // bypass test env
  if (config.env === 'test') {
    return true;
  }
  try {
    return existsSync(filePath);
  } catch (e) {
    new Logger(`Attachment Model : Unable to locate file: ${filePath}`);
    return false;
  }
};

/**
 * Creates a streamable file from a given file path and options.
 *
 * @param options The object containing the file path and optional settings.
 * @returns A streamable file object.
 */
export const getStreamableFile = ({
  path,
  options,
}: {
  path: string;
  options?: StreamableFileOptions;
}) => {
  // bypass test env
  if (config.env === 'test') {
    return new StreamableFile(Buffer.from(''), options);
  }
  const fileReadStream = createReadStream(path);

  return new StreamableFile(fileReadStream, options);
};

/**
 * Generates a unique filename by appending a UUID to the original name.
 *
 * @param originalname The original filename.
 * @returns A unique filename.
 */
export const generateUniqueFilename = (originalname: string) => {
  const extension = extname(originalname);
  const name = originalname.slice(0, -extension.length);
  return `${name}-${uuidv4()}${extension}`;
};

/**
 * Checks if the given ref is of type TAttachmentResourceRef.
 *
 * @param resourceRef - The ref to check.
 * @returns True if the ref is of type TAttachmentResourceRef, otherwise false.
 */
export const isAttachmentResourceRef = (
  resourceRef: any,
): resourceRef is AttachmentResourceRef => {
  return Object.values(AttachmentResourceRef).includes(resourceRef);
};
AttachmentResourceRef;

/**
 * Checks if the given list is an array of TAttachmentResourceRef.
 *
 * @param refList - The list of resource references to check.
 * @returns True if all items in the list are of type TAttachmentResourceRef, otherwise false.
 */
export const isAttachmentResourceRefArray = (
  refList: any,
): refList is AttachmentResourceRef[] => {
  return (
    Array.isArray(refList) &&
    refList.length > 0 &&
    refList.every(isAttachmentResourceRef)
  );
};
