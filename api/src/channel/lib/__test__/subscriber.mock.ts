/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Subscriber } from '@/chat/schemas/subscriber.schema';

import { modelInstance } from './base.mock';
import { customerLabelsMock } from './label.mock';

export const subscriberInstance: Subscriber = {
  foreign_id: 'foreign-id-for-jhon-doe',
  first_name: 'John',
  last_name: 'Doe',
  language: 'fr',
  locale: 'fr_FR',
  gender: 'male',
  timezone: -1,
  country: 'TN',
  assignedTo: null,
  assignedAt: null,
  lastvisit: new Date(),
  retainedFrom: new Date(),
  channel: {
    name: 'web-channel',
  },
  labels: [],
  avatar: null,
  context: {},
  ...modelInstance,
};

export const subscriberWithoutLabels: Subscriber = {
  ...subscriberInstance,
  labels: [],
};

export const subscriberWithLabels: Subscriber = {
  ...subscriberWithoutLabels,
  labels: customerLabelsMock.map(({ id }) => id),
  assignedTo: null,
};
