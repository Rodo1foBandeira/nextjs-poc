import { Pessoa } from "@/models/pessoa";

export async function getPessoas (): Promise<Pessoa[]> {
    const reponse = await fetch('http://191.34.115.112:5000/pessoa',
        {
            //cache: "no-store",
            next: {
                revalidate: 8
            }
        }
    );
    return await reponse.json();
}

export async function getPessoa (id: number): Promise<Pessoa> {
    const reponse = await fetch(`http://191.34.115.112:5000/pessoa/${id}`,
        {
            next: {
                revalidate: 8
            }
        }
    );
    return await reponse.json();
}