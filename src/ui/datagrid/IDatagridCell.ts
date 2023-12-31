import { TableCellProps } from "@mui/material";

export default interface IDatagridCell<T> {
    label: string,
    source: string,
    cellFormat?: (val:any) => any,
    cellFormatT?: (val:T) => any,
    columnProps?: TableCellProps,
    cellProps?: TableCellProps
}