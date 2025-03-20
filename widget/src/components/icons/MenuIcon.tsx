/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { FC, SVGProps } from "react";

const MenuIcon: FC<SVGProps<SVGSVGElement>> = ({
  width = "32",
  height = "32",
  x = "0",
  y = "0",
  className = "sc-user-input--menu-img",
  viewBox = "0 0 32 32",
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      x={x}
      y={y}
      className={className}
      viewBox={viewBox}
      {...rest}
    >
      <path d="M4 10h24a2 2 0 000-4H4a2 2 0 000 4zm24 4H4a2 2 0 000 4h24a2 2 0 000-4zm0 8H4a2 2 0 000 4h24a2 2 0 000-4z" />
    </svg>
  );
};

export default MenuIcon;
