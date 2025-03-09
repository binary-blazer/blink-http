import { BlinkClient } from '../distribution/index.js';

const blink = new BlinkClient('https://jsonplaceholder.typicode.com');

const response = blink.get('/posts/1');
response.then((data) => {
  console.log("Raw Response Data:", data);
  console.log("\nResponse Data:", data.json());
});