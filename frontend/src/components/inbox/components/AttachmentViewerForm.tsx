/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { FC, Fragment } from "react";

import { ComponentFormProps } from "@/types/common/dialogs.types";

export type AttachmentViewerFormData = {
  row?: never;
  url?: string;
  name?: string;
};

export const AttachmentViewerForm: FC<
  ComponentFormProps<AttachmentViewerFormData>
> = ({ data, Wrapper = Fragment, WrapperProps }) => {
  return (
    <Wrapper {...WrapperProps}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width="100%"
        style={{
          cursor: "pointer",
          objectFit: "contain",
          maxHeight: "70vh",
        }}
        alt={data?.url}
        src={data?.url}
      />
    </Wrapper>
  );
};
