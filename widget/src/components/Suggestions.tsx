/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import React from "react";

import { useChat } from "../providers/ChatProvider";
import { useColors } from "../providers/ColorProvider";
import { useSettings } from "../providers/SettingsProvider";
import { ISuggestion, TOutgoingMessageType } from "../types/message.types";

import "./Suggestions.scss";

const Suggestions: React.FC = () => {
  const { setPayload, send, suggestions } = useChat();
  const settings = useSettings();
  const { colors } = useColors();
  const sendSuggestion = (
    event: React.MouseEvent<HTMLButtonElement>,
    suggestion: ISuggestion,
  ) => {
    setPayload(suggestion);
    send({
      event,
      source: "quick-reply",
      data: {
        type: TOutgoingMessageType.quick_reply,
        data: suggestion,
      },
    });
    if (settings.autoFlush) {
      setPayload(null);
    }
  };

  return (
    <div
      className="sc-suggestions-row"
      style={{ background: colors.button.bg }}
    >
      {suggestions.map((suggestion, idx) => (
        <button
          key={idx}
          className="sc-suggestions-element"
          onClick={(event) => sendSuggestion(event, suggestion)}
          style={{ borderColor: colors.button.text, color: colors.button.text }}
        >
          {suggestion.text}
        </button>
      ))}
    </div>
  );
};

export default Suggestions;
