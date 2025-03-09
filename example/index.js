import { BlinkClient } from '../distribution/index.js';

const blink = new BlinkClient(); // Create a new instance of BlinkClient
// you can also create a new instance of BlinkClient with a base URL:
// const blink = new BlinkClient('https://jsonplaceholder.typicode.com');

// Make a GET request to the JSONPlaceholder API
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
  console.log("Raw Response Data:", data);
  console.log("\nResponse Data:", await data.json());
});