import { TablePaginationBaseProps, TablePaginationOwnProps, TablePaginationProps } from "@mui/material";
import ITableData from "./ITableData";

export default interface ITablePaginationProps extends Omit<TablePaginationOwnProps, "id" | "count" | "onPageChange" | "page" | "rowsPerPage"> {
    tableDataProps: ITableData;
    rowsPerPage?: number;
}