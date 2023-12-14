import Entity from "./Entity";

export default class Ticker {
    public minima: number;
    public maxima: number;
    public abertura: number;
    public fechamento: number;

    constructor (minima: number, maxima: number, abertura:number, fechamento: number) {
        this.minima = minima;
        this.maxima = maxima;
        this.abertura = abertura;
        this.fechamento = fechamento;
    }
}