/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function idPlugin(schema, _options) {
  schema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id; // Map _id to id
      delete ret._id; // Remove _id
      delete ret.__v; // Remove version key
      return ret;
    },
    virtuals: true,
  });
}
