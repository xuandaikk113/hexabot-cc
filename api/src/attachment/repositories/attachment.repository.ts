/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@/utils/generics/base-repository';

import { Attachment } from '../schemas/attachment.schema';

@Injectable()
export class AttachmentRepository extends BaseRepository<Attachment, never> {
  constructor(
    readonly eventEmitter: EventEmitter2,
    @InjectModel(Attachment.name) readonly model: Model<Attachment>,
  ) {
    super(eventEmitter, model, Attachment);
  }
}
