export interface Interceptor {
  (
    url: string,
    options: RequestInit,
  ): { url?: string; options?: RequestInit } | void;
}
