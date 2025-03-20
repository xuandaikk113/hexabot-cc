/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ReactElement } from "react";

import { Register } from "@/app-components/auth/Register";
import { Layout } from "@/layout/index";

const RegisterPage = () => {
  return <Register />;
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout sxContent={{ alignContent: "center" }}>{page}</Layout>;
};

export default RegisterPage;
