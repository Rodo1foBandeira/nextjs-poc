import TableBodySC from "@/ui/tables/TableBodySC";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { Suspense } from "react";
import TablePaginationSC from "../../../ui/tables/TablePaginationSC";
import { headers } from "next/headers";
import ITableData from "@/ui/tables/interfaces/ITableData";
import TablePagination from "@/ui/tables/TablePagination";
import Table from "@/ui/tables/Table";
import Skeleton from "@/ui/utils/Skeleton";
import ITicker from "@/models/ITicker";
import { filterSearchParamsByPrefix } from "@/lib/utils/queryParameters";

export default async function TablePetr4() {
  const table: ITableData = { id: "table2", urlPath: "/b3api/Ticker('PETR4')" };
  const heads = headers();
  const urlParams = heads.get("searchParams") ?? "";
  const searchParams = filterSearchParamsByPrefix(urlParams, table.id);
  const lastCount = searchParams.get(table.id + "_last_count") ? Number(searchParams.get(table.id + "_last_count")) : 0;
  return (
    <>
      <h1>PETR4</h1>
      <Table
        paginacao={
          <Suspense key={searchParams.toString()} fallback={<TablePagination id={table.id} disabled count={lastCount} />}>
            <TablePaginationSC tableDataProps={{ ...table }} />
          </Suspense>
        }
      >
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Fechamento</TableCell>
          </TableRow>
        </TableHead>
        <Suspense key={searchParams.toString()} fallback={<Skeleton sx={{ width: "100vh" }} height={52.81} repeat={5} />}>
          <TableBodySC<ITicker> tableDataProps={{ ...table }}>
            {(row, key) => (
              <TableRow key={key}>
                <TableCell>{row.data}</TableCell>
                <TableCell>{row.fechamento}</TableCell>
              </TableRow>
            )}
          </TableBodySC>
        </Suspense>
      </Table>
    </>
  );
}
