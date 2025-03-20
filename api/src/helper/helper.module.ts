/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { InjectDynamicProviders } from 'nestjs-dynamic-providers';

import { NlpModule } from '@/nlp/nlp.module';

import { HelperController } from './helper.controller';
import { HelperService } from './helper.service';

@Global()
@InjectDynamicProviders(
  // Core & under dev helpers
  'dist/extensions/**/*.helper.js',
  // Community extensions installed via npm
  'dist/.hexabot/contrib/extensions/helpers/**/*.helper.js',
  // Custom extensions under dev
  'dist/.hexabot/custom/extensions/helpers/**/*.helper.js',
)
@Module({
  imports: [HttpModule, NlpModule],
  controllers: [HelperController],
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}
