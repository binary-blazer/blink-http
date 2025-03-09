export interface ResponseInterceptor {
  (response: Response): Promise<Response> | Response;
}
