export interface IApiResponse<TResult> {
    success: boolean,
    result?: TResult,
    errors?: string[]
}

export interface PaginationResult<TData> {
    totalItems: number,
    results: TData[]
}

export const InitialPaginationResult = {
    results: [],
    totalItems: 0
}

export interface BaseRecord {
    id: number,
    [key: string]: unknown
}

export type CreateRequest<TRecord> = Omit<TRecord, 'id'>