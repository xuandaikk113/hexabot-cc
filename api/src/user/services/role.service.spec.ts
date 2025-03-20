/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { EventEmitter2 } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { installPermissionFixtures } from '@/utils/test/fixtures/permission';
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
import { Permission, PermissionModel } from '../schemas/permission.schema';
import { Role, RoleFull, RoleModel } from '../schemas/role.schema';
import { User, UserModel } from '../schemas/user.schema';

import { roleFixtures } from './../../utils/test/fixtures/role';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let roleService: RoleService;
  let roleRepository: RoleRepository;
  let permissionRepository: PermissionRepository;
  let userRepository: UserRepository;
  let role: Role;
  let users: User[];
  let permissions: Permission[];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(installPermissionFixtures),
        MongooseModule.forFeature([
          UserModel,
          PermissionModel,
          RoleModel,
          InvitationModel,
        ]),
      ],
      providers: [
        UserRepository,
        RoleService,
        RoleRepository,
        InvitationRepository,
        PermissionRepository,
        EventEmitter2,
      ],
    }).compile();
    roleService = module.get<RoleService>(RoleService);
    roleRepository = module.get<RoleRepository>(RoleRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    permissionRepository =
      module.get<PermissionRepository>(PermissionRepository);
    role = (await roleRepository.findOne({ name: 'admin' })) as Role;
    users = (await userRepository.findAll()).filter((user) =>
      user.roles.includes(role.id),
    );

    permissions = await permissionRepository.find({ role: role.id });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  afterEach(jest.clearAllMocks);

  describe('findOneAndPopulate', () => {
    it('should find one role and populate its permissions and users', async () => {
      jest.spyOn(roleRepository, 'findOneAndPopulate');
      const result = await roleService.findOneAndPopulate(role.id, undefined);
      expect(roleRepository.findOneAndPopulate).toHaveBeenCalledWith(
        role.id,
        undefined,
      );
      expect(result).toEqualPayload({
        ...roleFixtures.find(({ name }) => name == 'admin'),
        users,
        permissions,
      });
    });
  });

  describe('findPageAndPopulate', () => {
    it('should find roles, and for each role populate the corresponding permissions and users', async () => {
      const pageQuery = getPageQuery<Role>({ sort: ['_id', 'asc'] });
      jest.spyOn(roleRepository, 'findPageAndPopulate');
      const allRoles = await roleRepository.findAll();
      const allPermissions = await permissionRepository.findAll();
      const allUsers = await userRepository.findAll();
      const result = await roleService.findPageAndPopulate({}, pageQuery);
      const rolesWithPermissionsAndUsers = allRoles.reduce((acc, currRole) => {
        const roleWithPermissionsAndUsers = {
          ...currRole,
          permissions: allPermissions.filter((currPermission) => {
            return currPermission.role === currRole.id;
          }),
          users: allUsers.filter((currUser) => {
            return currUser.roles.includes(currRole.id);
          }),
        };
        acc.push(roleWithPermissionsAndUsers);
        return acc;
      }, [] as RoleFull[]);

      expect(roleRepository.findPageAndPopulate).toHaveBeenCalledWith(
        {},
        pageQuery,
      );
      expect(result).toEqualPayload(rolesWithPermissionsAndUsers);
    });
  });
});
