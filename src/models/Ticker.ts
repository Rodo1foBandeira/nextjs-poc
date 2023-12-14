import Entity from "./Entity";

export default class Ticker extends Entity {
    public minima: number;
    public maxima: number;
    public abertura: number;
    public fechamento: number;
}