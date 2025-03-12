import { BlinkClient } from '../distribution/index.js';

// Create a new instance of BlinkClient
const blink = new BlinkClient({
  // Optional: Set the base URL for all requests
  // baseURL: 'https://jsonplaceholder.typicode.com',

  // Optional: Set the timeout for all requests
  timeout: 10000,
});

// Example GET request
const response = blink.get('https://jsonplaceholder.typicode.com/posts/1', {
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});
// With the base URL set, you can make requests without specifying the full URL
// const response = blink.get('/posts/1', {
//   headers: {
//     'Content-Type': 'application/json',
//     'accept': 'application/json',
//   },
// });

// Log the response data
response.then(async (data) => {
  // console.log("Raw Response Data:", data);
  // console.log("\nResponse Data:", await data.json());

  const json = await data.json();
  console.log(json);
});