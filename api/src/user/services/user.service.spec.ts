/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { AttachmentRepository } from '@/attachment/repositories/attachment.repository';
import { AttachmentModel } from '@/attachment/schemas/attachment.schema';
import { AttachmentService } from '@/attachment/services/attachment.service';
import { LoggerService } from '@/logger/logger.service';
import { IGNORED_TEST_FIELDS } from '@/utils/test/constants';
import { installPermissionFixtures } from '@/utils/test/fixtures/permission';
import { userFixtures } from '@/utils/test/fixtures/user';
import { getPageQuery } from '@/utils/test/pagination';
import {
    closeInMongodConnection,
    rootMongooseTestModule,
} from '@/utils/test/test';

import { InvitationRepository } from '../repositories/invitation.repository';
import { PermissionRepository } from '../repositories/permission.repository';
import { RoleRepository } from '../repositories/role.repository';
import { UserRepository } from '../repositories/user.repository';
import { InvitationModel } from '../schemas/invitation.schema';
import { PermissionModel } from '../schemas/permission.schema';
import { Role, RoleModel } from '../schemas/role.schema';
import { User, UserFull, UserModel } from '../schemas/user.schema';

import { PermissionService } from './permission.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let roleRepository: RoleRepository;
  let userRepository: UserRepository;
  let user: User | null;
  let allRoles: Role[];
  const FIELDS_TO_IGNORE: string[] = [
    ...IGNORED_TEST_FIELDS,
    'password',
    'language',
    'resetCount',
    'sendEmail',
    'state',
    'timezone',
    'resetToken',
    'provider',
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(installPermissionFixtures),
        MongooseModule.forFeature([
          UserModel,
          PermissionModel,
          RoleModel,
          InvitationModel,
          AttachmentModel,
        ]),
      ],
      providers: [
        LoggerService,
        UserService,
        AttachmentService,
        AttachmentRepository,
        UserRepository,
        PermissionService,
        RoleService,
        RoleRepository,
        InvitationRepository,
        PermissionRepository,
        EventEmitter2,
        {
          provide: CACHE_MANAGER,
          useValue: {
            del: jest.fn(),
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    roleRepository = module.get<RoleRepository>(RoleRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    user = await userRepository.findOne({ username: 'admin' });
    allRoles = await roleRepository.findAll();
  });

  afterAll(closeInMongodConnection);

  afterEach(jest.clearAllMocks);

  describe('findOneAndPopulate', () => {
    it('should find one user and populate its role', async () => {
      jest.spyOn(userRepository, 'findOneAndPopulate');
      const result = await userService.findOneAndPopulate(user!.id);
      expect(userRepository.findOneAndPopulate).toHaveBeenCalledWith(
        user!.id,
        undefined,
      );
      expect(result).toEqualPayload(
        {
          ...userFixtures.find(({ username }) => username === 'admin'),
          roles: allRoles.filter(({ id }) => user!.roles.includes(id)),
        },
        FIELDS_TO_IGNORE,
      );
    });
  });

  describe('findPageAndPopulate', () => {
    it('should find users, and for each user populate the corresponding roles', async () => {
      const pageQuery = getPageQuery<User>({ sort: ['_id', 'asc'] });
      jest.spyOn(userRepository, 'findPageAndPopulate');
      const allUsers = await userRepository.findAll();
      const result = await userService.findPageAndPopulate({}, pageQuery);
      const usersWithRoles = allUsers.reduce(
        (acc, { avatar: _avatar, roles: _roles, ...rest }) => {
          acc.push({
            ...rest,
            roles: allRoles.filter(({ id }) => user?.roles?.includes(id)),
            avatar: null,
          });
          return acc;
        },
        [] as UserFull[],
      );

      expect(userRepository.findPageAndPopulate).toHaveBeenCalledWith(
        {},
        pageQuery,
      );
      expect(result).toEqualPayload(usersWithRoles);
    });
  });
});
