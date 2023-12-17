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
import { LinearProgress } from "@mui/material";

interface IDatagridCCProps {
  defaultRowsPerPage?: number; // Never pass as state
  defaultRowsPerPageOptions?: (number | { label: string; value: number })[]; // Never pass as state
  columnscellsProps: IDatagridCell[];
  actions?: boolean;
  children: ReactNode;
  count: number;
}

export default function DatagridCC({ defaultRowsPerPage = 5, defaultRowsPerPageOptions = [5, 10, 20], columnscellsProps, children, count, actions }: IDatagridCCProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const [page, setPage] = useState(Number(params.get("page")) || 0);
  const [rowsPerPage, setRowsPerPage] = useState(Number(params.get("limit")) || defaultRowsPerPage);
  const [ loading, setLoading ] = useState(true);

  const handleChangePage = (event: unknown, newPage: number) => {    
    setPage(newPage);
    setLoading(true);
    params.set("page", newPage.toString());
    replace(`${pathname}?${params.toString()}`);    
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setLoading(true);
    params.set("limit", event.target.value);
    replace(`${pathname}?limit=${event.target.value}`);    
  };

  useEffect(()=> {
    setLoading(false)
  }, [children])

  const headerHeight = 56.4;
  const rowHeight = 40.8;
  const tableMaxHeight = 10 * rowHeight + headerHeight

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: rowsPerPage * rowHeight + headerHeight, maxHeight: tableMaxHeight }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columnscellsProps.map(({ caption, columnProps }, i) => (
                <TableCell key={`column-${i}`} style={{ backgroundColor: "black", color: "white", position: "sticky", top: 0, zIndex: 1 }} {...columnProps}>
                  {caption}
                </TableCell>
              ))}
              {actions && <TableCell style={{ backgroundColor: "black", color: "white", position: "sticky", top: 0, zIndex: 1 }}>Ações</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {children}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <LinearProgress />}
      <TablePagination
        rowsPerPageOptions={defaultRowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
