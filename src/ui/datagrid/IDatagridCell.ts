import { TableCellProps } from "@mui/material";

export default interface IDatagridCell {
    caption: string,
    source: string,
    columnProps?: TableCellProps,
    cellProps?: TableCellProps
}