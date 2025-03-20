/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { GridEventListener } from "@mui/x-data-grid";
import { FC, Fragment, useState } from "react";

import { MediaLibrary } from "@/components/media-library";
import { IAttachment } from "@/types/attachment.types";
import { ComponentFormProps } from "@/types/common/dialogs.types";

export type AttachmentFormData = {
  row?: undefined;
  accept?: string;
  onChange?: (data?: IAttachment | null) => void;
};

export const AttachmentForm: FC<ComponentFormProps<AttachmentFormData>> = ({
  data,
  Wrapper = Fragment,
  WrapperProps,
  ...rest
}) => {
  const [selected, setSelected] = useState<IAttachment | null>(null);
  const handleSelection: GridEventListener<"rowClick"> = (data) => {
    setSelected(data.row);
  };

  return (
    <Wrapper
      onSubmit={() => {
        data?.onChange?.(selected);
        rest.onSuccess?.();
      }}
      {...WrapperProps}
      confirmButtonProps={{
        ...WrapperProps?.confirmButtonProps,
        disabled: !selected,
      }}
    >
      <MediaLibrary
        showTitle={false}
        onSelect={handleSelection}
        accept={data?.accept}
      />
    </Wrapper>
  );
};
