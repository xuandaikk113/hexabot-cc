/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import React from "react";
import ReactDOM from "react-dom/client";

import ChatWidget from "./ChatWidget.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChatWidget
      {...{
        apiUrl: process.env.REACT_APP_WIDGET_API_URL || "http://localhost:4000",
        channel: process.env.REACT_APP_WIDGET_CHANNEL || "web-channel",
        language: "en",
      }}
    />
  </React.StrictMode>,
);
