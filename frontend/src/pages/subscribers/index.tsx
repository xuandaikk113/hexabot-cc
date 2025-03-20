/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ReactElement } from "react";

import { Subscribers } from "@/components/subscribers";
import { Layout } from "@/layout";

const SubscribersPage = () => {
  return <Subscribers />;
};

SubscribersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SubscribersPage;
