/*
 * Copyright © 2025 Hexastack. All rights reserved.
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

import { Metadata } from '../schemas/metadata.schema';

@Injectable()
export class MetadataRepository extends BaseRepository<Metadata> {
  constructor(
    readonly eventEmitter: EventEmitter2,
    @InjectModel(Metadata.name) readonly model: Model<Metadata>,
  ) {
    super(eventEmitter, model, Metadata);
  }
}
