# Blink HTTP

A fast, elegant and standalone HTTP client.

[![npm](https://img.shields.io/npm/v/blink-http)](https://www.npmjs.com/package/blink-http)
[![npm](https://img.shields.io/npm/dt/blink-http)](https://www.npmjs.com/package/blink-http)
[![CI](https://github.com/binary-blazer/blink-http/actions/workflows/ci.yml/badge.svg)](https://github.com/binary-blazer/blink-http/actions/workflows/ci.yml)

## Installation

You can install the package using npm, pnpm, yarn or bun.

```sh
npm install blink-http
# or
pnpm add blink-http
# or
yarn add blink-http
# or
bun install blink-http
```

## Usage

### Basic Usage

#### with BaseURL:
```javascript
import { BlinkClient } from 'blink-http';

const blink = new BlinkClient({
    baseURL: 'https://jsonplaceholder.typicode.com', // is optional
    timeout: 10000, // is optional
    userAgent: 'custom-user-agent' // is optional
});

const response = await blink.get('/posts/1');
console.log(await response.json()); // return response as JSON
```

#### without BaseURL:
```javascript
import { BlinkClient } from 'blink-http';

const blink = new BlinkClient({
    timeout: 10000, // is optional
    userAgent: 'custom-user-agent' // is optional
});

const response = await blink.get('https://jsonplaceholder.typicode.com/posts/1');
console.log(await response.json()); // return response as JSON
```

## Methods

- **`get`**
  ```typescript
  get(url: string, options?: Omit<RequestInit, "body" | "method">, queryParams?: Record<string, string>, onProgress?: (event: ProgressEvent) => void): Promise<Response>
  ```

- **`post`**
  ```typescript
  post(url: string, body: any, options?: Omit<RequestInit, "body" | "method">, queryParams?: Record<string, string>, onProgress?: (event: ProgressEvent) => void): Promise<Response>
  ```

- **`put`**
  ```typescript
  put(url: string, body: any, options?: Omit<RequestInit, "body" | "method">, queryParams?: Record<string, string>, onProgress?: (event: ProgressEvent) => void): Promise<Response>
  ```

- **`delete`**
  ```typescript
  delete(url: string, options?: Omit<RequestInit, "body" | "method">, queryParams?: Record<string, string>, onProgress?: (event: ProgressEvent) => void): Promise<Response>
  ```

- **`patch`**
  ```typescript
  patch(url: string, body: any, options?: Omit<RequestInit, "body" | "method">, queryParams?: Record<string, string>, onProgress?: (event: ProgressEvent) => void): Promise<Response>
  ```

- **`head`**
  ```typescript
  head(url: string, options?: Omit<RequestInit, "body" | "method">, queryParams?: Record<string, string>, onProgress?: (event: ProgressEvent) => void): Promise<Response>
  ```

- **`options`**
  ```typescript
  options(url: string, options?: Omit<RequestInit, "body" | "method">, queryParams?: Record<string, string>, onProgress?: (event: ProgressEvent) => void): Promise<Response>
  ```

- **`trace`**
  ```typescript
  trace(url: string, options?: Omit<RequestInit, "body" | "method">, queryParams?: Record<string, string>, onProgress?: (event: ProgressEvent) => void): Promise<Response>
  ```

## Examples

### GET Request

```javascript
const response = await blink.get('https://jsonplaceholder.typicode.com/posts/1');
console.log(response.json());
```

### POST Request

```javascript
const response = await blink.post('https://jsonplaceholder.typicode.com/posts', { title: 'foo', body: 'bar', userId: 1 });
console.log(response.json());
```

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](LICENSE) file for details.
