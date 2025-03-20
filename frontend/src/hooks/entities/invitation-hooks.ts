/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { useMutation } from "react-query";

import { TMutationOptions } from "@/services/types";
import {
    IInvitation,
    IInvitationAttributes,
    IInvitationStub,
} from "@/types/invitation.types";

import { useApiClient } from "../useApiClient";

export const useSendInvitation = (
  options?: Omit<
    TMutationOptions<IInvitationStub, Error, IInvitationAttributes, unknown>,
    "mutationFn"
  >,
) => {
  const { apiClient } = useApiClient();

  return useMutation<IInvitation, Error, IInvitationAttributes>({
    ...options,
    async mutationFn(payload: IInvitationAttributes) {
      return await apiClient.invite(payload);
    },
  });
};
