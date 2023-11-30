export async function repos (): Promise<any[]> {
    const reponse = await fetch('https://api.github.com/users/Rodo1foBandeira/repos');
    return await reponse.json();
}