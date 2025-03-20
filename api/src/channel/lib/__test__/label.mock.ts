/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Label } from '@/chat/schemas/label.schema';

import { modelInstance } from './base.mock';

const baseLabel: Label = {
  ...modelInstance,
  title: '',
  name: '',
  label_id: {
    messenger: '',
    web: '',
    dimelo: '',
    twitter: '',
  },
  description: '',
  builtin: false,
  createdBy: 'system',
};

export const labelMock: Label = {
  ...baseLabel,
  title: 'Label',
  name: 'label',
  label_id: {
    messenger: 'none',
    web: 'none',
    dimelo: 'none',
    twitter: 'none',
  },
};

export const customerLabelsMock: Label[] = [
  {
    ...baseLabel,
    title: 'Client',
    name: 'client',
    label_id: {
      messenger: 'none',
      web: 'none',
      dimelo: 'none',
      twitter: 'none',
    },
  },
  {
    ...baseLabel,
    title: 'Professional',
    name: 'profressional',
    label_id: {
      messenger: 'none',
      web: 'none',
      dimelo: 'none',
      twitter: 'none',
    },
  },
];
