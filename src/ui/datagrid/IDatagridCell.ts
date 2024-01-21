import { TableCellProps } from "@mui/material";

export interface IDatagridLookup {
    value: string | number;
    label: string;
}

export default interface IDatagridCell<T> {
    label: string,
    source: string,
    type: 'string' | 'number' | 'date',
    lookup?: IDatagridLookup[]
    cellFormat?: (val:any) => any,
    cellFormatT?: (val:T) => any,
    columnProps?: TableCellProps,
    cellProps?: TableCellProps
}