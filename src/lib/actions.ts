"use server";
import IDataResponse from "@/models/IDataResponse";
import ITableData from "@/ui/tables/interfaces/ITableData";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { parseSearchParams } from "./utils/queryParameters";
import { Condition, Filter, all_conditions } from "@/ui/datagrid/Conditions";

export async function apiDelete(urlPath: string, revalPath: string) {
  const url = `${process.env.api}${urlPath}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      cache: "no-store",
    });

    if (response.ok) {
      revalidatePath(revalPath);
      return true;
    }
  } catch (ex) {}
  return false;
}

export async function tableData<T>({
  id,
  urlPath,
  api,
  defaultRowsPerPage = 5,
}: ITableData): Promise<IDataResponse<T>> {
  const heads = headers();
  const searchParams = new URLSearchParams(heads.get("searchParams") || "");
  const rowsPerPage =
    Number(searchParams.get(id + "_limit")) || defaultRowsPerPage;
  const page = Number(searchParams.get(id + "_page")) || 1;
  const offset = (page - 1) * rowsPerPage;
  let url = `${
    api || process.env.api
  }${urlPath}?offset=${offset}&limit=${rowsPerPage}`;
  const orderBy = searchParams.get(id + "_orderBy");
  if (orderBy) {
    url += `&order_by=${orderBy}`;
  }
  if (searchParams.toString().indexOf(id + "_filters.") > -1) {
    const filters = parseSearchParams<Filter>(
      searchParams.toString(),
      new RegExp(`^${id}_filters\\.(\\w+)\\.(\\w+)$`),
    );
    const func_filters = Object.keys(filters)
      .map((key) => {
        const operator = all_conditions.find(
          (x: Condition) => x.operator === filters[key].operator,
        );
        const value = Number(filters[key].value) || filters[key].value;
        return "func_filters=" + operator?.query(key, value);
      })
      .join("&");
    url += "&" + func_filters;
  }
  const reponse = await fetch(url, {
    //cache: "no-store",
    next: {
      revalidate: 1,
    },
  });
  return await reponse.json();
}