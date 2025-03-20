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

import { Dummy } from '../schemas/dummy.schema';

@Injectable()
export class DummyRepository extends BaseRepository<Dummy> {
  constructor(
    readonly eventEmitter: EventEmitter2,
    @InjectModel(Dummy.name) readonly model: Model<Dummy>,
  ) {
    super(eventEmitter, model, Dummy);
  }
}
