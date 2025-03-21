/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { FC, SVGProps } from "react";

const BackIcon: FC<SVGProps<SVGSVGElement>> = ({
  width = "24",
  height = "24",
  fill = "none",
  stroke = "#000",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  strokeWidth = "2",
  viewBox = "0 0 24 24",
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      strokeWidth={strokeWidth}
      viewBox={viewBox}
      {...rest}
    >
      <path stroke="#fff" strokeOpacity="1" d="M15 18L9 12 15 6" />
    </svg>
  );
};

export default BackIcon;
