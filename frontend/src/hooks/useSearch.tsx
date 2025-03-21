/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { debounce } from "@mui/material";
import { ChangeEvent, useState } from "react";

import {
    TBuildInitialParamProps,
    TBuildParamProps,
    TParamItem,
} from "@/types/search.types";

const buildOrParams = <T,>({ params, searchText }: TBuildParamProps<T>) => ({
  or: params?.map((field) => ({
    [field]: { contains: searchText },
  })),
});
const buildILikeParams = <T,>({ params, searchText }: TBuildParamProps<T>) =>
  params?.reduce(
    (acc, field) => ({
      ...acc,
      [field]: { contains: searchText },
    }),
    {},
  );
const buildEqInitialParams = <T,>({
  initialParams,
}: TBuildInitialParamProps<T>) =>
  initialParams?.reduce(
    (acc, obj) => ({
      ...acc,
      ...obj,
    }),
    {},
  );
const buildNeqInitialParams = <T,>({
  initialParams,
}: TBuildInitialParamProps<T>) =>
  initialParams?.reduce(
    (acc, obj) => ({
      ...acc,
      [Object.entries(obj)[0][0]]: {
        "!=": Object.entries(obj)[0][1],
      },
    }),
    {},
  );

export const useSearch = <T,>(params: TParamItem<T>) => {
  const [searchText, setSearchText] = useState<string>("");
  const onSearch = debounce(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
      setSearchText(typeof e === "string" ? e : e.target.value);
    },
    300,
  );
  const {
    $eq: eqInitialParams,
    $iLike: iLikeParams,
    $neq: neqInitialParams,
    $or: orParams,
  } = params;

  return {
    onSearch,
    searchPayload: {
      where: {
        ...buildEqInitialParams({ initialParams: eqInitialParams }),
        ...buildNeqInitialParams({ initialParams: neqInitialParams }),
        ...(searchText?.length > 0 && {
          ...buildOrParams({ params: orParams, searchText }),
          ...buildILikeParams({ params: iLikeParams, searchText }),
        }),
      },
    },
  };
};
