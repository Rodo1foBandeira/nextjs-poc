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
        { label: "Data", source: "data", type: "date" },
        { label: "Minima", source: "minima", type: "number", cellFormat: stringToMoney },
        { label: "Abertura", source: "abertura", type: "number", cellFormat: stringToMoney },
        { label: "Maxima", source: "maxima", type: "number", cellFormat: stringToMoney },
        { label: "Fechamento", source: "fechamento", type: "number", cellFormat: stringToMoney },
      ]}
      keySource="data"
    />
  );
}
