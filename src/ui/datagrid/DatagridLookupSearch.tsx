import { TextField } from "@mui/material";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DatagridColumn from "./DatagridColumn";
import { IDatagridLookup } from "./IDatagridCell";
import MenuItem from "@mui/material/MenuItem";
import DatagridSort from "./DatagridSort";
import { useDatagridContext } from "./DatagridContext";

interface IDatagridLookupSearch {
  label: string;
  source: string;
  lookup: IDatagridLookup[];
}

export default function DatagridLookupSearch({ label, source, lookup }: IDatagridLookupSearch) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { setLoading, setPage } = useDatagridContext();

  const [value, setValue] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.size == 0) {
      setValue("");
    } else {
      const filterValue = params.get(`filters.${source}.value`);
      if (filterValue)
        setValue(filterValue);
    }
  }, [searchParams]); // Não escutar outras variaveis de estado, pois searchParams sempre atrasado

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const params = new URLSearchParams(searchParams);
    if (event.target.value) {
      params.set(`filters.${source}.operator`, '==');
      params.set(`filters.${source}.value`, event.target.value);
      setPage(0);
      params.set("page", "1");
    } else {
      params.delete(`filters.${source}.operator`)
      params.delete(`filters.${source}.value`)
    }
    setLoading(true)
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DatagridColumn {...{ label }}>    
      <TextField
        sx={{ minWidth:"14em", '& .MuiSelect-icon': { marginRight: "2em"} }}      
        select   
        variant="outlined"
        size="small"
        id={source}
        value={value}
        onChange={handleChange}
        InputProps={{
          endAdornment: <DatagridSort {...{ source }}
          />,
        }}
      >
        <MenuItem key={source + "menuItem"} value="">
            Limpar
          </MenuItem>
        {lookup.map(({ value, label }, i) => (
          <MenuItem key={source + "menuItem-" + i} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </DatagridColumn>
  );
}
