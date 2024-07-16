"use client"
import { TextField } from "@mui/material";
import { useState, ChangeEvent, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Box4Label from "@/ui/utils/Box4Label";
import FilterOperators from "./FilterOperators";
import Sort from "@/ui/tables/Sort";

interface ITextFieldFilter {
    tableId: string;
    label: string;
    type: "string" | "number" | "date";
    source: string;
  }

export default function TextFieldFilter({ tableId, label, type, source }: ITextFieldFilter) {
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string | number>(searchParams.get(`${tableId}_filters.${source}.value`) ?? "");
  const [delayedValue, setDelayedValue] = useState<string | number>("");

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
    <Box4Label {...{ label }}>
      <TextField
        size="small"
        {...{type, value, inputRef}}
        onChange={handleChange}        
        InputProps={{
          startAdornment: <FilterOperators {...{ tableId, type, source, setFocus }} value={delayedValue} />,
          endAdornment: <Sort {...{ tableId, source }} />,
        }}
      />
    </Box4Label>
  );
}
