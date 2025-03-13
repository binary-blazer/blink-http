import { blink } from '../distribution/index.js';

async function test() {
  const response = await blink.get('https://jsonplaceholder.typicode.com/posts/1');
  console.log(await response.json());
}

test();