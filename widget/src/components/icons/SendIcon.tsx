/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { FC, SVGProps } from "react";

const SendIcon: FC<SVGProps<SVGSVGElement>> = ({
  viewBox = "0 0 48 48",
  ...rest
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} {...rest}>
      <path d="M4.02 42L46 24 4.02 6 4 20l30 4-30 4z" />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
};

export default SendIcon;
