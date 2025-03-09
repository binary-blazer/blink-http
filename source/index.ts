import Client from "./core/client.js";
import { BlinkClientOptions } from "./interfaces";

class BlinkClient extends Client {
  constructor(options: BlinkClientOptions = {}) {
    const { baseURL = "", timeout = 0 } = options;
    super(baseURL, {}, timeout);
  }

  /**
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
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.get(url, options, queryParams, onProgress);
  }

  /**
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
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.delete(url, options, queryParams, onProgress);
  }

  /**
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
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.post(url, body, options, queryParams, onProgress);
  }

  /**
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
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.put(url, body, options, queryParams, onProgress);
  }

  /**
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
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.patch(url, body, options, queryParams, onProgress);
  }

  /**
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
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.head(url, options, queryParams, onProgress);
  }

  /**
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
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.options(url, options, queryParams, onProgress);
  }

  /**
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
    options: RequestInit = {},
    queryParams: Record<string, string> = {},
    onProgress?: (event: ProgressEvent) => void,
  ) {
    return super.trace(url, options, queryParams, onProgress);
  }
}

export { BlinkClient };
