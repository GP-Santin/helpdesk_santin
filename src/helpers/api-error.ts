export class ApiError extends Error {
  status: number;
  url: string;
  method: string;
  requestBody?: unknown;
  responseBody?: unknown;

  constructor({
    message,
    status,
    url,
    method,
    requestBody,
    responseBody,
    cause,
  }: {
    message: string;
    status: number;
    url: string;
    method: string;
    requestBody?: unknown;
    responseBody?: unknown;
    cause?: unknown;
  }) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
    this.method = method;
    this.requestBody = requestBody;
    this.responseBody = responseBody;
    if (cause) this.cause = cause;
  }
}
