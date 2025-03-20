/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ReactElement } from "react";

import { Inbox } from "@/components/inbox";
import { Layout } from "@/layout";

const InboxPage = () => {
  return <Inbox />;
};

InboxPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout hasNoPadding>{page}</Layout>;
};

export default InboxPage;
