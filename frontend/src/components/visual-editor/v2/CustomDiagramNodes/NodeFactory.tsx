/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

import { NodeModel } from "./NodeModel";
import NodeWidget from "./NodeWidget";

export class NodeFactory extends AbstractReactFactory<
  NodeModel,
  DiagramEngine
> {
  constructor() {
    super("ts-custom-node");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateModel(initialConfig) {
    return new NodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      // @todo
      // @ts-expect-error fix the following ts
      <NodeWidget engine={this.engine as DiagramEngine} node={event.model} />
    );
  }
}
