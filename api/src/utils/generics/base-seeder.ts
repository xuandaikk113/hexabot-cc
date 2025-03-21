/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { FlattenMaps } from 'mongoose';

import { DtoAction, DtoConfig, DtoInfer } from '../types/dto.types';

import { BaseRepository } from './base-repository';
import { BaseSchema } from './base-schema';

export abstract class BaseSeeder<
  T extends FlattenMaps<unknown>,
  P extends string = never,
  TFull extends Omit<T, P> = never,
  Dto extends DtoConfig = object,
  U extends Omit<T, keyof BaseSchema> = Omit<T, keyof BaseSchema>,
> {
  constructor(
    protected readonly repository: BaseRepository<T, P, TFull, Dto>,
  ) {}

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async isEmpty(): Promise<boolean> {
    const count = await this.repository.countAll();
    return count === 0;
  }

  async seed(models: DtoInfer<DtoAction.Create, Dto, U>[]): Promise<boolean> {
    if (await this.isEmpty()) {
      await this.repository.createMany(models);
      return true;
    }
    return false;
  }
}
