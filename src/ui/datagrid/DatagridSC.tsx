import { headers } from "next/headers";
import DatagridCC from "./DatagridCC";
import DatagridRowsSC from "./DatagridRowsSC";
import IDatagridCell from "./IDatagridCell";
import IDatagridResponse from "./IDatagridResponse";
import IDatagridAcions from "./IDatagridActions";

interface IDatagridSCProps<T> {
  urlPath: string;
  columnscellsProps: IDatagridCell<T>[];
  keySource: string;
  actions?: IDatagridAcions<T>;
  defaultRowsPerPage?: number; // Never pass as state
  defaultRowsPerPageOptions?: number[]; // Never pass as state
}

export const revalidate = 1;

export default async function DatagridSC<T>({ urlPath, columnscellsProps, keySource, actions, defaultRowsPerPage = 5, defaultRowsPerPageOptions = [5, 10, 20] }: IDatagridSCProps<T>) {
  const heads = headers();
  const searchParams = new URLSearchParams(heads.get('searchParams') || '');
  const rowsPerPage = Number(searchParams.get('limit')) || defaultRowsPerPage;
  const page = Number(searchParams.get('page')) || 1;
  const offset = (page-1) * rowsPerPage;
  let url = `${process.env.api}${urlPath}?offset=${offset}&limit=${rowsPerPage}`;
  const orderBy = searchParams.get('orderBy');
  if (orderBy){
    url += `&order_by=${orderBy}`
  }
  const reponse = await fetch(url, {
    //cache: "no-store",
    next: {
      revalidate: 1,
    },
  });
  const { count, data } = (await reponse.json()) as IDatagridResponse<T>;

  return (
    <DatagridCC<T>
      {...{
        columnscellsProps,
        count,
        keySource,
        defaultRowsPerPage,
        defaultRowsPerPageOptions,
      }}
      actions={actions != undefined}
    >
      <DatagridRowsSC<T> {...{ columnscellsProps, data, keySource, actions, urlPath }} />
    </DatagridCC>
  );
}
