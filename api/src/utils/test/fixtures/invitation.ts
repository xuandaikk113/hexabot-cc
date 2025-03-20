/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { Invitation, InvitationModel } from '@/user/schemas/invitation.schema';
import { hash } from '@/user/utilities/hash';

import { getFixturesWithDefaultValues } from '../defaultValues';
import { TFixtures } from '../types';

import { installRoleFixtures } from './role';

const invitations: TFixtures<Invitation>[] = [
  {
    email: 'email@test.com',
    roles: ['0'],
    token: hash('testtoken'),
  },
];

export const invitationsFixtures = getFixturesWithDefaultValues({
  fixtures: invitations,
});

export const installInvitationFixtures = async () => {
  const roles = await installRoleFixtures();
  const invitation = mongoose.model(
    InvitationModel.name,
    InvitationModel.schema,
  );
  const invitations = await invitation.insertMany(
    invitationsFixtures.map((invitationsFixture) => ({
      ...invitationsFixture,
      roles: roles
        .map((role) => role.id)
        .filter((_, index) =>
          invitationsFixture.roles.includes(index.toString()),
        ),
    })),
  );
  invitationsFixtures.forEach((invitationFixture, index) => {
    invitationFixture.roles = invitations[index].roles.map((role) =>
      role.toString(),
    );
  });
  return { roles, invitations };
};
