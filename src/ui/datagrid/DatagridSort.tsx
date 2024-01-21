import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconButton, Tooltip } from "@mui/material";
import { SortDirection } from "@mui/material/TableCell";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useDatagridContext } from "./DatagridContext";

interface IOrder {
  column: string;
  sortDirection: SortDirection;
}

export default function DatagridSort({ source }: { source: string }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pathname = usePathname();
  const { setLoading } = useDatagridContext();

  const orderBy = params.get("orderBy");
  const [order, setOrder] = useState<IOrder>({
    column: orderBy ? orderBy.split(".")[0] : "",
    sortDirection: orderBy ? (orderBy.split(".")[1] as SortDirection) : false,
  });

  // Problema: filtrar, clicar no Link Ticker, fica carregando
  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    if (p.size == 0 && (order.column || order.sortDirection)) {
      setOrder({ column: "", sortDirection: false });
    }
  }, [searchParams]); // Não escutar outras variaveis de estado, pois searchParams sempre atrasado

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
  return (
    <Tooltip title={order && order.column === source ? (order.sortDirection === "desc" ? "Ordenação Decrescente" : "Ordenação Ascendente") : "Clique para ordenar"} arrow>
      <IconButton onClick={() => toggleSortDirection(source)}>
        {order && order.column === source ? order.sortDirection === "desc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon /> : <ImportExportIcon />}
      </IconButton>
    </Tooltip>
  );
}
