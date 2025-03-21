/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useRouter } from "next/router";
import { FC, Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { ContentContainer, ContentItem } from "@/app-components/dialogs";
import { Input } from "@/app-components/inputs/Input";
import MultipleInput from "@/app-components/inputs/MultipleInput";
import { useCreate } from "@/hooks/crud/useCreate";
import { useGet } from "@/hooks/crud/useGet";
import { useUpdate } from "@/hooks/crud/useUpdate";
import { useToast } from "@/hooks/useToast";
import { useTranslate } from "@/hooks/useTranslate";
import { EntityType, Format } from "@/services/types";
import { ComponentFormProps } from "@/types/common/dialogs.types";
import { INlpValue, INlpValueAttributes } from "@/types/nlp-value.types";

export const NlpValueForm: FC<
  ComponentFormProps<{ data: INlpValue; canHaveSynonyms: boolean }>
> = ({ data: props, Wrapper = Fragment, WrapperProps, ...rest }) => {
  const { data, canHaveSynonyms } = props || {};
  const { t } = useTranslate();
  const { toast } = useToast();
  const { query } = useRouter();
  const { refetch: refetchEntity } = useGet(data?.entity || String(query.id), {
    entity: EntityType.NLP_ENTITY,
    format: Format.FULL,
  });
  const { mutate: createNlpValue } = useCreate(EntityType.NLP_VALUE, {
    onError: () => {
      rest.onError?.();
      toast.error(t("message.internal_server_error"));
    },
    onSuccess() {
      rest.onSuccess?.();
      refetchEntity();
      toast.success(t("message.success_save"));
    },
  });
  const { mutate: updateNlpValue } = useUpdate(EntityType.NLP_VALUE, {
    onError: () => {
      rest.onError?.();
      toast.error(t("message.internal_server_error"));
    },
    onSuccess() {
      rest.onSuccess?.();
      toast.success(t("message.success_save"));
    },
  });
  const { reset, register, handleSubmit, control } = useForm<
    INlpValueAttributes & {
      expressions: string[];
    }
  >({
    defaultValues: {
      value: data?.value || "",
      expressions: data?.expressions || [],
    },
  });
  const validationRules = {
    value: {
      required: t("message.value_is_required"),
    },
    name: {},
    description: {},
  };
  const onSubmitForm = async (params: INlpValueAttributes) => {
    if (data) {
      updateNlpValue({ id: data.id, params });
    } else {
      createNlpValue({ ...params, entity: String(query.id) });
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        value: data.value,
        expressions: data.expressions,
      });
    } else {
      reset();
    }
  }, [data, reset]);

  return (
    <Wrapper onSubmit={handleSubmit(onSubmitForm)} {...WrapperProps}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <ContentContainer>
          <ContentItem>
            <Input
              label={t("placeholder.nlp_value")}
              required
              autoFocus
              {...register("value", validationRules.value)}
            />
          </ContentItem>

          {canHaveSynonyms ? (
            <ContentItem>
              <Controller
                name="expressions"
                control={control}
                render={({ field }) => (
                  <MultipleInput label="synonyms" {...field} />
                )}
              />
            </ContentItem>
          ) : null}
        </ContentContainer>
      </form>
    </Wrapper>
  );
};
