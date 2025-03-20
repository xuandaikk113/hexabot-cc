/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
