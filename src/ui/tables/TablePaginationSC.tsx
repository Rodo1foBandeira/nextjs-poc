import { tableData } from "@/lib/actions";
import ITablePaginationProps from "./interfaces/ITablePaginationProps";
import TablePagination from "./TablePagination";

export default async function TablePaginationSC({ tableDataProps, rowsPerPage = 5, ...props }: ITablePaginationProps) {
  const { count } = await tableData<unknown>({ ...tableDataProps });
  return (
    <TablePagination id={tableDataProps.id} count={count} {...props} />
  );
}
