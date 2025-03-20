/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import Image from "next/image";
import Link from "next/link";

import { RouterType } from "@/services/types";

export const HexabotLogo = () => {
  return (
    <Link
      href={RouterType.HOME}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src="/images/cc-logo.png" 
        alt="CC Logo"
        width={118} 
        height={32}
        priority
      />
    </Link>
  );
};