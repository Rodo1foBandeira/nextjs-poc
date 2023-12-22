import DatagridSC from "@/ui/datagrid/DatagridSC";
import Ativo from "@/models/Ativo";

export default async function Tickers({ searchParams } : {
  searchParams?: {
  page?: string;
  limit?: string;
}
}) {
  return (
    <DatagridSC<Ativo>
      urlPath="/b3api/Ativo"
      columnscellsProps={[
        { label: "Id", source: "id" },
        { label: "Mercado", source: "mercado" },
        { label: "Ticker", source: "ticker" },
      ]}
      keySource="ticker"
      actions={{view: true, delete: true, deleteHref: ({row} : {pathname: string, row: Ativo}) => `/b3api/ativo${row.id}`}}
    />
  );
}
