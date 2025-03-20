/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@/utils/generics/base-repository';
import { TFilterQuery } from '@/utils/types/filter.types';

import {
    Invitation,
    INVITATION_POPULATE,
    InvitationDocument,
    InvitationFull,
    InvitationPopulate,
} from '../schemas/invitation.schema';
import { hash } from '../utilities/hash';

export class InvitationRepository extends BaseRepository<
  Invitation,
  InvitationPopulate,
  InvitationFull
> {
  constructor(
    readonly eventEmitter: EventEmitter2,
    @InjectModel(Invitation.name) readonly model: Model<Invitation>,
  ) {
    super(eventEmitter, model, Invitation, INVITATION_POPULATE, InvitationFull);
  }

  /**
   * Pre-create hook that hashes the token of the invitation before saving it to the database.
   *
   * @param _doc - The document instance that is about to be created.
   */
  async preCreate(_doc: InvitationDocument) {
    if (_doc?.token) {
      _doc.token = hash(_doc.token);
    } else {
      throw new Error('No token provided');
    }
  }

  /**
   * Builds the query used to find invitations, applying the hashed token to the filter
   * if a token is provided.
   *
   * @param filter - The filter object for querying invitations.
   *
   * @returns The query with the hashed token if a token was provided, otherwise the original query.
   */
  protected findQuery(filter: TFilterQuery<Invitation>) {
    const filterWithHashedToken = filter.token
      ? { ...filter, token: hash(filter.token.toString()) }
      : filter;
    return super.findQuery(filterWithHashedToken);
  }
}
