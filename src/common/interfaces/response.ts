export const responseCodes = {
    OK:  200,
    BAD_REQUEST: 400,
    INTERNAL_ERROR: 500
}

export interface responseObject {
    code:  number,
    data?: any,
    message?: string
}