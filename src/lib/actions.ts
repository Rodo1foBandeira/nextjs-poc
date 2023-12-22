"use server";
import { revalidatePath } from "next/cache";

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
