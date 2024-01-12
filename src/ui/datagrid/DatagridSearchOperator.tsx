import { Menu, MenuItem, Tooltip } from "@mui/material";
import { useState, MouseEvent, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Condition, conditions } from "./Conditions";

export default function DatagridSearchOperator({ source, type, value }: { source: string; type: "string" | "number" | "date"; value: string | number }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { replace } = useRouter();
    const pathname = usePathname();
    const operator = params.get(`filters.${source}.operator`)
    const conditionQuery = operator ? conditions[type].find(x => x.operator === operator) as Condition : conditions.string[0]
    const [condition, setCondition] = useState<Condition>(conditionQuery);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (condition: Condition) => {
      setCondition(condition);
      setAnchorEl(null);
    };
  
    useEffect(() => {
      if (value) {
        params.set(`filters.${source}.operator`, condition.operator);
        params.set(`filters.${source}.value`, value.toString());        
      } else {
        params.delete(`filters.${source}.operator`)
        params.delete(`filters.${source}.value`)
      }
      replace(`${pathname}?${params.toString()}`);
    }, [value, condition, condition.operator]);
  
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