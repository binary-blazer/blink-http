// @ts-expect-error: xhr2 has no types
import { XMLHttpRequest } from 'xhr2';
import { Interceptor, ResponseInterceptor, BlinkResponse } from "../interfaces";

class Client {
  baseURL: string;
  defaultOptions: RequestInit;
  interceptors: {
    request: Interceptor[];
    response: ResponseInterceptor[];
  };

  constructor(baseURL = "", options: RequestInit = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = options;
    this.interceptors = {
      request: [],
      response: [],
    };
  }

  protected useRequestInterceptor(interceptor: Interceptor): void {
    this.interceptors.request.push(interceptor);
  }

  protected useResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.interceptors.response.push(interceptor);
  }

  protected async request(url: string, options: RequestInit = {}): Promise<Response> {
    let finalUrl = this.baseURL ? new URL(url, this.baseURL).toString() : url;
    let finalOptions: RequestInit = { ...this.defaultOptions, ...options };

    for (const interceptor of this.interceptors.request) {
      const modified = interceptor(finalUrl, finalOptions);
      if (modified) {
        finalUrl = modified.url || finalUrl;
        finalOptions = modified.options || finalOptions;
      }
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(finalOptions.method || "GET", finalUrl, true);

      if (finalOptions.headers) {
        for (const [key, value] of Object.entries(finalOptions.headers)) {
          xhr.setRequestHeader(key, value as string);
        }
      }

      xhr.onload = async () => {
        let response: BlinkResponse = {
          status: xhr.status,
          ok: xhr.status >= 200 && xhr.status < 300,
          json: async () => JSON.parse(xhr.responseText),
          text: async () => xhr.responseText,
          clone: () => response,
          headers: new Headers(),
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
        };

        for (const interceptor of this.interceptors.response) {
          const modifiedResponse = await interceptor(response);
          if (modifiedResponse) return resolve(modifiedResponse);
        }

        if (!response.ok)
          return reject(new Error(`HTTP error! Status: ${response.status}`));
        resolve(response);
      };

      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(finalOptions.body as Document | XMLHttpRequestBodyInit | null);
    });
  }

  protected get(url: string, options: RequestInit = {}): Promise<Response> {
    return this.request(url, { ...options, method: "GET" });
  }

  protected post(url: string, body: any, options: RequestInit = {}): Promise<Response> {
    return this.request(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  protected put(url: string, body: any, options: RequestInit = {}): Promise<Response> {
    return this.request(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  protected delete(url: string, options: RequestInit = {}): Promise<Response> {
    return this.request(url, { ...options, method: "DELETE" });
  }

  protected patch(url: string, body: any, options: RequestInit = {}): Promise<Response> {
    return this.request(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  protected head(url: string, options: RequestInit = {}): Promise<Response> {
    return this.request(url, { ...options, method: "HEAD" });
  }

  protected options(url: string, options: RequestInit = {}): Promise<Response> {
    return this.request(url, { ...options, method: "OPTIONS" });
  }

  protected trace(url: string, options: RequestInit = {}): Promise<Response> {
    return this.request(url, { ...options, method: "TRACE" });
  }
}

export default Client;
