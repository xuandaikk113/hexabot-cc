/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import React, { PropsWithChildren } from "react";

import { useChat } from "../providers/ChatProvider";
import { useColors } from "../providers/ColorProvider";
import { useSocketLifecycle } from "../providers/SocketProvider";
import { useWidget, WidgetContextType } from "../providers/WidgetProvider";

import ChatWindow from "./ChatWindow";
import CloseIcon from "./icons/CloseIcon";
import OpenIcon from "./icons/OpenIcon";
import "./Launcher.scss";

type LauncherProps = PropsWithChildren<{
  CustomLauncher?: (props: { widget: WidgetContextType }) => JSX.Element;
  CustomHeader?: () => JSX.Element;
  CustomAvatar?: () => JSX.Element;
  PreChat?: React.FC;
  PostChat?: React.FC;
}>;

const Launcher: React.FC<LauncherProps> = ({
  CustomLauncher,
  CustomHeader,
  CustomAvatar,
  PreChat,
  PostChat,
}) => {
  const chat = useChat();
  const widget = useWidget();
  const { colors } = useColors();
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    widget.setIsOpen(!widget.isOpen);
  };

  useSocketLifecycle();

  return (
    <div>
      <div
        className={`sc-launcher-wrapper ${widget.isOpen ? "opened" : ""}`}
        onClick={handleToggle}
      >
        {CustomLauncher ? (
          <CustomLauncher widget={widget} />
        ) : (
          <div
            className="sc-launcher"
            style={{ backgroundColor: colors.launcher.bg }}
          >
            {chat.newMessagesCount > 0 && !widget.isOpen && (
              <div className="sc-new-messages-count">
                {chat.newMessagesCount}
              </div>
            )}
            {widget.isOpen ? (
              <CloseIcon
                className="sc-closed-icon"
                width="16px"
                height="16px"
              />
            ) : (
              <OpenIcon className="sc-open-icon" />
            )}
          </div>
        )}
      </div>
      {widget.isOpen && (
        <ChatWindow
          CustomHeader={CustomHeader}
          CustomAvatar={CustomAvatar}
          PreChat={PreChat}
          PostChat={PostChat}
        />
      )}
    </div>
  );
};

export default Launcher;
