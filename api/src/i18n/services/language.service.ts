/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { LoggerService } from '@/logger/logger.service';
import {
    DEFAULT_LANGUAGE_CACHE_KEY,
    LANGUAGES_CACHE_KEY,
} from '@/utils/constants/cache';
import { Cacheable } from '@/utils/decorators/cacheable.decorator';
import { BaseService } from '@/utils/generics/base-service';

import { LanguageDto } from '../dto/language.dto';
import { LanguageRepository } from '../repositories/language.repository';
import { Language } from '../schemas/language.schema';

@Injectable()
export class LanguageService extends BaseService<
  Language,
  never,
  never,
  LanguageDto
> {
  constructor(
    readonly repository: LanguageRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly logger: LoggerService,
  ) {
    super(repository);
  }

  /**
   * Retrieves all available languages from the repository.
   *
   * @returns A promise that resolves to an object where each key is a language code
   * and the corresponding value is the `Language` object.
   */
  @Cacheable(LANGUAGES_CACHE_KEY)
  async getLanguages() {
    const languages = await this.findAll();
    return languages.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.code]: curr,
      };
    }, {});
  }

  /**
   * Retrieves the default language from the repository.
   *
   * @returns A promise that resolves to the default `Language` object.
   */
  @Cacheable(DEFAULT_LANGUAGE_CACHE_KEY)
  async getDefaultLanguage() {
    const defaultLanguage = await this.findOne({ isDefault: true });
    if (!defaultLanguage) {
      throw new InternalServerErrorException(
        'Default language not found: getDefaultLanguage()',
      );
    }
    return defaultLanguage;
  }

  /**
   * Retrieves the language by code.
   *
   * @returns A promise that resolves to the `Language` object.
   */
  async getLanguageByCode(code: string) {
    const language = await this.findOne({ code });

    if (!language) {
      this.logger.warn(`Unable to Language by languageCode ${code}`);
      throw new NotFoundException(
        `Language with languageCode ${code} not found`,
      );
    }

    return language;
  }
}
