/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import "eazychart-css";
import { ReactElement } from "react";

import { Dashboard } from "@/components/dashboard";

import { Layout } from "../layout";

const DashboardPage = () => {
  return <Dashboard />;
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DashboardPage;
