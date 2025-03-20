/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { InputAdornment, Tooltip } from "@mui/material";

type AlertType = "warning" | "error" | "info" | "success";

type ColorType =
  | "disabled"
  | "action"
  | "inherit"
  | "error"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning";

const getIcon = (type: AlertType, color: ColorType = type) => {
  switch (type) {
    case "error":
      return <ErrorOutlineIcon color={color} />;
    case "info":
      return <InfoOutlinedIcon color={color} />;
    case "success":
      return <CheckCircleOutlineOutlinedIcon color={color} />;
    case "warning":
    default:
      return <WarningAmberOutlinedIcon color={color} />;
  }
};

export const AlertAdornment = ({
  title,
  type = "warning",
  color,
}: {
  title: string;
  type?: AlertType;
  color?: ColorType;
}) => {
  return (
    <Tooltip
      arrow
      title={title}
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            fontSize: "13px",
            padding: 0.6,
            maxWidth: "none",
          },
        },
      }}
    >
      <InputAdornment position="end">{getIcon(type, color)}</InputAdornment>
    </Tooltip>
  );
};
