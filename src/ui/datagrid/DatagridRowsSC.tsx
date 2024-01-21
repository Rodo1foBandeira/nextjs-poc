import { TableCell, TableRow } from "@mui/material";
import IDatagridCell from "./IDatagridCell";
import { ReactNode } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import { headers } from "next/headers";
import { apiDelete } from "@/lib/actions";
import DatagridDeleteCC from "./DatagridDeleteCC";
import IDatagridAcions from "./IDatagridActions";

interface IDatagridRowsSCProps<T> {
  columnscellsProps: IDatagridCell<T>[];
  keySource: string;
  urlPath: string;
  actions?: IDatagridAcions<T>
  data: T[];
}

export default async function DatagridRowsSC<T>({ columnscellsProps, keySource, actions, data, urlPath }: IDatagridRowsSCProps<T>) {
  const heads = headers();
  const pathname = heads.get("pathname") || "";

  const Actions = ({ row }: { row: T }) => {
    
    if (actions) {
      let buttons: ReactNode[] = [];
      if (actions.view)
        buttons.push(
          <Link key={'view-'+(row as any)[keySource]} href={actions?.viewHref ? actions.viewHref({ pathname, row }) : `${pathname}/${(row as any)[keySource]}`}>
            <IconButton color="secondary" aria-label="view">
              <VisibilityIcon />
            </IconButton>
          </Link>
        );
      if (actions.edit)
        buttons.push(
          <Link key={'edit-'+(row as any)[keySource]} href={actions?.editHref ? actions.editHref({ pathname, row }) : `${pathname}/${(row as any)[keySource]}/edit`}>
            <IconButton color="secondary" aria-label="edit">
              <CreateIcon />
            </IconButton>
          </Link>
        );
      if (actions.delete)
        buttons.push(
          <DatagridDeleteCC {...{ urlPath: actions?.deleteHref ? actions.deleteHref({ pathname, row }) : urlPath, pathname}} />
        );
      return <TableCell sx={{ padding: 0, paddingLeft: "16px" }}>{buttons}</TableCell>;
    }
  };

  if (data.length == 0) {
    return (
      <TableRow>
        <TableCell colSpan={12} align="center" style={{ borderBottom: "none" }}>
          <h1>Sem dados</h1>
        </TableCell>
      </TableRow>
    );
  }
  return data.map((row, ri) => (
    <TableRow key={`row-${ri}`} sx={{ height: 40.8 }}>
      {columnscellsProps.map(({ source, cellProps, cellFormat, cellFormatT, lookup }, ci) => (
        <TableCell
          //align={numeric ? 'right' : 'left'}
          key={`row-${ri}-column-${ci}`}
          sx={{ padding: 0, paddingLeft: "16px" }}
          align="center"
          {...cellProps}
        >
          {lookup ? lookup.find(x => x.value === (row as any)[source])?.label : cellFormat ? cellFormat((row as any)[source]) : cellFormatT ? cellFormatT(row) : (row as any)[source]}
        </TableCell>
      ))}
      <Actions {...{ row }} />
    </TableRow>
  ));
}
