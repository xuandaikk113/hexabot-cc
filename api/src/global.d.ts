/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import '../types/event-emitter';
import '../types/express-session';

declare global {
  type HyphenToUnderscore<S extends string> = S extends `${infer P}-${infer Q}`
    ? `${P}_${HyphenToUnderscore<Q>}`
    : S;
}

// eslint-disable-next-line prettier/prettier
export { };

