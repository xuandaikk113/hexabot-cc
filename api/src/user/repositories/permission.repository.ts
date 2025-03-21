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

import { PermissionDto } from '../dto/permission.dto';
import {
    Permission,
    PERMISSION_POPULATE,
    PermissionFull,
    PermissionPopulate,
} from '../schemas/permission.schema';

@Injectable()
export class PermissionRepository extends BaseRepository<
  Permission,
  PermissionPopulate,
  PermissionFull,
  PermissionDto
> {
  constructor(
    readonly eventEmitter: EventEmitter2,
    @InjectModel(Permission.name) readonly model: Model<Permission>,
  ) {
    super(eventEmitter, model, Permission, PERMISSION_POPULATE, PermissionFull);
  }
}
