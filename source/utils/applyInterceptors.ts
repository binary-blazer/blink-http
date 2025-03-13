export function applyInterceptors(
  interceptors: any[],
  finalUrl: string,
  finalOptions: RequestInit,
): void {
  for (const interceptor of interceptors) {
    const modified = interceptor(finalUrl, finalOptions);
    if (modified) {
      finalUrl = modified.url || finalUrl;
      finalOptions = modified.options || finalOptions;
    }
  }
}
