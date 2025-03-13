import { blink } from '../distribution/index.js';

// Example GET request
const response = await blink.get('https://jsonplaceholder.typicode.com/posts/1');

// Log the response data
console.log(await response.json());