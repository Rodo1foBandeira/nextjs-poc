import { TableCellProps } from "@mui/material";

export default interface IDatagridCell {
    caption: string,
    source: string,
    cellFormat?: (val:any) => any,
    columnProps?: TableCellProps,
    cellProps?: TableCellProps
}