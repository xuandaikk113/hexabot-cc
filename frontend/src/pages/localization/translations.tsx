/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ReactElement } from "react";

import { Translations } from "@/components/translations";
import { Layout } from "@/layout";

const TranslationsPage = () => {
  return <Translations />;
};

TranslationsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TranslationsPage;
