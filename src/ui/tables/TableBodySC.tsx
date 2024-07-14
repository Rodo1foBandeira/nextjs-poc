import { tableData } from "@/lib/actions";
import ITableRowsProps from "./interfaces/ITableBodyProps";
import { TableBody } from "@mui/material";

export default async function TableBodySC<T>({ children, tableDataProps, ...props } : ITableRowsProps<T>) {
    const { data } = await tableData<T>(
        { ...tableDataProps }
      );
    return (
      <TableBody {...props}>
      { data.map((row, key) => children(row, key) ) }
      </TableBody>  
    );
}