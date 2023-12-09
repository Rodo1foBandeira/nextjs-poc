import { getPessoas } from '@/services/pessoa'
import { Pessoa } from '@/models/pessoa';

//export const dynamic = 'force-dynamic';
export const revalidate = 0;
// export const fetchCache = 'force-no-store';
// export const runtime = 'edge';

export default async function Pessoas(){
  const pessoas = await getPessoas();
    return (
        <ul>
            { pessoas.map(x => (<li key={x.nome}><a href={`/pessoa/${x.id}`}>{x.nome}</a></li>))}
        </ul>
    )
}