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
      {...{searchParams}}
      urlPath="/b3api/Ativo"
      columnscellsProps={[
        { caption: "Id", source: "id" },
        { caption: "Mercado", source: "mercado" },
        { caption: "Ticker", source: "ticker" },
      ]}
      keySource="ticker"
      actions={{view: true }}
    />
  );
}
