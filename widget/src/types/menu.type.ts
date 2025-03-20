/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export enum MenuType {
  web_url = "web_url",
  postback = "postback",
  nested = "nested",
}

export interface IMenuNode {
  type: MenuType;
  url?: string;
  title: string;
  payload?: string;
  _parent?: IMenuNode;
  call_to_actions?: IMenuNode[];
}
