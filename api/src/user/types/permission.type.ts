/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Action } from './action.type';
import { TModel } from './model.type';

type ModelPermissionsPerRole = Record<TModel, Action[]>;

export type PermissionsTree = Record<string, ModelPermissionsPerRole>;
