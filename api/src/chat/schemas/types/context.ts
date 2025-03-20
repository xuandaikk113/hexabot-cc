/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ChannelName } from '@/channel/types';
import { NLU } from '@/helper/types';

import { Subscriber } from '../subscriber.schema';

import { Payload } from './quick-reply';

export interface Context {
  channel?: ChannelName;
  text?: string;
  payload?: Payload | string;
  nlp?: NLU.ParseEntities | null;
  vars: { [key: string]: any };
  user_location: {
    address?: Record<string, string>;
    lat: number;
    lon: number;
  };
  user: Subscriber;
  skip: Record<string, number>;
  attempt: number;
}
