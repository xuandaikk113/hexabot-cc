/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import Autolinker from "autolinker";
import React, { useEffect, useRef } from "react";

import { useColors } from "../../providers/ColorProvider";
import { Direction, TMessage } from "../../types/message.types";

import "./TextMessage.scss";

interface TextMessageProps {
  message: TMessage;
}

const TextMessage: React.FC<TextMessageProps> = ({ message }) => {
  const { colors: allColors } = useColors();
  const messageTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    autoLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const autoLink = () => {
    if (message.direction === Direction.received && messageTextRef.current) {
      const text = messageTextRef.current.innerText;

      messageTextRef.current.innerHTML = Autolinker.link(text, {
        className: "chatLink",
        truncate: { length: 50, location: "smart" },
      });
    }
  };

  if (!("text" in message.data)) {
    throw new Error("Unable to find text.");
  }

  const colors = allColors[message.direction || Direction.received];

  return (
    <div
      className="sc-message--text"
      style={{
        color: colors.text,
        backgroundColor: colors.bg,
      }}
    >
      <p className="sc-message--text-content" ref={messageTextRef}>
        {message.data.text}
      </p>
    </div>
  );
};

export default TextMessage;
