/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import React from "react";

import { useColors } from "../providers/ColorProvider";
import { IMenuNode } from "../types/menu.type";
import { IPayload } from "../types/message.types";

import "./MenuItem.scss";

interface MenuItemProps {
  item: IMenuNode;
  parent?: IMenuNode;
  onOpenSubItems: (item: IMenuNode) => void;
  onPostback: (data: IPayload) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  parent,
  onOpenSubItems,
  onPostback,
}) => {
  const { colors } = useColors();
  const handleClick = () => {
    switch (item.type) {
      case "web_url":
        window.open(item.url, "_blank");
        break;
      case "nested":
        onOpenSubItems({ ...item, _parent: parent });
        break;
      case "postback":
        onPostback({ text: item.title, payload: item.payload });
        break;
    }
  };

  return (
    <div className="sc-menu-element">
      <a
        className="sc-menu-item"
        style={{ color: colors.header.text }}
        role="button"
        onClick={handleClick}
      >
        {item.title}
        {item.type === "nested" && (
          <span className="sc-menu-item-button">&#10095;</span>
        )}
      </a>
    </div>
  );
};

export default MenuItem;
