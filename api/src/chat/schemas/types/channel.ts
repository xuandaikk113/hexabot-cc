/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { z } from 'zod';

import { ChannelName } from '@/channel/types';

export type SubscriberChannelData<C extends ChannelName = 'unknown-channel'> =
  C extends 'unknown-channel'
    ? { name: ChannelName }
    : {
        name: C;
      } & {
        // Channel's specific attributes
        [P in keyof SubscriberChannelDict[C]]: SubscriberChannelDict[C][P];
      };

export const channelDataSchema = z
  .object({
    name: z.string().regex(/-channel$/) as z.ZodType<ChannelName>,
  })
  .passthrough();

export type Channel = z.infer<typeof channelDataSchema>;
