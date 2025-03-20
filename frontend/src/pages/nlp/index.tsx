/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Nlp } from "@/components/nlp";
import { Layout } from "@/layout";

const NlpPage = () => {
  const router = useRouter();

  return (
    <Nlp
      entityId={router.query.id as string}
      selectedTab={router.pathname === "/nlp" ? "sample" : "entity"}
    />
  );
};

NlpPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NlpPage;
