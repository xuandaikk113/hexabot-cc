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

import { Translation } from '../../i18n/schemas/translation.schema';

@Injectable()
export class TranslationRepository extends BaseRepository<Translation> {
  constructor(
    readonly eventEmitter: EventEmitter2,
    @InjectModel(Translation.name) readonly model: Model<Translation>,
  ) {
    super(eventEmitter, model, Translation);
  }
}
