import { ReactNode } from "react";
import ITableData from "./ITableData";
import { TableBodyProps } from "@mui/material";

export default interface ITableBodyProps<T> extends Omit<TableBodyProps, "children">{
    children: (row:T, key: number) => ReactNode;
    tableDataProps: ITableData
}