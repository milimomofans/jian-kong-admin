export interface HttpResultModel<T = any> {
    code: number;
    msg: string;
    data: T;
}