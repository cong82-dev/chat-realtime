export class MetaDto {
  total: number;
  page: number;
  limit: number;
}

export class ResponseDto {
  statusCode?: number;
  message?: string;
  data?: unknown;
  meta?: MetaDto;
}
