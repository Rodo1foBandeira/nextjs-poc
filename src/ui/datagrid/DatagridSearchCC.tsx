import { TextField, Grid } from "@mui/material";

import { useState, MouseEvent, ChangeEvent, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DatagridSearchOperator from "./DatagridSearchOperator";
import { IDatagridSearchProps } from "./IDatagridSearchProps";

export default function DatagridSearch({ label, additionalInputProps, type, source, setLoading }: IDatagridSearchProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [value, setValue] = useState<string | number>(params.get(`filters.${source}.value`) || "");
  const [delayedValue, setDelayedValue] = useState<string | number>(params.get(`filters.${source}.value`) || "");

  useEffect(() => {
    const p = new URLSearchParams(searchParams);
    if (p.size == 0) {
      setValue('');
      setDelayedValue('');
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
    <Grid container direction="column" alignItems="center">
      <Grid item>{label}</Grid>
      <Grid item>
        <TextField
          variant="outlined"
          size="small"
          type={type}
          value={value}
          onChange={handleChange}
          InputProps={{
            startAdornment: <DatagridSearchOperator {...{ type, source, setLoading }} value={delayedValue} />,
            ...additionalInputProps,
          }}
        />
      </Grid>
    </Grid>
  );
}
