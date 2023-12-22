"use client";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiDelete } from "@/lib/actions";

export default function DatagridDeleteCC({ urlPath, pathname }: { urlPath: string; pathname: string }) {
  const confirmDelete = async () => {
    if (confirm("Deseja realmente excluir?")) {
      if (await apiDelete(urlPath, pathname)) {
        alert("Excluido!");
      } else {
        alert("Erro ao excluir");
      }
    }
  };

  return (
    <IconButton color="secondary" aria-label="delete" onClick={confirmDelete}>
      <DeleteIcon />
    </IconButton>
  );
}
