import { Paper, Table as MuiTable, TableContainer } from "@mui/material";
import ITableProps from "./interfaces/ITableProps";

export default function Table({ children, paginacao, paperProps, tableContainerProps, ...props }: ITableProps) {
  const { sx: sxPaper, ...restPaperProps } = paperProps ?? {};
  const { sx: sxTC, ...restTCProps } = tableContainerProps ?? {};
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", ...sxPaper }} {...restPaperProps}>
      <TableContainer sx={{ maxHeight: 440, ...sxTC }} {...restTCProps}>
        <MuiTable stickyHeader {...props}>
          {children}
        </MuiTable>
      </TableContainer>
      {paginacao}
    </Paper>
  );
}
