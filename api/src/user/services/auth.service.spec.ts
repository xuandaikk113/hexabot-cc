/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { AttachmentRepository } from '@/attachment/repositories/attachment.repository';
import { AttachmentModel } from '@/attachment/schemas/attachment.schema';
import { AttachmentService } from '@/attachment/services/attachment.service';
import { LoggerService } from '@/logger/logger.service';
import { installUserFixtures } from '@/utils/test/fixtures/user';
import {
    closeInMongodConnection,
    rootMongooseTestModule,
} from '@/utils/test/test';

import { InvitationRepository } from '../repositories/invitation.repository';
import { RoleRepository } from '../repositories/role.repository';
import { UserRepository } from '../repositories/user.repository';
import { InvitationModel } from '../schemas/invitation.schema';
import { PermissionModel } from '../schemas/permission.schema';
import { RoleModel } from '../schemas/role.schema';
import { UserModel } from '../schemas/user.schema';

import { AuthService } from './auth.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(installUserFixtures),
        MongooseModule.forFeature([
          UserModel,
          RoleModel,
          PermissionModel,
          InvitationModel,
          AttachmentModel,
        ]),
      ],
      providers: [
        LoggerService,
        AuthService,
        UserService,
        UserRepository,
        RoleService,
        RoleRepository,
        InvitationRepository,
        JwtService,
        EventEmitter2,
        AttachmentService,
        AttachmentRepository,
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jest.spyOn(userRepository, 'findOne');
  });

  afterAll(closeInMongodConnection);

  afterEach(jest.clearAllMocks);

  describe('validateUser', () => {
    const searchCriteria = { email: 'admin@admin.admin' };

    it('should successfully validate user with the correct password', async () => {
      const user = await userRepository.findOne(searchCriteria);
      const result = await authService.validateUser(
        'admin@admin.admin',
        'adminadmin',
      );
      expect(userRepository.findOne).toHaveBeenCalledWith(
        searchCriteria,
        {},
        undefined,
      );
      expect(result!.id).toBe(user!.id);
    });
    it('should not validate user if the provided password is incorrect', async () => {
      const result = await authService.validateUser(
        'admin@admin.admin',
        'randomPassword',
      );
      expect(userRepository.findOne).toHaveBeenCalledWith(
        searchCriteria,
        {},
        undefined,
      );
      expect(result).toBeNull();
    });

    it("should not validate user's password if the user does not exist", async () => {
      const result = await authService.validateUser(
        'admin2@admin.admin',
        'admin',
      );
      expect(userRepository.findOne).toHaveBeenCalledWith(
        {
          email: 'admin2@admin.admin',
        },
        {},
        undefined,
      );
      expect(result).toBeNull();
    });
  });
});
