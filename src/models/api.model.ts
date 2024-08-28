import { AxiosResponse } from "axios";

export type Response<T> =  {
    result: string;
    documentation: string;
    terms_of_use: string;
} & T

export type ApiResponse<T> = AxiosResponse<Response<T>>