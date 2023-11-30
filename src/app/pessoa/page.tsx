import { repos } from '../../services/github'

export default async function Pessoa(){
    const tst = await repos();
    return (
        <ul>
            { tst.map(x => (<li key={x.name}>{x.name}</li>))}
        </ul>
    )
}