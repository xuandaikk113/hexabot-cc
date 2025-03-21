/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { z } from 'zod';

import { buttonSchema } from './button';

export const contentOptionsSchema = z.object({
  display: z.enum(['list', 'carousel']),
  fields: z.object({
    title: z.string(),
    subtitle: z.string().nullable(),
    image_url: z.string().nullable(),
    url: z.string().optional(),
    action_title: z.string().optional(),
    action_payload: z.string().optional(),
  }),
  buttons: z.array(buttonSchema),
  limit: z.number().finite(),
  query: z.any().optional(),
  entity: z.union([z.string(), z.number().finite()]).optional(),
  top_element_style: z.enum(['large', 'compact']).optional(),
});

export type ContentOptions = z.infer<typeof contentOptionsSchema>;

export const BlockOptionsSchema = z.object({
  typing: z.number().optional(),
  content: contentOptionsSchema.optional(),
  fallback: z
    .object({
      active: z.boolean(),
      message: z.array(z.string()),
      max_attempts: z.number().finite(),
    })
    .optional(),
  assignTo: z.string().optional(),
  effects: z.array(z.string()).optional(),
});

export type BlockOptions = z.infer<typeof BlockOptionsSchema>;
