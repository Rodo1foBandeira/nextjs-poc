import { TableCell, TableRow } from "@mui/material";
import IDatagridCell from "./IDatagridCell";
import { ReactNode } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { headers } from 'next/headers';

interface IDatagridRowsSCProps<T> {
    columnscellsProps: IDatagridCell[];
    keySource: string;
    actions?: {
      view?: boolean;
      edit?: boolean;
      delete?: boolean;
    };
    data: T[];
  }

export default async function DatagridRowsSC<T>({ columnscellsProps, keySource, actions, data } : IDatagridRowsSCProps<T>){
  const heads = headers();
  const pathName = heads.get('pathName') || '';
  
  const Actions = ({ row }: {row: T}) => {
    if (actions) {
      let buttons: ReactNode[] = [];
      if (actions.view)
        buttons.push(
          <Link href={`${pathName}/${(row as any)[keySource]}`}>
            <IconButton color="secondary" aria-label="view">
              <VisibilityIcon />
            </IconButton>
          </Link>
        );
      if (actions.edit)
        buttons.push(
          <Link href={`${pathName}/${(row as any)[keySource]}`}>
            <IconButton color="secondary" aria-label="edit">
              <CreateIcon />
            </IconButton>
          </Link>
        );
      if (actions.delete)
        buttons.push(
          <IconButton color="secondary" aria-label="edit">
            <DeleteIcon />
          </IconButton>
        );
      return <TableCell sx={{ padding: 0, paddingLeft: '16px' }}>{buttons}</TableCell>;
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
          {columnscellsProps.map(({ source, cellProps, cellFormat }, ci) => (
            <TableCell
              //align={numeric ? 'right' : 'left'}
              key={`row-${ri}-column-${ci}`} sx={{ padding: 0, paddingLeft: '16px' }} {...cellProps}>
              {cellFormat ? cellFormat((row as any)[source]) : (row as any)[source]}
            </TableCell>
          ))}
          <Actions {...{row}} />
        </TableRow>
      ));
}