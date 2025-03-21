/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Menu } from '../schemas/menu.schema';
import { AnyMenu, MenuTree, MenuType } from '../schemas/types/menu';

const verifyMenu = (
  menu: AnyMenu<Menu> & {
    call_to_actions?: MenuTree;
  },
) => {
  // first check if menu is an object
  if (typeof menu !== 'object') return false;
  // check essential menu fields
  if (typeof menu.title !== 'string') return false;
  if (menu.type === MenuType.postback && typeof menu.payload === 'string')
    return true;
  if (
    menu.type === MenuType.web_url &&
    typeof menu.url === 'string' &&
    new URL(menu.url)
  )
    return true;
  if (
    menu.type === MenuType.nested &&
    (menu.call_to_actions === undefined || Array.isArray(menu.call_to_actions))
  )
    return true;
};

export const verifyTree = (menuTree?: MenuTree) => {
  if (!Array.isArray(menuTree)) return true;
  return !menuTree.some((v) => {
    const valid = verifyMenu(v);
    if (valid && v.type === MenuType.nested) {
      return !verifyTree(v.call_to_actions);
    }
    return !valid;
  });
};
