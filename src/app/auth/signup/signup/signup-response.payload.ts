import { Body } from "./signup-body.payload";

export interface SignupResponsePayload {
    body: Body,
    status: string,
    errorCode: string
}