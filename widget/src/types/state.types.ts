/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export enum OutgoingMessageState {
  sent = 0,
  sending = 1,
  uploading = 2,
}

export enum ConnectionState {
  disconnected = 0,
  wantToConnect = 1,
  tryingToConnect = 2,
  connected = 3,
}

export type ChatScreen =
  // Screen that shows up before the chat (user subscription)
  | "prechat"
  // Screen that shows up after the chat is closed (not in use yet)
  | "postchat"
  // Screen shows up when user clicks on a url button where there is a webview
  | "webview"
  // Screen that shows the messages and text input
  | "chat";
