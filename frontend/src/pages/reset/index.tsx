/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ReactElement } from "react";

import { ResetPasswordRequest } from "@/app-components/auth/resetPasswordRequest";
import { Layout } from "@/layout";

const ResetRequestPage = () => {
  return <ResetPasswordRequest />;
};

ResetRequestPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout sxContent={{ alignContent: "center" }}>{page}</Layout>;
};

export default ResetRequestPage;
