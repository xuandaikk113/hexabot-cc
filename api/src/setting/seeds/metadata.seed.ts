/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { MetadataRepository } from '../repositories/metadata.repository';
import { Metadata } from '../schemas/metadata.schema';

@Injectable()
export class MetadataSeeder extends BaseSeeder<Metadata> {
  constructor(private readonly metadataRepository: MetadataRepository) {
    super(metadataRepository);
  }
}
