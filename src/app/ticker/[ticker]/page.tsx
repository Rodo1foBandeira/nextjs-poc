import DatagridSC from "@/ui/datagrid/DatagridSC";
import Ticker from "@/models/Ticker";
import { stringToMoney } from "@/lib/utils/server/converters";

export const revalidate = 0;

export default async function Tickers({ params }: { params: { ticker: string } }) {
  const { ticker } = params;
  
  return (
    <DatagridSC<Ticker>
      urlPath={`/b3api/Ticker('${ticker}')`}
      columnscellsProps={[
        { label: "Data", source: "data" },
        { label: "Minima", source: "minima", cellFormat: stringToMoney },
        { label: "Abertura", source: "abertura", cellFormat: stringToMoney },
        { label: "Maxima", source: "maxima", cellFormat: stringToMoney },
        { label: "Fechamento", source: "fechamento", cellFormat: stringToMoney },
      ]}
      keySource="data"
    />
  );
}
