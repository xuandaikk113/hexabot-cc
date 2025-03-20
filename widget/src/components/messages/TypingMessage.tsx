/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import React from "react";

import { useColors } from "../../providers/ColorProvider";

import "./TypingMessage.scss";

const TypingMessage: React.FC = () => {
  const { colors } = useColors();

  return (
    <div
      className="sc-typing-indicator"
      style={{
        color: colors.received.text,
        backgroundColor: colors.received.bg,
      }}
    >
      <span />
      <span />
      <span />
    </div>
  );
};

export default TypingMessage;
