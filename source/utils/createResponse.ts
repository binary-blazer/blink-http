import { BlinkResponse } from "../interfaces";

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
