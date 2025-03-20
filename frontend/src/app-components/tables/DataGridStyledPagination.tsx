/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

// This Custmization is taken from the MUI Documentation, to be able to match the functionality of the old UI
// https://mui.com/x/react-data-grid/components/#pagination

import {
    Pagination as MuiPagination,
    PaginationItem,
    PaginationItemProps,
    TablePaginationProps,
} from "@mui/material";
import {
    DataGridProps,
    GridFooter,
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";

import { theme } from "@/layout/themes/theme";

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      className={className}
      count={pageCount}
      showFirstButton
      showLastButton
      shape="rounded"
      renderItem={(props: PaginationItemProps) => (
        <PaginationItem
          {...props}
          sx={{
            ":is(.Mui-selected)": {
              fontWeight: "bold",
              color: theme.palette.primary.main,
            },

            ":hover": {
              color: theme.palette.primary.dark,
            },
          }}
        />
      )}
      page={page + 1}
      siblingCount={2}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function StyledPagination(props: any) {
  return (
    <GridPagination align="left" ActionsComponent={Pagination} {...props} />
  );
}

export const styledPaginationSlots: DataGridProps["slots"] = {
  pagination: StyledPagination,
  footer: (props: any) => {
    return <GridFooter sx={{ justifyContent: "start" }} {...props} />;
  },
};
