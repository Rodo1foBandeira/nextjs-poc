import { TextField, Grid } from "@mui/material";
import { useState, MouseEvent, ChangeEvent, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DatagridSearchOperator from "./DatagridSearchOperator";
import { IDatagridSearchProps } from "./IDatagridSearchProps";
import DatagridColumn from "./DatagridColumn";

export default function DatagridLookupSearch({ label, source, setLoading }: { label: string, source: string, setLoading: (v: boolean) => void }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [value, setValue] = useState<string | number>(params.get(`filters.${source}.value`) || "");

  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    if (p.size == 0) {
      setValue('');
    }
  }, [searchParams]); // Não escutar outras variaveis de estado, pois searchParams sempre atrasado

  return (
    <DatagridColumn {...{label}}>
        <div>Todo: SelectInput</div>
    </DatagridColumn>
  );
}
