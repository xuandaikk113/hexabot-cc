/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ChannelEvent } from '@/channel/lib/EventWrapper';
import { BlockCreateDto } from '@/chat/dto/block.dto';
import { Block } from '@/chat/schemas/block.schema';
import { Conversation } from '@/chat/schemas/conversation.schema';
import { SettingCreateDto } from '@/setting/dto/setting.dto';

export type PluginName = `${string}-plugin`;

export enum PluginType {
  event = 'event',
  block = 'block',
}

export interface CustomBlocks {}

type BlockAttrs = Partial<BlockCreateDto> & { name: string };

export type PluginSetting = Omit<SettingCreateDto, 'weight'>;

export type PluginBlockTemplate = Omit<
  BlockAttrs,
  'message' | 'position' | 'builtin' | 'attachedBlock'
>;

export type PluginEffects = {
  onStoreContextData?: (
    convo: Conversation,
    nextBlock: Block,
    event: ChannelEvent,
    captureVars: any,
  ) => void;
};
