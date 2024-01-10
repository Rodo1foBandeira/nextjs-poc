import { Menu, MenuItem, TextField, Select, Grid, Tooltip } from "@mui/material";
import { InputProps } from "@mui/material/Input";
import { useState, MouseEvent, ChangeEvent, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ICondition {
  label: string;
  tooltip: string;
}

interface DatagridSearchProps {
  label: string;
  additionalInputProps?: InputProps;
  type: "string" | "number" | "date";
  source: string;
}

const StartAdornment = ({source, type, value } : {source: string, type: "string" | "number" | "date", value: string|number}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // Todo: between
  const base_conditions = [
    { label: "=", tooltip: "Igual" },
    { label: "c:", tooltip: "Contém" },
    { label: "i:", tooltip: "Inicia com" },
    { label: "t:", tooltip: "Termina com" },
  ];
  const other_conditions = [
    { label: ">", tooltip: "Maior que" },
    { label: "≥", tooltip: "Maior igual que" },
    { label: "<", tooltip: "Menor que" },
    { label: "≤", tooltip: "Menor igual que" },
  ];
  const conditions = {
    string: base_conditions,
    number: [...base_conditions, ...other_conditions],
    date: [{ label: "=", tooltip: "Igual" }, ...other_conditions],
  };
  const [condition, setCondition] = useState<ICondition>(base_conditions[0]);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (condition: ICondition) => {
    setCondition(condition);
    setAnchorEl(null);
  };

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);  
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (value){
      params.set(`filters.${source}.value`, value.toString());
      params.set(`filters.${source}.operator`, condition.label);
      replace(`${pathname}?${params.toString()}`);
    }
  }, [value])
  
  return (
    <div>
      <Tooltip title={condition.tooltip} arrow>
        <IconButton onClick={handleClick}>{condition.label}</IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(condition)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {conditions[type].map((x, i) => (
          <MenuItem key={i} onClick={() => handleClose(x)}>
            {x.tooltip}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default function DatagridSearch({ label, additionalInputProps, type, source }: DatagridSearchProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);  

  const [ value, setValue ] = useState<string|number>(params.get(source) || '');
  const [ delayedValue, setDelayedValue ] = useState<string|number>(params.get(source) || '');
 
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
          value={value}
          onChange={handleChange}
          InputProps={{
            startAdornment: <StartAdornment {...{type, source}} value={delayedValue} />,
            ...additionalInputProps,
          }}
        />
      </Grid>
    </Grid>
  );
}
