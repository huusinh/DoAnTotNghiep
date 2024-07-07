export interface IApiResponse<TResult> {
    success: boolean,
    result?: TResult,
    error?: Record<string, string>
}

export interface PaginationResult<TData> {
    totalItems: number,
    results: TData[]
}

export interface BaseRecord {
    [key: string]: unknown
}