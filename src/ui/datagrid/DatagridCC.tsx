"use client";
import { ChangeEvent, ReactNode, Suspense, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IDatagridCell from "./IDatagridCell";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, LinearProgress, Tooltip } from "@mui/material";
import { SortDirection } from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

interface IDatagridCCProps<T> {
  defaultRowsPerPage?: number; // Never pass as state
  defaultRowsPerPageOptions?: (number | { label: string; value: number })[]; // Never pass as state
  columnscellsProps: IDatagridCell<T>[];
  actions?: boolean;
  children: ReactNode;
  count: number;
}

interface IOrder {
  column: string;
  sortDirection: SortDirection;
}

export default function DatagridCC<T>({ defaultRowsPerPage = 5, defaultRowsPerPageOptions = [5, 10, 20], columnscellsProps, children, count, actions }: IDatagridCCProps<T>) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pathname = usePathname();

  const [order, setOrder] = useState<IOrder>();
  const [page, setPage] = useState(Number(params.get("page")) || 0);
  const [rowsPerPage, setRowsPerPage] = useState(Number(params.get("limit")) || defaultRowsPerPage);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setLoading(true);
    params.set("page", (newPage + 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setLoading(true);
    params.set("limit", event.target.value);
    replace(`${pathname}?limit=${event.target.value}`);
  };

  useEffect(() => {
    setLoading(false);
  }, [children]);

  const headerHeight = 57.34;
  const rowHeight = 40.8;
  const tableMaxHeight = 10 * rowHeight + headerHeight;

  const toggleSortDirection = (column: string) => {
    let sortDirection: SortDirection;
    if (order && order.column === column) {
      sortDirection = order.sortDirection === "asc" ? "desc" : "asc";
      setOrder({ column, sortDirection });
    } else {
      sortDirection = "asc";
      setOrder({ column, sortDirection });
    }
    setLoading(true);
    params.set("orderBy", `${column}.${sortDirection}`);
    replace(`${pathname}?${params.toString()}`);
  };

  const buttonsPaginationLabel = {
    first: "Primeira página",
    last: "Ultima página",
    next: "Proxima página",
    previous: "Página anterior",
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: rowsPerPage * rowHeight + headerHeight, maxHeight: tableMaxHeight }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columnscellsProps.map(({ source, label, columnProps }, i) => (
                <TableCell
                  key={`column-${i}`}
                  //align={numeric ? 'right' : 'left'}
                  style={{ backgroundColor: "gray", fontSize: "18px", fontWeight: "bold", position: "sticky", top: 0, zIndex: 1 }}
                  {...columnProps}
                  //padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={order && order.column == source ? order.sortDirection : false}
                >
                  <Tooltip title={order && order.column === source ? (order.sortDirection === "desc" ? "Ordenação Decrescente" : "Ordenação Ascendente") : "Clique para ordenar"} arrow>
                    <TableSortLabel
                      active={order && order.column == source}
                      direction={order && order.column == source && order.sortDirection ? order.sortDirection : "asc"}
                      onClick={() => toggleSortDirection(source)}
                      aria-label={order && order.column == source ? (order.sortDirection === "desc" ? "Decrescente" : "Ascendente") : ""}
                    >
                      {label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ))}
              {actions && <TableCell style={{ backgroundColor: "gray", fontSize: "18px", fontWeight: "bold", position: "sticky", top: 0, zIndex: 1 }}>Ações</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      {loading && <LinearProgress />}
      <TablePagination
        rowsPerPageOptions={defaultRowsPerPageOptions}
        component="div"
        labelRowsPerPage="Registros por pagina"
        labelDisplayedRows={({ page }) => `Pagina ${page + 1}/${Math.ceil(count / rowsPerPage)} (${count} registros)`}
        showFirstButton
        showLastButton
        getItemAriaLabel={(type) => buttonsPaginationLabel[type]}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
