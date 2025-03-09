import Client from "./core/client";

class BlinkClient extends Client {
  constructor(baseURL: string = "") {
    super(baseURL);
  }

  /**
   * Send a GET request to the specified URL
   * @param url The URL to send the request to
   * @param options The options to use for the request
   * @returns The response from the request
   * @throws Error if the request fails
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
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
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * try {
   *  const response = await blink.get('/posts/1');
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public get(url: string, options: RequestInit = {}) {
    return super.get(url, options);
  }

  /**
   * Send a DELETE request to the specified URL
   * @param url The URL to send the request to
   * @param options The options to use for the request
   * @returns The response from the request
   * @throws Error if the request fails
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
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
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * try {
   *  const response = await blink.delete('/posts/1');
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public delete(url: string, options: RequestInit = {}) {
    return super.delete(url, options);
  }

  /**
   * Send a POST request to the specified URL
   * @param url The URL to send the request to
   * @param body The body of the request
   * @param options The options to use for the request
   * @returns The response from the request
   * @throws Error if the request fails
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
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
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * try {
   *  const response = await blink.post('/posts', { title: 'foo', body: 'bar', userId: 1 });
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public post(url: string, body: any, options: RequestInit = {}) {
    return super.post(url, body, options);
  }

  /**
   * Send a PUT request to the specified URL
   * @param url The URL to send the request to
   * @param body The body of the request
   * @param options The options to use for the request
   * @returns The response from the request
   * @throws Error if the request fails
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
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
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * try {
   *  const response = await blink.put('/posts/1', { id: 1, title: 'foo', body: 'bar', userId: 1 });
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public put(url: string, body: any, options: RequestInit = {}) {
    return super.put(url, body, options);
  }

  /**
   * Send a PATCH request to the specified URL
   * @param url The URL to send the request to
   * @param body The body of the request
   * @param options The options to use for the request
   * @returns The response from the request
   * @throws Error if the request fails
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
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
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * try {
   *  const response = await blink.patch('/posts/1', { title: 'foo' });
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public patch(url: string, body: any, options: RequestInit = {}) {
    return super.patch(url, body, options);
  }

  /**
   * Send a HEAD request to the specified URL
   * @param url The URL to send the request to
   * @param options The options to use for the request
   * @returns The response from the request
   * @throws Error if the request fails
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * const response = await blink.head('/posts/1');
   * console.log(response.headers);
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * try {
   *  const response = await blink.head('/posts/1');
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public head(url: string, options: RequestInit = {}) {
    return super.head(url, options);
  }

  /**
   * Send an OPTIONS request to the specified URL
   * @param url The URL to send the request to
   * @param options The options to use for the request
   * @returns The response from the request
   * @throws Error if the request fails
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * const response = await blink.options('/posts/1');
   * console.log(response.headers);
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * try {
   *  const response = await blink.options('/posts/1');
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public options(url: string, options: RequestInit = {}) {
    return super.options(url, options);
  }

  /**
   * Send a TRACE request to the specified URL
   * @param url The URL to send the request to
   * @param options The options to use for the request
   * @returns The response from the request
   * @throws Error if the request fails
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * const response = await blink.trace('/posts/1');
   * console.log(response.headers);
   * @example
   * import { BlinkClient } from 'blink-http';
   * 
   * const blink = new BlinkClient('https://jsonplaceholder.typicode.com');
   * 
   * try {
   *  const response = await blink.trace('/posts/1');
   *  console.log(response);
   * } catch (error) {
   *  console.error(error);
   * }
   */
  public trace(url: string, options: RequestInit = {}) {
    return super.trace(url, options);
  }
}

export { BlinkClient };