/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { CategoryCreateDto } from '@/chat/dto/category.dto';
import { Category, CategoryModel } from '@/chat/schemas/category.schema';

import { getFixturesWithDefaultValues } from '../defaultValues';
import { FixturesTypeBuilder } from '../types';

export type TCategoryFixtures = FixturesTypeBuilder<
  Category,
  CategoryCreateDto
>;

export const categoryDefaultValues: TCategoryFixtures['defaultValues'] = {
  builtin: false,
  zoom: 100,
  offset: [0, 0],
};

export const categories: TCategoryFixtures['values'][] = [
  {
    label: 'test category 1',
  },
  {
    label: 'test category 2',
  },
];

export const categoryFixtures = getFixturesWithDefaultValues<
  TCategoryFixtures['values']
>({
  fixtures: categories,
  defaultValues: categoryDefaultValues,
});

export const installCategoryFixtures = async () => {
  const Category = mongoose.model(CategoryModel.name, CategoryModel.schema);
  return await Category.insertMany(categoryFixtures);
};
