"use client";
import { TablePagination as MuiTablePagination, TablePaginationBaseProps, TablePaginationOwnProps, TablePaginationProps } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect } from "react";

interface ITablePaginatioProps extends Omit<TablePaginationOwnProps, "onPageChange" | "page" | "rowsPerPage" >{
    defaultRowsPerPage?: number;
}

export default function TablePagination({ id, count, defaultRowsPerPage = 5, ...props } : ITablePaginatioProps) {
  const searchParams = useSearchParams();

  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChangePage = (event: unknown, newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(id + "_page", (newPage + 1).toString());
    params.set(id + "_last_count", count.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set(id + "_page", "1");
    params.set(id + "_limit", event.target.value);
    params.set(id + "_last_count", count.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const buttonsPaginationLabel = {
    first: "Primeira página",
    last: "Ultima página",
    next: "Proxima página",
    previous: "Página anterior",
  };

  const params = new URLSearchParams(searchParams);
  const rowsPerPage = params.get(id + "_limit") ? Number(params.get(id + "_limit")) : defaultRowsPerPage;
  const page = params.get(id + "_page") ? Number(params.get(id + "_page"))-1 : 0;

  return (
    <MuiTablePagination
      rowsPerPageOptions={[5, 10, 25, 100]}
      component="div"
      count={count}
      labelRowsPerPage="Registros por pagina"
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelDisplayedRows={({ page }) => `Pagina ${page + 1}/${Math.ceil(count / rowsPerPage)} (${count} registros)`}
      showFirstButton
      showLastButton
      getItemAriaLabel={(type) => buttonsPaginationLabel[type]}
      page={page}
      rowsPerPage={rowsPerPage}
      {...props}
    />
  );
}
