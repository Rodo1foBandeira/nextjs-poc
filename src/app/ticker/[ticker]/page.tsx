import DatagridSC from "@/ui/datagrid/DatagridSC";
import Ticker from "@/models/Ticker";

export const revalidate = 0;

export default async function Tickers({ params, searchParams }: { params: { ticker: string }; searchParams?: { page?: string; limit?: string } }) {
  const { ticker } = params;
  return (
    <DatagridSC<Ticker>
      {...{searchParams}}
      urlPath={`/b3api/Ticker('${ticker}')`}
      columnscellsProps={[
        { caption: "Data", source: "data" },
        { caption: "Minima", source: "minima" },
        { caption: "Abertura", source: "abertura" },
        { caption: "Maxima", source: "maxima" },
        { caption: "Fechamento", source: "fechamento" },
      ]}
      keySource="data"
    />
  );
}
