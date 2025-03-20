/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import React from "react";

import { FormDialog as Wrapper } from "@/app-components/dialogs";
import { useTranslate } from "@/hooks/useTranslate";
import { TTranslationKeys } from "@/i18n/i18n.types";
import { ComponentFormDialogProps } from "@/types/common/dialogs.types";

type GenericFormDialogProps<T> = ComponentFormDialogProps<T> & {
  Form: React.ElementType;
  rowKey?: keyof T;
  addText?: TTranslationKeys;
  editText?: TTranslationKeys;
};

export const GenericFormDialog = <T,>({
  Form,
  rowKey,
  payload: data,
  ...rest
}: GenericFormDialogProps<T>) => {
  const { t } = useTranslate();
  const hasRow = rowKey ? data?.[rowKey] : data;
  const translationKey = hasRow ? rest.editText : rest.addText;

  return (
    <Form
      onSuccess={() => {
        rest.onClose(true);
      }}
      WrapperProps={{
        title: translationKey && t(translationKey),
        ...rest,
      }}
      {...{ data, Wrapper }}
    />
  );
};
