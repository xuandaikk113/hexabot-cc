/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import UploadIcon from "@mui/icons-material/Upload";
import { Button, CircularProgress } from "@mui/material";
import { ChangeEvent, forwardRef } from "react";

import { useConfig } from "@/hooks/useConfig";
import { useToast } from "@/hooks/useToast";
import { useTranslate } from "@/hooks/useTranslate";

import { Input } from "./Input";

export type FileUploadButtonProps = {
  label: string;
  accept?: string;
  onChange: (file: File) => void;
  isLoading?: boolean;
  error?: boolean;
  helperText?: string;
};

const FileUploadButton = forwardRef<HTMLLabelElement, FileUploadButtonProps>(
  ({ label, accept, isLoading = true, onChange }, ref) => {
    const config = useConfig();
    const { toast } = useToast();
    const { t } = useTranslate();
    const handleImportChange = async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const file = event.target.files.item(0);

        if (!file) return false;

        if (accept && !accept.split(",").includes(file.type)) {
          toast.error(t("message.invalid_file_type"));

          return false;
        }

        if (config.maxUploadSize && file.size > config.maxUploadSize) {
          toast.error(t("message.file_max_size"));

          return false;
        }

        onChange(file);
      }
    };

    return (
      <>
        <Button
          ref={ref}
          htmlFor="importFile"
          variant="contained"
          component="label"
          startIcon={<UploadIcon />}
          endIcon={isLoading ? <CircularProgress size="1rem" /> : null}
          disabled={isLoading}
        >
          {label}
        </Button>
        <Input
          id="importFile"
          type="file"
          value="" // to trigger an automatic reset to allow the same file to be selected multiple times
          sx={{ display: "none" }}
          onChange={handleImportChange}
          inputProps={{ accept }}
        />
      </>
    );
  },
);

FileUploadButton.displayName = "FileUploadButton";

export default FileUploadButton;
