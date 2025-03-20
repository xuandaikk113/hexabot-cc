/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import React, { useContext } from "react";

import { ConfirmDialog } from "@/app-components/dialogs";
import { DialogsContext } from "@/contexts/dialogs.context";
import {
    CloseDialog,
    OpenConfirmDialog,
    OpenDialog,
} from "@/types/common/dialogs.types";

export interface DialogHook {
  open: OpenDialog;
  close: CloseDialog;
  confirm: OpenConfirmDialog;
}

export const useDialogs = (): DialogHook => {
  const context = useContext(DialogsContext);

  if (!context) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }

  const { open, close } = context;
  const confirm = React.useCallback<OpenConfirmDialog>(
    (msg, { onClose, ...options } = {}) => {
      const { count, mode, isSingleton, ...rest } = options;

      return open(
        ConfirmDialog,
        {
          ...rest,
          msg: React.createElement(msg),
        },
        {
          mode,
          count,
          onClose,
          isSingleton,
        },
      );
    },
    [open],
  );

  return {
    open,
    close,
    confirm,
  };
};
