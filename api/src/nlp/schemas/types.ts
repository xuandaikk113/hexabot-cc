/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { NlpEntityStub } from './nlp-entity.schema';
import { NlpValueStub } from './nlp-value.schema';

export interface NlpSampleEntityValue {
  entity: string; // entity name
  value: string; // entity value
  start?: number;
  end?: number;
}

export type NlpEntityMap<T extends NlpEntityStub> = { [entityId: string]: T };

export type NlpValueMap<T extends NlpValueStub> = { [valueId: string]: T };

export enum NlpSampleState {
  train = 'train',
  test = 'test',
  inbox = 'inbox',
}
