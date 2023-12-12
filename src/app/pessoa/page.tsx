import { getPessoas } from '@/services/pessoa'
import Pessoa from '@/models/Pessoa';
import Link from 'next/link';
import DatagridSC from '@/components/datagrid/DatagridSC';

export const revalidate = 10;

export default async function Pessoas(){
  const pessoas:Pessoa[] = [ {id: 1, nome: "Rodolfo"}, {id: 2, nome: "Hahaha"} ]
    return (
        <DatagridSC<Pessoa>
            columnsRowsProps={[
                { caption: "Id", source:"id" },
                { caption: "Nome", source:"nome" },
            ]}
            dataSource={{data: pessoas}}
        />
    )
}