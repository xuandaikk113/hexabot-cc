/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { NLU } from '@/helper/types';

export const nlpEntitiesGreeting: NLU.ParseEntities = {
  entities: [
    {
      entity: 'intent',
      value: 'greeting',
      confidence: 0.999,
    },
    {
      entity: 'firstname',
      value: 'jhon',
      confidence: 0.5,
    },
    {
      entity: 'lastname',
      value: 'doe',
      confidence: 0.5,
    },
  ],
};
