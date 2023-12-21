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
        { caption: "Data", source: "data" },
        { caption: "Minima", source: "minima", cellFormat: stringToMoney },
        { caption: "Abertura", source: "abertura", cellFormat: stringToMoney },
        { caption: "Maxima", source: "maxima", cellFormat: stringToMoney },
        { caption: "Fechamento", source: "fechamento", cellFormat: stringToMoney },
      ]}
      keySource="data"
    />
  );
}
