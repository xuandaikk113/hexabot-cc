/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { getDelayedDate } from './date';
import { TFixtures, TFixturesDefaultValues } from './types';

export const getFixturesWithDefaultValues = <T, S = TFixtures<T>>({
  fixtures,
  defaultValues = {},
}: {
  fixtures: S[];
  defaultValues?: TFixturesDefaultValues<T>;
}): S[] =>
  fixtures.map((fixture, index) => ({
    ...defaultValues,
    ...fixture,
    createdAt: defaultValues.hasOwnProperty('createdAt')
      ? defaultValues.createdAt
      : getDelayedDate(index),
  }));
