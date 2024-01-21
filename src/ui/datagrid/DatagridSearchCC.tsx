import { TextField } from "@mui/material";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DatagridSearchOperator from "./DatagridSearchOperator";
import { IDatagridSearchProps } from "./IDatagridSearchProps";
import DatagridColumn from "./DatagridColumn";
import DatagridSort from "./DatagridSort";

export default function DatagridSearch({ label, type, source }: IDatagridSearchProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [value, setValue] = useState<string | number>(params.get(`filters.${source}.value`) || "");
  const [delayedValue, setDelayedValue] = useState<string | number>(params.get(`filters.${source}.value`) || "");

  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    if (p.size == 0) {
      setValue("");
      setDelayedValue("");
    }
  }, [searchParams]); // Não escutar outras variaveis de estado, pois searchParams sempre atrasado

  const timeoutIdRef = useRef<number | null>(null);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = window.setTimeout(() => {
      setDelayedValue(event.target.value);
    }, 2000);
  };

  return (
    <DatagridColumn {...{ label }}>
      <TextField
        variant="outlined"
        size="small"
        type={type}
        value={value}
        onChange={handleChange}
        InputProps={{
          startAdornment: <DatagridSearchOperator {...{ type, source }} value={delayedValue} />,
          endAdornment: <DatagridSort {...{ source }} />,
        }}
      />
    </DatagridColumn>
  );
}
