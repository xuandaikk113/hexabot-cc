/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export type TFilterStringFields<T> = {
  [K in keyof T]: T[K] extends string | undefined ? K : never;
}[keyof T];

export type TParamItem<T> = {
  $eq?: { [key in keyof T]?: T[key] }[];
  $iLike?: TFilterStringFields<T>[];
  $neq?: { [key in keyof T]?: T[key] }[];
  $or?: TFilterStringFields<T>[];
};

export type TBuildParamProps<T> = {
  params?: TFilterStringFields<T>[];
  searchText?: string;
};

export type TBuildInitialParamProps<T> = {
  initialParams?: { [key in keyof T]?: T[key] }[];
};
