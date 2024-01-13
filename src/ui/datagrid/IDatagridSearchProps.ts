import { InputProps } from "@mui/material/Input";

export interface IDatagridSearchProps {
    label: string;
    additionalInputProps?: InputProps;
    type: "string" | "number" | "date";
    source: string;
    setLoading: (v: boolean) => void;
  }