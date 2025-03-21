/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Controller, useFormContext } from "react-hook-form";

import { ContentItem } from "@/app-components/dialogs";
import MultipleInput from "@/app-components/inputs/MultipleInput";
import SimpleTextIcon from "@/app-components/svg/toolbar/SimpleTextIcon";
import { useTranslate } from "@/hooks/useTranslate";
import { IBlockAttributes } from "@/types/block.types";

import { useBlock } from "./BlockFormProvider";
import { FormSectionTitle } from "./FormSectionTitle";
import ReplacementTokens from "./inputs/ReplacementTokens";
import { getInputControls } from "./utils/inputControls";

const TextMessageForm = () => {
  const block = useBlock();
  const { t } = useTranslate();
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<IBlockAttributes>();

  return (
    <ContentItem>
      <FormSectionTitle title={t("label.message")} Icon={SimpleTextIcon} />
      <Controller
        name="message"
        control={control}
        defaultValue={block?.message as string[]}
        render={({ field }) => {
          const { value, ...rest } = field;

          return (
            <MultipleInput
              label=""
              {...rest}
              getInputProps={getInputControls(
                "message",
                errors,
                register,
                t("message.text_message_is_invalid"),
              )}
              value={value as string[]}
              multiline={true}
              minRows={3}
            />
          );
        }}
      />
      <ReplacementTokens />
    </ContentItem>
  );
};

TextMessageForm.displayName = "TextMessageForm";

export default TextMessageForm;
