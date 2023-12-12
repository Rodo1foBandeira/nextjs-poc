import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ReactNode } from "react";
import IDatagridProps from "./IDatagridProps";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import IDatagridCell from "./IDatagridCell";
import IDatagridSource from "./IDatagridSource";
import Entity from "@/models/Entity";
import DatagridFooter from "./DatagridFooter";

interface IDatagridSCProps<T> {
  columnsRowsProps: IDatagridCell[];
  dataSource: IDatagridSource<T>;
  props?: Partial<IDatagridProps>;
}

export default function DatagridSC<T>({
  columnsRowsProps, dataSource, props = { defaultRowsPerPage: 5 }
}: IDatagridSCProps<T>) {
  const rows = dataSource.data;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {columnsRowsProps.map(({ caption, columnProps}, i) => (<TableCell key={`column-${i}`} {...columnProps}>{caption}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row: any, ri) => (
            <TableRow key={`row-${ri}`}>
              {columnsRowsProps.map(({ source, rowProps}, ci) =>
                (<TableCell key={`row-${ri}-column-${ci}`} {...rowProps}>{row[source]}</TableCell>))}
            </TableRow>
          ))}
          {rows?.length == 0 && (
            <TableRow style={{ height: 53 * columnsRowsProps.length }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <DatagridFooter count={rows?.length || 0} page={0} rowsPerPage={10}/>
      </Table>
    </TableContainer>
  );
}
