import Ativo from "@/models/Ativo";
import TableBodySC from "@/ui/tables/TableBodySC";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { Suspense } from "react";
import TablePaginationSC from "../../../ui/tables/TablePaginationSC";
import { headers } from "next/headers";
import ITableData from "@/ui/tables/interfaces/ITableData";
import TablePagination from "@/ui/tables/TablePagination";
import Table from "@/ui/tables/Table";
import Skeleton from "@/ui/utils/Skeleton";
import { filterSearchParamsByPrefix } from "@/lib/utils/queryParameters";

export default async function TableAtivos() {
  const table: ITableData = { id: "table1", urlPath: "/b3api/Ativo" };
  const heads = headers();
  const urlParams = heads.get("searchParams") ?? "";
  const searchParams = filterSearchParamsByPrefix(urlParams, table.id);
  const lastCount = searchParams.get(table.id + "_last_count") ? Number(searchParams.get(table.id + "_last_count")) : 0;
  return (
    <>
      <h1>Ativos</h1>
      <Table
        paginacao={
          <Suspense key={searchParams.toString()} fallback={<TablePagination id={table.id} disabled count={lastCount} />}>
            <TablePaginationSC tableDataProps={{ ...table }} />
          </Suspense>
        }
      >
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Ticker</TableCell>
          </TableRow>
        </TableHead>
        <Suspense key={searchParams.toString()} fallback={<Skeleton sx={{ width: "100vh" }} height={52.81} repeat={5} />}>
          <TableBodySC<Ativo> tableDataProps={{ ...table }}>
            {(row, key) => (
              <TableRow key={key}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.ticker}</TableCell>
              </TableRow>
            )}
          </TableBodySC>
        </Suspense>
      </Table>
    </>
  );
}
