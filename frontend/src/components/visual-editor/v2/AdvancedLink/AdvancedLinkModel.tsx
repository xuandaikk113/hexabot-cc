/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import {
    DefaultLinkModel,
    DefaultLinkModelOptions,
} from "@projectstorm/react-diagrams";

export class AdvancedLinkModel extends DefaultLinkModel {
  constructor(options?: DefaultLinkModelOptions) {
    super({
      ...options,
      type: "advanced",
    });
  }
}
