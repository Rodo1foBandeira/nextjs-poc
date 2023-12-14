import Entity from "./Entity";

export default class Ativo extends Entity {
    public mercado: string;
    public ticker: string;

    constructor(id:number, mercado: string, ticker: string){
        super(id);
        this.mercado = mercado;
        this.ticker = ticker
    }
}