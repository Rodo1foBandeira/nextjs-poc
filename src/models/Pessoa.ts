import Entity from "./Entity"

export default class Pessoa extends Entity {
    public nome: string;

    constructor(id:number, nome: string){
        super(id);
        this.nome = nome;
    }
}