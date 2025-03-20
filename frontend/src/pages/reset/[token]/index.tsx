/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ReactElement } from "react";

import { ResetPassword } from "@/app-components/auth/ResetPassword";
import { Layout } from "@/layout";

const ResetPage = () => {
  return <ResetPassword />;
};

ResetPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout sxContent={{ alignContent: "center" }}>{page}</Layout>;
};

export default ResetPage;
