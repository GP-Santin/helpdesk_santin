export interface PromiseResponse<T> {
  status: number;
  data: T;
  error?: string;
}

export interface PromiseResponseWithQuery<T> {
  status: number;
  data: T[];
  error?: string;
}
