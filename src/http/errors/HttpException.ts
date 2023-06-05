interface HttpException {
    code: number;
    message: string;
    stack?: string;
}

interface HttpException {
    new(code?: number, message?: string): Error;
    (code?: number, message?: string): Error;
    readonly prototype: Error;
}

declare var HttpException: HttpException;