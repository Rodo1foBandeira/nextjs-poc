import { Menu, MenuItem, Tooltip } from "@mui/material";
import { useState, MouseEvent, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Condition, conditions } from "./Conditions";

interface IDatagridSearchOperator {
  source: string;
  type: "string" | "number" | "date";
  value: string | number;
  setLoading: (v:boolean) => void;
}

export default function DatagridSearchOperator({ source, type, value, setLoading }: IDatagridSearchOperator) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { replace } = useRouter();
    const pathname = usePathname();
    const operator = params.get(`filters.${source}.operator`)
    const conditionQueryOrDefault = operator ? conditions[type].find(x => x.operator === operator) as Condition : conditions.string[0]
    const [condition, setCondition] = useState<Condition>(conditionQueryOrDefault);
    
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (condition: Condition) => {
      setCondition(condition);
      setAnchorEl(null);
    };

    useEffect(() => {
      const p = new URLSearchParams(searchParams);
      if (p.size == 0) {
        setCondition(conditions.string[0]);
      }
    }, [searchParams]); // Não escutar outras variaveis de estado, pois searchParams sempre atrasado
  
    const oldParams = useRef<string>('');
    useEffect(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(`filters.${source}.operator`, condition.operator);
        params.set(`filters.${source}.value`, value.toString());        
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