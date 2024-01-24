import { TextField } from "@mui/material";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DatagridSearchOperator from "./DatagridSearchOperator";
import { IDatagridSearchProps } from "./IDatagridSearchProps";
import DatagridColumn from "./DatagridColumn";
import DatagridSort from "./DatagridSort";

export default function DatagridSearch({ label, type, source }: IDatagridSearchProps) {
  const searchParams = useSearchParams();

  const [value, setValue] = useState<string | number>("");
  const [delayedValue, setDelayedValue] = useState<string | number>("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.size == 0) {
      setValue("");
      setDelayedValue("");
    } else {
      const filterValue = params.get(`filters.${source}.value`);
      if (filterValue){
        setValue(filterValue);
        setDelayedValue(filterValue);
      }
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

  const inputRef = useRef<HTMLInputElement | null>(null);
  const setFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <DatagridColumn {...{ label }}>
      <TextField
        variant="outlined"
        size="small"
        {...{type, value, inputRef}}
        onChange={handleChange}        
        InputProps={{
          startAdornment: <DatagridSearchOperator {...{ type, source, setFocus }} value={delayedValue} />,
          endAdornment: <DatagridSort {...{ source }} />,
        }}
      />
    </DatagridColumn>
  );
}
