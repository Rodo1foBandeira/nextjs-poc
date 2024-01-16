"use client";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
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

  
  const _page = Number(params.get("page"));
  const [page, setPage] = useState(_page ? _page - 1 : 0);
  const paginas = Number(params.get("limit")) || defaultRowsPerPage;
  if (!defaultRowsPerPageOptions.includes(paginas)) {
    defaultRowsPerPageOptions.push(paginas);
    defaultRowsPerPageOptions.sort((a, b) => a - b);
  }
  const [rowsPerPage, setRowsPerPage] = useState(paginas);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setLoading(true);
    params.set("page", (newPage + 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setLoading(true);
    params.set("limit", event.target.value);
    const paginas = Math.ceil(count / +event.target.value);
    if (page > paginas) {
      setPage(paginas - 1);
      params.set("page", paginas.toString());
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setLoading(false);
  }, [children]);

  // Problema: filtrar, clicar no Link Ticker, fica carregando
  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    if (p.size == 0 && (page > 0 || rowsPerPage !== defaultRowsPerPage)) {
      setPage(0);
      setRowsPerPage(defaultRowsPerPage);
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
              {columnscellsProps.map(({ source, label, type, columnProps }, i) => (
                <TableCell
                  key={`column-${i}`}
                  //align={numeric ? 'right' : 'left'}
                  //backgroundColor: "gray",
                  sx={{ backgroundColor: "white", fontSize: "18px", fontWeight: "bold", position: "sticky", top: 0, zIndex: 1 }}
                  {...columnProps}                  
                >
                  <DatagridSearch
                    {...{ label, type, source, setLoading }}
                  />
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
