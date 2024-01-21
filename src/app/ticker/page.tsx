import DatagridSC from "@/ui/datagrid/DatagridSC";
import Ativo from "@/models/Ativo";

export default async function Tickers() {
  return (
    <DatagridSC<Ativo>
      urlPath="/b3api/Ativo"
      columnscellsProps={[
        { label: "Id", source: "id", type: "number" },
        { label: "Mercado", source: "mercado", type: "string", lookup: [ { value: "B3", label: "Ibov"}, { value: "Nasdaq", label: "NDX"}] },
        { label: "Ticker", source: "ticker", type: "string" },
      ]}
      keySource="ticker"
      actions={{view: true, delete: true, deleteHref: ({row} : {pathname: string, row: Ativo}) => `/b3api/ativo${row.id}`}}
    />
  );
}
