export type LambdaResult = {
    headers: Record<string, string | boolean>;
    isBase64Encoded: boolean;
    statusCode: number;
    body: string;
};
