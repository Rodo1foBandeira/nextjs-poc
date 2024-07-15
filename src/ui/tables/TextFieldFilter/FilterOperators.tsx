import { Menu, MenuItem, Tooltip } from "@mui/material";
import { useState, MouseEvent, useEffect, useRef, Dispatch, SetStateAction } from "react";
import IconButton from "@mui/material/IconButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import IOperator from "./interfaces/IOperator";
import { operatorsBy } from "./operators";
interface IFilterOperators {
  tableId: string;
  source: string;
  type: "string" | "number" | "date";
  value: string | number;
  setFocus: () => void
}

export default function FilterOperators({ tableId, source, type, value, setFocus }: IFilterOperators) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const operatorParam = searchParams.get(`${tableId}_filters.${source}.operator`) ?? operatorsBy[type][0].operator;
    const operatorValue = searchParams.get(`${tableId}_filters.${source}.value`) ?? "";
    const operator = operatorsBy[type].find(x => x.operator === operatorParam) as IOperator;

    const [ selectedOperator, setSelectedOperator ] = useState(operator);
    
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setFocus();
    };
    const handleClose = (operator: IOperator) => {
      setAnchorEl(null);
      setSelectedOperator(operator);
      if (operatorValue){
        const params = new URLSearchParams(searchParams);
        params.set(`${tableId}_filters.${source}.operator`, operator.operator);
        params.set(`${tableId}_filters.${source}.value`, value.toString());
        params.set(tableId + "_page", "1");
        replace(`${pathname}?${params.toString()}`);
      }      
    };

    //const oldParams = useRef<string>('');
    useEffect(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(`${tableId}_filters.${source}.operator`, selectedOperator.operator);
        params.set(`${tableId}_filters.${source}.value`, value.toString());
        params.set(tableId + "_page", "1");
      } else {
        params.delete(`${tableId}_filters.${source}.operator`)
        params.delete(`${tableId}_filters.${source}.value`)
      }
      replace(`${pathname}?${params.toString()}`);
      // if (oldParams.current != params.toString()){
      //   oldParams.current = params.toString();
      //   replace(`${pathname}?${params.toString()}`);
      // }
    }, [value]);
  
    return (
      <div>
        <Tooltip title={selectedOperator.tooltip} arrow>
          <IconButton onClick={handleClick}>{selectedOperator.label}</IconButton>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(selectedOperator)}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {operatorsBy[type].map((x, i) => (
            <MenuItem key={i} onClick={() => handleClose(x)}>
              {x.tooltip}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };