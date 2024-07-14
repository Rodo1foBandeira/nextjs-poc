import { PaperProps, TableContainerProps, TableProps } from "@mui/material";
import { ReactNode } from "react";

export default interface ITableProps  extends TableProps{
    paperProps?: Omit<PaperProps, "children">;
    tableContainerProps?: Omit<TableContainerProps, "children">;
    paginacao?: ReactNode;
}