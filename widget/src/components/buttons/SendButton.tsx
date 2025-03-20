/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import React from "react";

import SendIcon from "../icons/SendIcon";
import "./SendButton.scss";

interface SendButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SendButton: React.FC<SendButtonProps> = (props) => {
  const { onClick, ...rest } = props;

  return (
    <button
      onClick={onClick}
      {...rest}
      className="sc-user-input--button-icon-wrapper"
    >
      <SendIcon />
    </button>
  );
};

export default SendButton;
