// @ts-expect-error: xhr2 has no types
import { XMLHttpRequest } from "xhr2";

import { Interceptor, ResponseInterceptor, BlinkResponse } from "../interfaces";
import {
  BLINK_USER_AGENT,
  DEFAULT_TIMEOUT,
  DEFAULT_OPTIONS,
} from "../constants.js";
import { buildFinalUrl, applyInterceptors, createResponse } from "./utils.js";

class Client {
  baseURL: string;
  defaultOptions: RequestInit;
  interceptors: {
    request: Interceptor[];
    response: ResponseInterceptor[];
  };
  timeout: number;
  userAgent: string;

  constructor(
    baseURL = "",
    options: RequestInit = DEFAULT_OPTIONS,
    timeout = DEFAULT_TIMEOUT,
    userAgent = BLINK_USER_AGENT,
  ) {
    this.baseURL = baseURL;
    this.defaultOptions = options;
    this.interceptors = {
      request: [],
      response: [],
    };
    this.timeout = timeout;
    this.userAgent = userAgent;
  }

  protected useRequestInterceptor(interceptor: Interceptor): void {
    this.interceptors.request.push(interceptor);
  }

  protected useResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.interceptors.response.push(interceptor);
  }

  protected async request(
    url: string,
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ): Promise<Response> {
    let finalUrl = buildFinalUrl(this.baseURL, url, queryParams);
    let finalOptions: RequestInit = { ...this.defaultOptions, ...options };

    applyInterceptors(this.interceptors.request, finalUrl, finalOptions);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(finalOptions.method || "GET", finalUrl, true);
      xhr.timeout = this.timeout;

      if (finalOptions.headers) {
        for (const [key, value] of Object.entries(finalOptions.headers)) {
          xhr.setRequestHeader(key, value as string);
        }
      }

      xhr.setRequestHeader("User-Agent", this.userAgent);

      if (onProgress) {
        xhr.onprogress = onProgress;
      }

      xhr.onload = async () => {
        let response: BlinkResponse = createResponse(
          xhr,
          finalUrl,
          this.userAgent,
        );

        for (const interceptor of this.interceptors.response) {
          const modifiedResponse = await interceptor(response);
          if (modifiedResponse) return resolve(modifiedResponse);
        }

        if (!response.ok)
          return reject(new Error(`HTTP error! Status: ${response.status}`));
        resolve(response);
      };

      xhr.onerror = () => reject(new Error("Network error"));
      xhr.ontimeout = () => reject(new Error("Request timed out"));
      xhr.send(finalOptions.body as Document | XMLHttpRequestBodyInit | null);
    });
  }

  protected get(
    url: string,
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ): Promise<Response> {
    return this.request(
      url,
      { ...options, method: "GET" },
      queryParams,
      onProgress,
    );
  }

  protected post(
    url: string,
    body: any,
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ): Promise<Response> {
    return this.request(
      url,
      {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json", ...options.headers },
      },
      queryParams,
      onProgress,
    );
  }

  protected put(
    url: string,
    body: any,
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ): Promise<Response> {
    return this.request(
      url,
      {
        ...options,
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json", ...options.headers },
      },
      queryParams,
      onProgress,
    );
  }

  protected delete(
    url: string,
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ): Promise<Response> {
    return this.request(
      url,
      { ...options, method: "DELETE" },
      queryParams,
      onProgress,
    );
  }

  protected patch(
    url: string,
    body: any,
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ): Promise<Response> {
    return this.request(
      url,
      {
        ...options,
        method: "PATCH",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json", ...options.headers },
      },
      queryParams,
      onProgress,
    );
  }

  protected head(
    url: string,
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ): Promise<Response> {
    return this.request(
      url,
      { ...options, method: "HEAD" },
      queryParams,
      onProgress,
    );
  }

  protected options(
    url: string,
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ): Promise<Response> {
    return this.request(
      url,
      { ...options, method: "OPTIONS" },
      queryParams,
      onProgress,
    );
  }

  protected trace(
    url: string,
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ): Promise<Response> {
    return this.request(
      url,
      { ...options, method: "TRACE" },
      queryParams,
      onProgress,
    );
  }
}

export default Client;
