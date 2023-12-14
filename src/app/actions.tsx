'use server'

import IDatagridResponse from "@/components/datagrid/IDatagridResponse";

export async function listar<T>(urlQueryParams: string):Promise<IDatagridResponse<T>> {
    const response = await fetch(process.env.api + urlQueryParams, {
    next: {
      revalidate: 10,
    },
  });
  const json = await response.json();
  return json;
}
