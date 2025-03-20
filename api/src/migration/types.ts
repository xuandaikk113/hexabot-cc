/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { HttpService } from '@nestjs/axios';

import { AttachmentService } from '@/attachment/services/attachment.service';
import { LoggerService } from '@/logger/logger.service';

import { MigrationDocument } from './migration.schema';

export enum MigrationAction {
  UP = 'up',
  DOWN = 'down',
}

export type MigrationVersion = `v${number}.${number}.${number}`;

export type MigrationName = `v-${number}-${number}-${number}`;

export interface MigrationRunParams {
  action: MigrationAction;
  version?: MigrationVersion;
  isAutoMigrate?: boolean;
}

export interface MigrationRunOneParams extends MigrationRunParams {
  version: MigrationVersion;
}

export interface MigrationSuccessCallback extends MigrationRunParams {
  migrationDocument: MigrationDocument | null;
}

export type MigrationServices = {
  logger: LoggerService;
  http: HttpService;
  attachmentService: AttachmentService;
};
