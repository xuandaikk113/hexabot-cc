/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useEffect } from "react";

import { useBroadcastChannel } from "../providers/BroadcastChannelProvider";

export const useSubscribeBroadcastChannel: ReturnType<
  typeof useBroadcastChannel
>["subscribe"] = (...props) => {
  const { subscribe } = useBroadcastChannel();

  useEffect(() => {
    subscribe(...props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe, ...props]);
};
