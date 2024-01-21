"use client"
import { createContext, useContext, useState, ReactNode, Dispatch, FC } from 'react';
import { useSearchParams } from "next/navigation";

interface IDatagridContextProps {
  children: ReactNode;
}

interface IDatagridContextShare {
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
}

const DatagridContext = createContext<IDatagridContextShare | undefined>(undefined);

export const DatagridContextProvider: FC<IDatagridContextProps> = ({ children }) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
  
    const _page = Number(params.get("page"));
    const [page, setPage] = useState(_page ? _page - 1 : 0);
    const [ loading, setLoading ] = useState(true);

  return (
    <DatagridContext.Provider value={{ page, setPage, loading, setLoading  }}>
      {children}
    </DatagridContext.Provider>
  );
};

export const useDatagridContext = (): IDatagridContextShare => {
  const context = useContext(DatagridContext);
  if (!context) {
    throw new Error('useDatagridContext must be in DatagridContextProvider');
  }
  return context;
};
