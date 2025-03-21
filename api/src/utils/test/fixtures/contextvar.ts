/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { ContextVarCreateDto } from '@/chat/dto/context-var.dto';
import { ContextVar, ContextVarModel } from '@/chat/schemas/context-var.schema';

import { getFixturesWithDefaultValues } from '../defaultValues';
import { FixturesTypeBuilder } from '../types';

type TContentVarFixtures = FixturesTypeBuilder<ContextVar, ContextVarCreateDto>;

export const contentVarDefaultValues: TContentVarFixtures['defaultValues'] = {
  permanent: false,
};

const contextVars: TContentVarFixtures['values'][] = [
  {
    label: 'test context var 1',
    name: 'test1',
  },
  {
    label: 'test context var 2',
    name: 'test2',
  },
];

export const contextVarFixtures = getFixturesWithDefaultValues<
  TContentVarFixtures['values']
>({
  fixtures: contextVars,
  defaultValues: contentVarDefaultValues,
});

export const installContextVarFixtures = async () => {
  const ContextVar = mongoose.model(
    ContextVarModel.name,
    ContextVarModel.schema,
  );
  return await ContextVar.insertMany(contextVarFixtures);
};
