import DatagridCC from "@/components/datagrid/DatagridCC";
import Ativo from "@/models/Ativo";

export const revalidate = 10;

export default async function Tickers() {
  return (
    <DatagridCC<Ativo>
      url={"/b3api/Ativo"}
      columnsRowsProps={[
        { caption: "Id", source: "id" },
        { caption: "Mercado", source: "mercado" },
        { caption: "Ticker", source: "ticker" },
      ]}
      keySource="ticker"
      actions={{view: true }}
    />
  );
}
