import { Menu, MenuItem, Tooltip } from "@mui/material";
import { useState, MouseEvent, useEffect, useRef, Dispatch, SetStateAction } from "react";
import IconButton from "@mui/material/IconButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Condition, conditions } from "./Conditions";
import { useDatagridContext } from "./DatagridContext";

interface IDatagridSearchOperator {
  source: string;
  type: "string" | "number" | "date";
  value: string | number;
  setFocus: () => void
}

export default function DatagridSearchOperator({ source, type, value, setFocus }: IDatagridSearchOperator) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const { setLoading, setPage } = useDatagridContext();
    
    const [condition, setCondition] = useState<Condition>(conditions.string[0]);
    
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setFocus();
    };
    const handleClose = (condition: Condition) => {
      setCondition(condition);
      setAnchorEl(null);
    };

    useEffect(() => {
      const params = new URLSearchParams(searchParams);
      if (params.size == 0) {
        setCondition(conditions.string[0]);
      } else {
        const operator = params.get(`filters.${source}.operator`)
        if (operator)
          setCondition(conditions[type].find(x => x.operator === operator) as Condition);
      }
    }, [searchParams]); // Não escutar outras variaveis de estado, pois searchParams sempre atrasado
  
    const oldParams = useRef<string>('');
    useEffect(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(`filters.${source}.operator`, condition.operator);
        params.set(`filters.${source}.value`, value.toString());
        setPage(0);
        params.set("page", "1");
      } else {
        params.delete(`filters.${source}.operator`)
        params.delete(`filters.${source}.value`)
      }
      
      if (oldParams.current != params.toString()){
        oldParams.current = params.toString();
        setLoading(true)
        replace(`${pathname}?${params.toString()}`);
      }
    }, [searchParams, value, condition, condition.operator]);
  
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