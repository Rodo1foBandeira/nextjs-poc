export async function getRepos (): Promise<any[]> {
    const reponse = await fetch('http://localhost:3004/repos',{
        next: {
            revalidate: 1
        }
    });
    return await reponse.json();
}