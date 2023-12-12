import IDatagridResponse from "./IDatagridResponse";

export default interface IDatagridSource<T> {
    url?: string,
    get?: (aditionalQueryParameters?: string) => Promise<IDatagridResponse<T>>,
    data?: T[],    
}