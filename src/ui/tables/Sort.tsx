"use client"
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconButton, Tooltip } from "@mui/material";
import { SortDirection } from "@mui/material/TableCell";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Sort({ tableId, source }: { tableId: string; source: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const order = searchParams.get(tableId + "_orderBy") ?? ".";
  const [column, direction] = order.split(".");

  const toggleSortDirection = () => {
    const params = new URLSearchParams(searchParams);
    const order = params.get(tableId + "_orderBy") ?? ".";
    const [column, direction] = order.split(".");
    if (column === source) {
        if (direction === "desc"){
            params.set(tableId + "_orderBy", `${source}.asc`);
        } else {
            params.delete(tableId + "_orderBy");
        }
    } else {
        params.set(tableId + "_orderBy", `${source}.desc`);
    }    
    replace(`${pathname}?${params.toString()}`);
  };

  const showDirection = (desc: ReactNode, asc: ReactNode, none: ReactNode) => {
    if (column === source) {
      return direction === "desc" ? desc : asc;
    }
    return none;
  };

  return (
    <Tooltip title={showDirection("Ordenação Decrescente", "Ordenação Crescente", "Clique para ordenar")} arrow>
      <IconButton onClick={() => toggleSortDirection()}>{showDirection(<ArrowUpwardIcon />, <ArrowDownwardIcon />, <ImportExportIcon />)}</IconButton>
    </Tooltip>
  );
}
