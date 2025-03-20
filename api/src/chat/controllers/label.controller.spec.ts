/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { AttachmentRepository } from '@/attachment/repositories/attachment.repository';
import { AttachmentModel } from '@/attachment/schemas/attachment.schema';
import { AttachmentService } from '@/attachment/services/attachment.service';
import { LoggerService } from '@/logger/logger.service';
import { InvitationRepository } from '@/user/repositories/invitation.repository';
import { RoleRepository } from '@/user/repositories/role.repository';
import { UserRepository } from '@/user/repositories/user.repository';
import { InvitationModel } from '@/user/schemas/invitation.schema';
import { PermissionModel } from '@/user/schemas/permission.schema';
import { RoleModel } from '@/user/schemas/role.schema';
import { UserModel } from '@/user/schemas/user.schema';
import { RoleService } from '@/user/services/role.service';
import { UserService } from '@/user/services/user.service';
import { NOT_FOUND_ID } from '@/utils/constants/mock';
import { IGNORED_TEST_FIELDS } from '@/utils/test/constants';
import { getUpdateOneError } from '@/utils/test/errors/messages';
import { labelFixtures } from '@/utils/test/fixtures/label';
import { installSubscriberFixtures } from '@/utils/test/fixtures/subscriber';
import { getPageQuery } from '@/utils/test/pagination';
import { sortRowsBy } from '@/utils/test/sort';
import {
    closeInMongodConnection,
    rootMongooseTestModule,
} from '@/utils/test/test';

import { LabelCreateDto, LabelUpdateDto } from '../dto/label.dto';
import { LabelRepository } from '../repositories/label.repository';
import { SubscriberRepository } from '../repositories/subscriber.repository';
import { Label, LabelModel } from '../schemas/label.schema';
import { SubscriberModel } from '../schemas/subscriber.schema';
import { LabelService } from '../services/label.service';
import { SubscriberService } from '../services/subscriber.service';

import { LabelController } from './label.controller';

