/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { MenuItem, Select } from "@mui/material";
import { FC, Fragment, useState } from "react";

import { ContentContainer } from "@/app-components/dialogs";
import { ICategory } from "@/types/category.types";
import { ComponentFormProps } from "@/types/common/dialogs.types";

export type BlockMoveFormData = {
  row?: never;
  ids: string[];
  onMove: (ids: string[], targetCategoryId: string) => void;
  category: string;
  categories: ICategory[];
};

export const BlockMoveForm: FC<ComponentFormProps<BlockMoveFormData>> = ({
  data,
  Wrapper = Fragment,
  WrapperProps,
  ...rest
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    data?.category || "",
  );
  const handleMove = () => {
    if (selectedCategoryId) {
      data?.onMove(data.ids, selectedCategoryId);
      rest.onSuccess?.();
    }
  };

  return (
    <Wrapper
      onSubmit={handleMove}
      {...WrapperProps}
      confirmButtonProps={{
        ...WrapperProps?.confirmButtonProps,
        disabled: selectedCategoryId === data?.category,
      }}
    >
      <ContentContainer>
        <Select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value as string)}
          fullWidth
          displayEmpty
        >
          {data?.categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </ContentContainer>
    </Wrapper>
  );
};
