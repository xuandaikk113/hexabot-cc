/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { BaseModelOptions } from "@projectstorm/react-canvas-core";
import {
    DefaultPortModel,
    DefaultNodeModel as StormNodeModel,
} from "@projectstorm/react-diagrams";

import { BlockPorts } from "@/types/visual-editor.types";

export interface NodeModelOptions extends BaseModelOptions {
  color?: string;
  title?: string;
  content?: string;
  source?: boolean;
  inputs?: string[];
  outputs?: string[];
  patterns?: string[];
  message?: string[];
  starts_conversation?: boolean;
}

export class NodeModel extends StormNodeModel {
  color: string;
  title: string;
  content: string | undefined;
  source: boolean;
  inputs: string[];
  outputs: string[];
  patterns: string[];
  message: string[];
  starts_conversation?: boolean;

  constructor(options: NodeModelOptions = {}) {
    super({
      ...options,
      type: "ts-custom-node",
    });
    this.color = options.color || "White";
    this.title = options.title || "Node";
    this.content = options.content || undefined;
    this.source = options.source || false;
    this.inputs = options.inputs || [];
    this.outputs = options.outputs || [];
    this.patterns = options.patterns || [];
    this.message = options.message || [];
    this.starts_conversation = options.starts_conversation || false;

    this.addPort(
      new DefaultPortModel({
        in: true,
        name: BlockPorts.inPort,
      }),
    );
    this.addPort(
      new DefaultPortModel({
        name: BlockPorts.nextBlocksOutPort,
        in: false,
        type: "next",
      }),
    );
    this.addPort(
      new DefaultPortModel({
        name: BlockPorts.attachmentOutPort,
        in: false,
        type: "attached",
        maximumLinks: 1,
      }),
    );
  }

  serialize() {
    return {
      ...super.serialize(),
      color: this.color,
      title: this.title,
      content: this.content,
      source: this.source,
      inputs: this.inputs,
      outputs: this.outputs,
      patterns: this.patterns,
      message: this.message,
      starts_conversation: this.starts_conversation,
    };
  }

  deserialize(event): void {
    super.deserialize(event);
    this.color = event.data.color;
    this.title = event.data.title;
    this.content = event.data.content;
    this.source = event.data.source;
    this.inputs = event.data.inputs;
    this.outputs = event.data.outputs;
    this.patterns = event.data.patterns;
    this.message = event.data.message;
    this.starts_conversation = event.data.starts_conversation;
  }
}
