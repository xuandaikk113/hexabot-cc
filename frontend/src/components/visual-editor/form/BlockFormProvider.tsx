/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { createContext, ReactNode, useContext } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

import { IBlock, IBlockAttributes } from "@/types/block.types";

// Create a custom context for the block value
const BlockContext = createContext<IBlock | undefined>(undefined);

// Custom hook to use block context
export const useBlock = () => useContext(BlockContext);

// This component wraps FormProvider and adds block to its context
function BlockFormProvider({
  children,
  methods,
  block,
}: {
  methods: UseFormReturn<IBlockAttributes, any, undefined>;
  block: IBlock | undefined;
  children: ReactNode;
}) {
  return (
    <FormProvider {...methods}>
      <BlockContext.Provider value={block}>{children}</BlockContext.Provider>
    </FormProvider>
  );
}

export default BlockFormProvider;
