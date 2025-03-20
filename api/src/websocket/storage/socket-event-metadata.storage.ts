/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export class SocketEventMetadataStorage {
  private static metadata = new Map<string, any>();

  static addEventMetadata(
    target: any,
    propertyKey: string | symbol,
    metadata: any,
  ) {
    const key = target.constructor.name;
    if (!this.metadata.has(key)) {
      this.metadata.set(key, []);
    }
    this.metadata.get(key).push({ propertyKey, ...metadata });
  }

  static getMetadataFor(target: any): any[] {
    return this.metadata.get(target.constructor.name) || [];
  }
}
