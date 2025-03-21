/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import mongoose from 'mongoose';

import { MessageCreateDto } from '@/chat/dto/message.dto';
import { Message, MessageModel } from '@/chat/schemas/message.schema';

import { getFixturesWithDefaultValues } from '../defaultValues';
import { TFixturesDefaultValues } from '../types';

import { installSubscriberFixtures } from './subscriber';

const messages: MessageCreateDto[] = [
  {
    mid: 'mid-1',
    sender: '1',
    recipient: '1',
    sentBy: '0',
    message: { text: 'Hello from the past' },
    read: true,
    delivery: true,
    createdBy: '0',
  },
  {
    mid: 'mid-2',
    sender: '1',
    recipient: '1',
    sentBy: '0',
    message: { text: 'Hello' },
    delivery: true,
    createdBy: '0',
  },
  {
    mid: 'mid-3',
    sender: '1',
    recipient: '1',
    sentBy: '0',
    message: { text: 'Hello back' },
    createdBy: '0',
  },
];

export const messageDefaultValues: TFixturesDefaultValues<Message> = {
  read: false,
  delivery: false,
  handover: false,
  createdAt: new Date('2024-01-01T00:00:00.00Z'),
};

export const messageFixtures = getFixturesWithDefaultValues<Message>({
  fixtures: messages,
  defaultValues: messageDefaultValues,
});

export const installMessageFixtures = async () => {
  const { subscribers, users } = await installSubscriberFixtures();
  const Message = mongoose.model(MessageModel.name, MessageModel.schema);
  return await Message.insertMany(
    messageFixtures.map((m) => {
      return {
        ...m,
        sender: m.sender ? subscribers[parseInt(m.sender)].id : null,
        recipient: m.recipient ? subscribers[parseInt(m.recipient)].id : null,
        sentBy: m.sentBy ? users[parseInt(m.sentBy)].id : null,
        createdBy: m.createdBy ? users[parseInt(m.createdBy)].id : 'system',
      };
    }),
  );
};
