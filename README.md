# Blink HTTP

A tiny and standalone HTTP/HTTPS client based on the FETCH API.

## Installation

You can install the package using npm or pnpm:

```sh
npm install blink-http
# or
pnpm add blink-http
```

## Usage

### Basic Usage

```javascript
import { BlinkClient } from 'blink-http';

const blink = new BlinkClient('https://jsonplaceholder.typicode.com');

const response = await blink.get('/posts/1');
console.log(await response.json());
```

### Methods

- `get(url: string, options?: RequestInit): Promise<Response>`
- `post(url: string, body: any, options?: RequestInit): Promise<Response>`
- `put(url: string, body: any, options?: RequestInit): Promise<Response>`
- `delete(url: string, options?: RequestInit): Promise<Response>`
- `patch(url: string, body: any, options?: RequestInit): Promise<Response>`
- `head(url: string, options?: RequestInit): Promise<Response>`
- `options(url: string, options?: RequestInit): Promise<Response>`
- `trace(url: string, options?: RequestInit): Promise<Response>`

## Examples

### GET Request

```javascript
const response = await blink.get('/posts/1');
console.log(await response.json());
```

### POST Request

```javascript
const response = await blink.post('/posts', { title: 'foo', body: 'bar', userId: 1 });
console.log(await response.json());
```

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](LICENSE) file for details.
