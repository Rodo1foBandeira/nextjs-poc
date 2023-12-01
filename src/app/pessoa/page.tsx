import { getRepos } from '../../services/github'

export default async function Pessoa(){
    const tst:any[] = await getRepos();
    return (
        <ul>
            { tst.map(x => (<li key={x.name}>{x.name}</li>))}
        </ul>
    )
}