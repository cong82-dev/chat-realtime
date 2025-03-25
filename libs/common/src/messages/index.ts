import HTTP_CODE from './http-code.json';

const MESSAGES = { ...HTTP_CODE } as Record<number, string>;

const getMessage = (code: number): string => MESSAGES[code] ?? 'UNKNOWN_ERROR';

export { getMessage };
