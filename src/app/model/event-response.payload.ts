import { Result } from "./event-result.payload";

export interface Body {
    total: number;
    result: Result[];
}