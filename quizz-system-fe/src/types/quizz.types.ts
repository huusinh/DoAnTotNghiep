import { BaseRecord } from "./integration.types"

export interface QuizzRecord extends BaseRecord {
    competitionName: string,
    competitionRule: string,
    competitionSetting: {
        contestRule: string,
        maxTeamCount: number,
        maxQuestionCount: number
    }
}

export type CreateQuizz = {
    competitionName: string,
    creatorId: number,
    contestRule: string,
    maxQuestionCount: number,
    maxTeamCount: number,
    contestTime: number,
    teamList: Record<string, number[]>
}