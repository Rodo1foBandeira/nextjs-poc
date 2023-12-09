import { Pessoa } from "@/models/pessoa";
import { getPessoa } from "@/services/pessoa"

// export const revalidate = 2;
export default async function Pessoa({ params: { id }}: { params: { id: number}}) {
    const pessoa = await getPessoa(id);
    return (<h1>{pessoa.id} - {pessoa.nome}</h1>)
}