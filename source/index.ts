import Client from "./client/index.js";
import { BlinkClientOptions } from "./interfaces";
import {
  BLINK_USER_AGENT,
  DEFAULT_TIMEOUT,
  DEFAULT_QUERY_PARAMS,
  DEFAULT_OPTIONS,
} from "./constants.js";

class BlinkClient extends Client {
  constructor(options: BlinkClientOptions = {}) {
    const {
      baseURL = "",
      timeout = DEFAULT_TIMEOUT,
      userAgent = BLINK_USER_AGENT,
    } = options;
    super(baseURL, {}, timeout, userAgent);
  }

  /**
   * Sends a GET request.
   * @param {string} url - The URL to send the request to.
   * @param {Omit<RequestInit, "body" | "method">} [options=DEFAULT_OPTIONS] - The options for the request.
   * @param {Record<string, string>} [queryParams=DEFAULT_QUERY_PARAMS] - The query parameters to append to the URL.
   * @param {(event: ProgressEvent) => void} [onProgress] - The progress event handler.
   * @returns {Promise<Response>} The response from the server.
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * const response = await blink.get('/posts/1');
   * console.log(response.json());
   * // {
   * //   userId: 1,
   * //   id: 1,
   * //   title: '...',
   * //   body: '...'
   * // }
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * try {
   *  const response = await blink.get('/posts/1');
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public get(
    url: string,
    options: Omit<RequestInit, "body" | "method"> = DEFAULT_OPTIONS,
    queryParams: Record<string, string> = DEFAULT_QUERY_PARAMS,
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.get(url, options, queryParams, onProgress);
  }

  /**
   * Sends a DELETE request.
   * @param {string} url - The URL to send the request to.
   * @param {Omit<RequestInit, "body" | "method">} [options=DEFAULT_OPTIONS] - The options for the request.
   * @param {Record<string, string>} [queryParams=DEFAULT_QUERY_PARAMS] - The query parameters to append to the URL.
   * @param {(event: ProgressEvent) => void} [onProgress] - The progress event handler.
   * @returns {Promise<Response>} The response from the server.
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * const response = await blink.delete('/posts/1');
   * console.log(response.json());
   * // {
   * //   userId: 1,
   * //   id: 1,
   * //   title: '...',
   * //   body: '...'
   * // }
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * try {
   *  const response = await blink.delete('/posts/1');
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public delete(
    url: string,
    options: Omit<RequestInit, "body" | "method"> = DEFAULT_OPTIONS,
    queryParams: Record<string, string> = DEFAULT_QUERY_PARAMS,
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.delete(url, options, queryParams, onProgress);
  }

  /**
   * Sends a POST request.
   * @param {string} url - The URL to send the request to.
   * @param {any} body - The body of the request.
   * @param {Omit<RequestInit, "body" | "method">} [options=DEFAULT_OPTIONS] - The options for the request.
   * @param {Record<string, string>} [queryParams=DEFAULT_QUERY_PARAMS] - The query parameters to append to the URL.
   * @param {(event: ProgressEvent) => void} [onProgress] - The progress event handler.
   * @returns {Promise<Response>} The response from the server.
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * const response = await blink.post('/posts', { title: 'foo', body: 'bar', userId: 1 });
   * console.log(response.json());
   * // {
   * //   userId: 1,
   * //   id: 101,
   * //   title: 'foo',
   * //   body: 'bar'
   * // }
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * try {
   *  const response = await blink.post('/posts', { title: 'foo', body: 'bar', userId: 1 });
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public post(
    url: string,
    body: any,
    options: Omit<RequestInit, "body" | "method"> = DEFAULT_OPTIONS,
    queryParams: Record<string, string> = DEFAULT_QUERY_PARAMS,
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.post(url, body, options, queryParams, onProgress);
  }

  /**
   * Sends a PUT request.
   * @param {string} url - The URL to send the request to.
   * @param {any} body - The body of the request.
   * @param {Omit<RequestInit, "body" | "method">} [options=DEFAULT_OPTIONS] - The options for the request.
   * @param {Record<string, string>} [queryParams=DEFAULT_QUERY_PARAMS] - The query parameters to append to the URL.
   * @param {(event: ProgressEvent) => void} [onProgress] - The progress event handler.
   * @returns {Promise<Response>} The response from the server.
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * const response = await blink.put('/posts/1', { id: 1, title: 'foo', body: 'bar', userId: 1 });
   * console.log(response.json());
   * // {
   * //   userId: 1,
   * //   id: 1,
   * //   title: 'foo',
   * //   body: 'bar'
   * // }
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * try {
   *  const response = await blink.put('/posts/1', { id: 1, title: 'foo', body: 'bar', userId: 1 });
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public put(
    url: string,
    body: any,
    options: Omit<RequestInit, "body" | "method"> = DEFAULT_OPTIONS,
    queryParams: Record<string, string> = DEFAULT_QUERY_PARAMS,
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.put(url, body, options, queryParams, onProgress);
  }

  /**
   * Sends a PATCH request.
   * @param {string} url - The URL to send the request to.
   * @param {any} body - The body of the request.
   * @param {Omit<RequestInit, "body" | "method">} [options=DEFAULT_OPTIONS] - The options for the request.
   * @param {Record<string, string>} [queryParams=DEFAULT_QUERY_PARAMS] - The query parameters to append to the URL.
   * @param {(event: ProgressEvent) => void} [onProgress] - The progress event handler.
   * @returns {Promise<Response>} The response from the server.
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * const response = await blink.patch('/posts/1', { title: 'foo' });
   * console.log(response.json());
   * // {
   * //   userId: 1,
   * //   id: 1,
   * //   title: 'foo',
   * //   body: 'bar'
   * // }
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * try {
   *  const response = await blink.patch('/posts/1', { title: 'foo' });
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public patch(
    url: string,
    body: any,
    options: Omit<RequestInit, "body" | "method"> = DEFAULT_OPTIONS,
    queryParams: Record<string, string> = DEFAULT_QUERY_PARAMS,
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.patch(url, body, options, queryParams, onProgress);
  }

  /**
   * Sends a HEAD request.
   * @param {string} url - The URL to send the request to.
   * @param {Omit<RequestInit, "body" | "method">} [options=DEFAULT_OPTIONS] - The options for the request.
   * @param {Record<string, string>} [queryParams=DEFAULT_QUERY_PARAMS] - The query parameters to append to the URL.
   * @param {(event: ProgressEvent) => void} [onProgress] - The progress event handler.
   * @returns {Promise<Response>} The response from the server.
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * const response = await blink.head('/posts/1');
   * console.log(response.headers);
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * try {
   *  const response = await blink.head('/posts/1');
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public head(
    url: string,
    options: Omit<RequestInit, "body" | "method"> = DEFAULT_OPTIONS,
    queryParams: Record<string, string> = DEFAULT_QUERY_PARAMS,
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.head(url, options, queryParams, onProgress);
  }

  /**
   * Sends an OPTIONS request.
   * @param {string} url - The URL to send the request to.
   * @param {Omit<RequestInit, "body" | "method">} [options=DEFAULT_OPTIONS] - The options for the request.
   * @param {Record<string, string>} [queryParams=DEFAULT_QUERY_PARAMS] - The query parameters to append to the URL.
   * @param {(event: ProgressEvent) => void} [onProgress] - The progress event handler.
   * @returns {Promise<Response>} The response from the server.
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * const response = await blink.options('/posts/1');
   * console.log(response.headers);
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * try {
   *  const response = await blink.options('/posts/1');
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public options(
    url: string,
    options: Omit<RequestInit, "body" | "method"> = DEFAULT_OPTIONS,
    queryParams: Record<string, string> = DEFAULT_QUERY_PARAMS,
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.options(url, options, queryParams, onProgress);
  }

  /**
   * Sends a TRACE request.
   * @param {string} url - The URL to send the request to.
   * @param {Omit<RequestInit, "body" | "method">} [options=DEFAULT_OPTIONS] - The options for the request.
   * @param {Record<string, string>} [queryParams=DEFAULT_QUERY_PARAMS] - The query parameters to append to the URL.
   * @param {(event: ProgressEvent) => void} [onProgress] - The progress event handler.
   * @returns {Promise<Response>} The response from the server.
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * const response = await blink.trace('/posts/1');
   * console.log(response.headers);
   * @example
   * import { BlinkClient } from 'blink-http';
   *
   * const blink = new BlinkClient({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 2000 });
   *
   * try {
   *  const response = await blink.trace('/posts/1');
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public trace(
    url: string,
    options: Omit<RequestInit, "body" | "method"> = DEFAULT_OPTIONS,
    queryParams: Record<string, string> = DEFAULT_QUERY_PARAMS,
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.trace(url, options, queryParams, onProgress);
  }
}

export { BlinkClient };
