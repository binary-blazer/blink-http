import { BlinkResponse } from "../interfaces";

export function buildFinalUrl(
  baseURL: string,
  url: string,
  queryParams: Record<string, string>,
): string {
  let finalUrl = baseURL ? new URL(url, baseURL).toString() : url;
  const urlObj = new URL(finalUrl);
  Object.keys(queryParams).forEach((key) =>
    urlObj.searchParams.append(key, queryParams[key]),
  );
  return urlObj.toString();
}

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

export function createResponse(
  xhr: XMLHttpRequest,
  finalUrl: string,
  userAgent: string,
): BlinkResponse {
  const headers = new Headers();
  xhr
    .getAllResponseHeaders()
    .split("\r\n")
    .forEach((header) => {
      const [key, value] = header.split(": ");
      if (key) headers.append(key, value);
    });

  return {
    status: xhr.status,
    ok: xhr.status >= 200 && xhr.status < 300,
    json: async () => JSON.parse(xhr.responseText),
    text: async () => xhr.responseText,
    clone: () => createResponse(xhr, finalUrl, userAgent),
    headers: headers,
    redirected: false,
    statusText: xhr.statusText,
    type: "basic",
    url: finalUrl,
    body: null,
    bodyUsed: false,
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
    bytes: async () => new Uint8Array(),
    userAgent: userAgent,
  };
}
