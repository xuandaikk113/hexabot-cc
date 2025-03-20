/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { NlpEntityCreateDto } from '../dto/nlp-entity.dto';

export const nlpEntityModels: NlpEntityCreateDto[] = [
  {
    name: 'intent',
    lookups: ['trait'],
    doc: `"intent" refers to the underlying purpose or goal that a piece of text aims to convey. Identifying the intent involves determining what action or response the text is prompting. For instance, in customer service chatbots, recognizing the intent behind a user's message, such as "book a flight" or "check account balance," is crucial to provide accurate and relevant responses`,
    builtin: true,
  },
];
