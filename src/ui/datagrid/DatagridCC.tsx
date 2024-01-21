"use client";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
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
import { LinearProgress } from "@mui/material";
import DatagridSearch from "./DatagridSearchCC";
import DatagridLookupSearch from "./DatagridLookupSearch";
import { useDatagridContext } from "./DatagridContext";

interface IDatagridCCProps<T> {
  defaultRowsPerPage?: number; // Never pass as state
  defaultRowsPerPageOptions?: number[]; // Never pass as state
  columnscellsProps: IDatagridCell<T>[];
  actions?: boolean;
  children: ReactNode;
  count: number;
}

export default function DatagridCC<T>({ defaultRowsPerPage = 5, defaultRowsPerPageOptions = [5, 10, 20], columnscellsProps, children, count, actions }: IDatagridCCProps<T>) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pathname = usePathname();
  const { page, setPage, loading, setLoading } = useDatagridContext();

  const queryLimitOrDefault = Number(params.get("limit")) || defaultRowsPerPage;
  if (!defaultRowsPerPageOptions.includes(queryLimitOrDefault)) {
    defaultRowsPerPageOptions.push(queryLimitOrDefault);
    defaultRowsPerPageOptions.sort((a, b) => a - b);
  }
  const [rowsPerPage, setRowsPerPage] = useState(queryLimitOrDefault);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setLoading(true);
    params.set("page", (newPage + 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);    
    setLoading(true);
    setPage(0);
    params.set("page", "1");
    params.set("limit", event.target.value);    
    replace(`${pathname}?${params.toString()}`);
  };
 
  useEffect(() => {
    setLoading(false);
  }, [children]);

  // Problem: filter any, click to Link Ticker, stay loading
  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    if (p.size == 0) {
      if (page > 0 || rowsPerPage !== defaultRowsPerPage) {
        setPage(0);
        setRowsPerPage(defaultRowsPerPage);
      }      
    }
  }, [searchParams]); // Não escutar outras variaveis de estado, pois searchParams sempre atrasado

  const headerHeight = 99.6;
  const rowHeight = 40.8;
  const tableMaxHeight = 10 * rowHeight + headerHeight;

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
              {columnscellsProps.map(({ source, label, type, columnProps, lookup }, i) => (
                <TableCell
                  key={`column-${i}`}
                  //align={numeric ? 'right' : 'left'}
                  //backgroundColor: "gray",
                  sx={{ backgroundColor: "white", fontSize: "18px", fontWeight: "bold", position: "sticky", top: 0, zIndex: 1 }}
                  {...columnProps}
                >
                  {
                    lookup ?
                      <DatagridLookupSearch {...{ label, type, source, lookup }} /> :
                      <DatagridSearch {...{ label, type, source }} />}
                </TableCell>
              ))}
              {actions && <TableCell sx={{ backgroundColor: "white", fontSize: "18px", fontWeight: "bold", position: "sticky", top: 0, zIndex: 1 }}>Ações</TableCell>}
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
