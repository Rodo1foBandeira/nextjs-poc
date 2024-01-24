"use client"
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

interface IDatagridContextProps {
  children: ReactNode;
}

interface IDatagridContextShare {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const DatagridContext = createContext<IDatagridContextShare | undefined>(undefined);

export const DatagridContextProvider: FC<IDatagridContextProps> = ({ children }) => {
    const searchParams = useSearchParams();
    
    const [page, setPage] = useState(0);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
      const params = new URLSearchParams(searchParams);  
      const _page = Number(params.get("page"));
      if (_page)
        setPage(_page - 1)
    }, [searchParams])

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
