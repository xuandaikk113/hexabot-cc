/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export enum DtoAction {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type DtoConfig<
  C extends Partial<Record<DtoAction, object>> = Partial<
    Record<DtoAction, object>
  >,
> = C;

export type DtoInfer<K extends keyof Dto, Dto, I> = Dto[K] extends object
  ? Dto[K]
  : I;
