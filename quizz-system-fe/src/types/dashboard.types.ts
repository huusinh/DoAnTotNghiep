import { BaseRecord, PaginationResult } from "./integration.types"

export type HistoryRecord = BaseRecord & {
    competitionName: string,
    teamName: string,
    correctAnswerCount: number,
    failedAnswerCount: number
}

export type DashboardData = {
    keywordsCount: number,
    competitionsCount: number,
    histories: PaginationResult<HistoryRecord>
}
