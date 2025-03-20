/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ReactElement } from "react";

import { ContextVars } from "@/components/context-vars";
import { Layout } from "@/layout";

const ContextVarPage = () => {
  return <ContextVars />;
};

ContextVarPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ContextVarPage;
