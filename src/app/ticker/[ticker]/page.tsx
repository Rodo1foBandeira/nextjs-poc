import DatagridCC from "@/components/datagrid/DatagridCC";
import Ticker from "@/models/Ticker";

export const revalidate = 10;

export default async function Tickers({ params, searchParams }: { params: { ticker: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
  const { ticker } = params;
  return (
    <DatagridCC<Ticker>
      url={`/b3api/Ticker('${ticker}')`}
      columnsRowsProps={[
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
