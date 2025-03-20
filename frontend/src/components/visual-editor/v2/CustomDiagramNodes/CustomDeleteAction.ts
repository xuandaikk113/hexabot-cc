/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import {
    Action,
    ActionEvent,
    InputType,
} from "@projectstorm/react-canvas-core";

export interface CustomDeleteItemsActionOptions {
  keyCodes?: number[];
  callback?: (ids: string[], next: () => void) => void;
}
export class CustomDeleteItemsAction extends Action {
  constructor(options: CustomDeleteItemsActionOptions = {}) {
    options = {
      keyCodes: [46, 8],
      ...options,
    };
    super({
      type: InputType.KEY_DOWN,
      // @ts-ignore
      fire: (event: ActionEvent<React.KeyboardEvent>) => {
        if (options?.keyCodes?.indexOf(event.event.keyCode) !== -1) {
          const selectedEntities = this.engine.getModel().getSelectedEntities();

          if (selectedEntities.length > 0) {
            options.callback?.(
              selectedEntities.map((model) => model.getID()),
              () => {
                selectedEntities.forEach((model) => {
                  model.setLocked(false);
                  model.remove();
                });

                this.engine.repaintCanvas();
              },
            );
          }
        }
      },
    });
  }
}
