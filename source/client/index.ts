import { Interceptor, ResponseInterceptor, BlinkResponse } from "../interfaces";
import {
  BLINK_USER_AGENT,
  DEFAULT_TIMEOUT,
  DEFAULT_OPTIONS,
} from "../constants.js";
import { buildFinalUrl, applyInterceptors } from "../utils";

// @ts-ignore: WebAssembly module
import { http_request } from "../core/core.js";

class Client {
  protected baseURL: string;
  protected defaultOptions: RequestInit;
  protected interceptors: {
    request: Interceptor[];
    response: ResponseInterceptor[];
  };
  protected timeout: number;
  protected userAgent: string;

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
    _onProgress?: (event: ProgressEvent) => void,
  ): Promise<Response> {
    let finalUrl = buildFinalUrl(this.baseURL, url, queryParams);
    let finalOptions: RequestInit = { ...this.defaultOptions, ...options };

    applyInterceptors(this.interceptors.request, finalUrl, finalOptions);

    return new Promise((resolve, reject) => {
      http_request(
        finalOptions.method || "GET",
        finalUrl,
        finalOptions,
        this.userAgent,
      )
        .then((response: BlinkResponse) => {
          for (const interceptor of this.interceptors.response) {
            const modifiedResponse = interceptor(response);
            if (modifiedResponse) return resolve(modifiedResponse);
          }

          if (!response.ok)
            return reject(new Error(`HTTP error! Status: ${response.status}`));
          resolve(response);
        })
        .catch((error: Error) => {
          reject(error);
        });
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
