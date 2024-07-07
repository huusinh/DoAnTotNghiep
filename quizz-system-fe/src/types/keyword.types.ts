import { BaseRecord } from "./integration.types";

export interface KeywordRecord extends BaseRecord {
    id?: number
    keyword: string,
    description: string
}