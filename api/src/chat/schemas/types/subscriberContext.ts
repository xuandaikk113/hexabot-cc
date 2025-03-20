/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { z } from 'zod';

export const subscriberContextSchema = z.object({
  vars: z.record(z.any()).optional(),
});

export type SubscriberContext = z.infer<typeof subscriberContextSchema>;
