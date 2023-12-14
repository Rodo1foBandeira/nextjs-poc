"use client";
import { useState, ChangeEvent, ReactNode, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IDatagridCell from "./IDatagridCell";
import { listar } from "@/app/actions";
import { Box, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import Entity from "@/models/Entity";
import { usePathname } from "next/navigation";

interface IDatagridCCProps<T> {
  defaultRowsPerPage?: number; // Never pass as state
  defaultRowsPerPageOptions?: (number | { label: string; value: number })[]; // Never pass as state
  columnsRowsProps: IDatagridCell[];
  keySource: string;
  actions?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
  };
  url: string; // Não pode ter "?"
  aditionalQueryParams?: string; // Inicie com "&"
}

export default function DatagridCC<T>({ defaultRowsPerPage = 5, defaultRowsPerPageOptions = [5, 10, 20], columnsRowsProps, url, aditionalQueryParams, actions, keySource }: IDatagridCCProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const doFetch = async (fullUrl: string) => {
    setLoading(true);
    const response = await listar<T>(fullUrl);
    setData(response.data);
    setCount(response.count);
    setLoading(false);
  };

  useEffect(() => {
    // Todo: Este datagrid será abstrato, terá filtro na propria coluna,
    // esses filtros seram queryParameters que seram passados na fullUrl
    // do server action listar
    doFetch(`${url}?offset=${page * rowsPerPage}&limit=${rowsPerPage}`);
  }, [page, rowsPerPage, aditionalQueryParams]);

  const Actions = ({ row }: {row: T}) => {
    if (actions) {
      let buttons: ReactNode[] = [];
      if (actions.view)
        buttons.push(
          <Link href={`${pathname}/${(row as any)[keySource]}`}>
            <IconButton color="secondary" aria-label="view">
              <VisibilityIcon />
            </IconButton>
          </Link>
        );
      if (actions.edit)
        buttons.push(
          <Link href={`${pathname}/${(row as any)[keySource]}`}>
            <IconButton color="secondary" aria-label="edit">
              <CreateIcon />
            </IconButton>
          </Link>
        );
      if (actions.delete)
        buttons.push(
          <IconButton color="secondary" aria-label="edit">
            <DeleteIcon />
          </IconButton>
        );
      return <TableCell>{buttons}</TableCell>;
    }
  };

  const Rows = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={12} style={{ borderBottom: "none" }}>
            <Box>
              <CircularProgress />
            </Box>
          </TableCell>
        </TableRow>
      );
    } else if (data.length == 0) {
      return (
        <TableRow>
          <TableCell colSpan={12} align="center" style={{ borderBottom: "none" }}>
            <h1>Sem dados</h1>
          </TableCell>
        </TableRow>
      );
    }
    return data.map((row, ri) => (
      <TableRow key={`row-${ri}`}>
        {columnsRowsProps.map(({ source, rowProps }, ci) => (
          <TableCell key={`row-${ri}-column-${ci}`} {...rowProps}>
            {(row as any)[source]}
          </TableCell>
        ))}
        <Actions row={row} />
      </TableRow>
    ));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: rowsPerPage * 66, maxHeight: 500 }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columnsRowsProps.map(({ caption, columnProps }, i) => (
                <TableCell key={`column-${i}`} style={{ backgroundColor: "black", color: "white", position: "sticky", top: 0, zIndex: 1 }} {...columnProps}>
                  {caption}
                </TableCell>
              ))}
              {actions && (
                <TableCell style={{ backgroundColor: "black", color: "white", position: "sticky", top: 0, zIndex: 1 }}>
                  Ações
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <Rows />
          </TableBody>
        </Table>
      </TableContainer>
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
