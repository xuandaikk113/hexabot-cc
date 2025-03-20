/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export type ColorState = {
  header: { bg: string; text: string };
  launcher: { bg?: string };
  messageList: { bg?: string };
  sent: { bg?: string; text?: string };
  received: { bg?: string; text?: string };
  userInput: { bg?: string; text?: string };
  button: { bg?: string; text?: string; border?: string };
  messageStatus: { bg?: string; text?: string };
  messageTime: { text?: string };
};

export type ColorAction = {
  type:
    | "setPrimary"
    | "setSecondary"
    | "setText"
    | "setTextSecondary"
    | "updateComponent";
  payload: {
    component: keyof ColorState;
    value: { bg: string; text?: string; border?: string };
  };
};
