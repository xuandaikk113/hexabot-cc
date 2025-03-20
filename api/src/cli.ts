/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import moduleAlias from 'module-alias';
import { CommandFactory } from 'nest-commander';

moduleAlias.addAliases({
  '@': __dirname,
});

import { HexabotModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(HexabotModule);
}

bootstrap();
