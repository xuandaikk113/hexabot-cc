/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Grid, Paper } from "@mui/material";

import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslate";
import { PageHeader } from "@/layout/content/PageHeader";

import { ProfileForm } from "./profile";

export const Profile = () => {
  const { t } = useTranslate();
  const { user } = useAuth();

  return (
    <Grid container gap={3} flexDirection="column">
      <PageHeader icon={faUser} title={t("title.edit_my_account")} />
      <Paper sx={{ padding: 7 }}>
        {user ? <ProfileForm user={user} /> : null}
      </Paper>
    </Grid>
  );
};
