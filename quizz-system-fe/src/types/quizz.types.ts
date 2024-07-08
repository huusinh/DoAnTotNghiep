import { BaseRecord } from "./integration.types";
import { KeywordRecord } from "./keyword.types";

export interface QuizzRecord extends BaseRecord {
  competitionName: string;
  competitionRule: string;
  contestRule: string;
  maxTeamCount: number;
  maxQuestionCount: number;
  contestTime: number;
  competitionTeams?: CompetitionTeam[];
}

export type CompetitionTeam = BaseRecord & {
  teamName: string;
};

export type CreateQuizz = {
  competitionName: string;
  creatorId: number;
  contestRule: string;
  maxQuestionCount: number;
  maxTeamCount: number;
  contestTime: number;
  teamList: Record<string, number[]>;
};

export type QuizzResult = BaseRecord & {
  question: KeywordRecord;
};
