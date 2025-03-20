/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Controller, Get, Param } from '@nestjs/common';

import { Roles } from '@/utils/decorators/roles.decorator';

import { HelperService } from './helper.service';
import { HelperType } from './types';

@Controller('helper')
export class HelperController {
  constructor(private readonly helperService: HelperService) {}

  /**
   * Retrieves a list of helpers.
   *
   * @returns An array of objects containing the name of each NLP helper.
   */
  @Roles('public')
  @Get(':type')
  getHelpers(@Param('type') type: HelperType) {
    return this.helperService.getAllByType(type).map((helper) => {
      return {
        name: helper.getName(),
      };
    });
  }
}
