import DatagridCC from "./DatagridCC";
import DatagridRowsSC from "./DatagridRowsSC";
import IDatagridCell from "./IDatagridCell";
import IDatagridResponse from "./IDatagridResponse";

interface IDatagridSCProps {
  urlPath: string;
  columnscellsProps: IDatagridCell[];
  keySource: string;
  actions?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
  };
  defaultRowsPerPage?: number; // Never pass as state
  defaultRowsPerPageOptions?: (number | { label: string; value: number })[]; // Never pass as state
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

export const revalidate = 1;

export default async function DatagridSC<T>({ urlPath, columnscellsProps, keySource, actions, defaultRowsPerPage = 5, defaultRowsPerPageOptions = [5, 10, 20], searchParams }: IDatagridSCProps) {
  const rowsPerPage = Number(searchParams?.limit) || defaultRowsPerPage;
  const page = Number(searchParams?.page) * rowsPerPage || 0;
  const reponse = await fetch(`${process.env.api}/${urlPath}?offset=${page}&limit=${rowsPerPage}`, {
    //cache: "no-store",
    next: {
      revalidate: 1,
    },
  });
  const { count, data } = (await reponse.json()) as IDatagridResponse<T>;

  return (
    <DatagridCC
      {...{
        columnscellsProps,
        count,
        keySource,
        defaultRowsPerPage,
        defaultRowsPerPageOptions,
      }}
      actions={actions != undefined}
    >
      <DatagridRowsSC {...{ columnscellsProps, data, keySource, actions }} />
    </DatagridCC>
  );
}
