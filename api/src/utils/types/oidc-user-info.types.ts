/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export type UserInfo = {
  sub: string;
  email: string;
  preferred_username: string;
  given_name?: string;
  family_name?: string;
  roles?: string[];
};
