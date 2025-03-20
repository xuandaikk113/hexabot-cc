/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ReactElement } from "react";

import { VisualEditor } from "@/components/visual-editor";
import { Layout } from "@/layout";

const VisualEditorPage = () => {
  return (
    <>
      <VisualEditor />
    </>
  );
};

VisualEditorPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout hasNoPadding>{page}</Layout>;
};

export default VisualEditorPage;
