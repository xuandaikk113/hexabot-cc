/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { FC, SVGProps } from "react";

const CloseIcon: FC<SVGProps<SVGSVGElement>> = ({
  viewBox = "0 0 24 24",
  ...rest
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} {...rest}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
};

export default CloseIcon;
