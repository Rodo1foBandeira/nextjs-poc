export interface IDatagridSearchProps {
    label: string;
    type: "string" | "number" | "date";
    source: string;
    setLoading: (v: boolean) => void;
  }