describe('LabelController', () => {
  let labelController: LabelController;
  let labelService: LabelService;
  let label: Label;
  let labelToDelete: Label;
  let secondLabelToDelete: Label;
  let subscriberService: SubscriberService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [LabelController],
      imports: [
        rootMongooseTestModule(installSubscriberFixtures),
        MongooseModule.forFeature([
          LabelModel,
          UserModel,
          RoleModel,
          PermissionModel,
          SubscriberModel,
          InvitationModel,
          AttachmentModel,
        ]),
      ],
      providers: [
        LoggerService,
        LabelController,
        LabelService,
        LabelRepository,
        UserService,
        UserRepository,
        RoleService,
        RoleRepository,
        InvitationRepository,
        SubscriberService,
        SubscriberRepository,
        EventEmitter2,
        AttachmentService,
        AttachmentRepository,
      ],
    }).compile();
    labelService = module.get<LabelService>(LabelService);
    subscriberService = module.get<SubscriberService>(SubscriberService);
    labelController = module.get<LabelController>(LabelController);
    label = (await labelService.findOne({ name: 'TEST_TITLE_1' })) as Label;
    labelToDelete = (await labelService.findOne({
      name: 'TEST_TITLE_2',
    })) as Label;
    secondLabelToDelete = (await labelService.findOne({
      name: 'TEST_TITLE_3',
    })) as Label;
  });

  afterEach(jest.clearAllMocks);
  afterAll(closeInMongodConnection);

  describe('count', () => {
    it('should count labels', async () => {
      jest.spyOn(labelService, 'count');
      const result = await labelController.filterCount();

      expect(labelService.count).toHaveBeenCalled();
      expect(result).toEqual({ count: labelFixtures.length });
    });
  });

  describe('findPage', () => {
    const pageQuery = getPageQuery<Label>();
    it('should find labels', async () => {
      jest.spyOn(labelService, 'find');
      const result = await labelController.findPage(pageQuery, [], {});
      const labelsWithBuiltin = labelFixtures.map((labelFixture) => ({
        ...labelFixture,
      }));

      expect(labelService.find).toHaveBeenCalledWith({}, pageQuery);
      expect(result).toEqualPayload(labelsWithBuiltin.sort(sortRowsBy), [
        ...IGNORED_TEST_FIELDS,
        'nextBlocks',
      ]);
    });

    it('should find labels, and foreach label populate its corresponding users', async () => {
      jest.spyOn(labelService, 'findAndPopulate');
      const result = await labelController.findPage(pageQuery, ['users'], {});
      const allLabels = await labelService.findAll();
      const allSubscribers = await subscriberService.findAll();
      const labelsWithUsers = allLabels.map((label) => ({
        ...label,
        users: allSubscribers,
      }));

      expect(labelService.findAndPopulate).toHaveBeenCalledWith({}, pageQuery);
      expect(result).toEqualPayload(labelsWithUsers.sort(sortRowsBy));
    });
  });

  describe('findOne', () => {
    it('should find one label by id', async () => {
      jest.spyOn(labelService, 'findOne');
      const result = await labelController.findOne(label.id, []);

      expect(labelService.findOne).toHaveBeenCalledWith(label.id);
      expect(result).toEqualPayload(
        {
          ...labelFixtures.find(({ name }) => name === label.name),
        },
        [...IGNORED_TEST_FIELDS, 'nextBlocks'],
      );
    });

    it('should find one label by id, and populate its corresponding users', async () => {
      jest.spyOn(labelService, 'findOneAndPopulate');
      const result = await labelController.findOne(label.id, ['users']);
      const users = await subscriberService.findAll();

      expect(labelService.findOneAndPopulate).toHaveBeenCalledWith(label.id);
      expect(result).toEqualPayload(
        {
          ...labelFixtures.find(({ name }) => name === label.name),
          users,
        },
        [...IGNORED_TEST_FIELDS, 'nextBlocks'],
      );
    });
  });

  describe('create', () => {
    it('should create a label', async () => {
      jest.spyOn(labelService, 'create');
      const labelCreate: LabelCreateDto = {
        title: 'Label2',
        name: 'LABEL_2',
        label_id: {
          messenger: 'messenger',
          web: 'web',
          twitter: 'twitter',
          dimelo: 'dimelo',
        },
        description: 'LabelDescription2',
      };
      const result = await labelController.create(labelCreate);

      expect(labelService.create).toHaveBeenCalledWith(labelCreate);
      expect(result).toEqualPayload({ ...labelCreate, builtin: false });
    });
  });

  describe('deleteOne', () => {
    it('should delete one label by id', async () => {
      jest.spyOn(labelService, 'deleteOne');
      const result = await labelController.deleteOne(labelToDelete.id);

      expect(labelService.deleteOne).toHaveBeenCalledWith(labelToDelete.id);
      expect(result).toEqual({
        acknowledged: true,
        deletedCount: 1,
      });
    });

    it('should throw a NotFoundException when attempting to delete a non existing label by id', async () => {
      await expect(labelController.deleteOne(labelToDelete.id)).rejects.toThrow(
        new NotFoundException(`Label with ID ${labelToDelete.id} not found`),
      );
    });
  });

  describe('updateOne', () => {
    const labelUpdateDto: LabelUpdateDto = {
      description: 'test description 1',
    };
    it('should update a label by id', async () => {
      jest.spyOn(labelService, 'updateOne');
      const result = await labelController.updateOne(label.id, labelUpdateDto);

      expect(labelService.updateOne).toHaveBeenCalledWith(
        label.id,
        labelUpdateDto,
      );
      expect(result).toEqualPayload(
        {
          ...labelFixtures.find(({ name }) => name === label.name),
          ...labelUpdateDto,
        },
        [...IGNORED_TEST_FIELDS, 'nextBlocks'],
      );
    });

    it('should throw a NotFoundException when attempting to update a non existing label by id', async () => {
      await expect(
        labelController.updateOne(labelToDelete.id, labelUpdateDto),
      ).rejects.toThrow(getUpdateOneError(Label.name, labelToDelete.id));
    });
  });

  describe('deleteMany', () => {
    it('should delete multiple labels', async () => {
      const valuesToDelete = [label.id, secondLabelToDelete.id];

      const result = await labelController.deleteMany(valuesToDelete);

      expect(result.deletedCount).toEqual(valuesToDelete.length);
      const remainingValues = await labelService.find({
        _id: { $in: valuesToDelete },
      });
      expect(remainingValues.length).toBe(0);
    });

    it('should throw BadRequestException when no IDs are provided', async () => {
      await expect(labelController.deleteMany([])).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException when provided IDs do not exist', async () => {
      const nonExistentIds = [NOT_FOUND_ID, NOT_FOUND_ID.replace(/9/g, '8')];

      await expect(labelController.deleteMany(nonExistentIds)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
