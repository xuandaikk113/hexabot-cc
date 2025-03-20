/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

// Core i18next library.
import i18n from "i18next";
import Backend from "i18next-http-backend";
// Bindings for React: allow components to
// re-render when language changes.
import getConfig from "next/config";
import { initReactI18next } from "react-i18next";

const { publicRuntimeConfig } = getConfig();

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: publicRuntimeConfig.lang.default,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: ["translation", "chatbot_settings", "contact", "nlp_settings"],
    interpolation: {
      escapeValue: false,
    },
  });

i18n.services.formatter?.add("dateFormat", (value, lng, options) =>
  new Intl.DateTimeFormat(lng, options?.formatParams?.val).format(
    new Date(options?.date || value),
  ),
);
export default i18n;