////////////////////////
// Callbacks
////////////////////////

// The problem is inversion of control (more than callback hell).

////////////////////////
// Promises
////////////////////////

// --------------------
// Basic example
// --------------------

const simplePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo1");
  }, 100);
});
console.log("simplePromise", simplePromise);
// function(resolve, reject) is called the executor.
// 💡💡💡 We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed. That means: we decide on resolve or reject. Makes sense: *we* decide what is defined as success and failure!

// can't "resolve then reject" a promise

// In reality it will look more like:
// new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//     xhr.onload = () => resolve(xhr.responseText);
//     xhr.onerror = () => reject(xhr.statusText);
//     xhr.send();
//   });

simplePromise
  .then(
    value => console.log("value:", value)
    // 💡 value is whatever we passed in the resolve(...) function above
    // expected output: "foo"
  )
  .catch(error => console.log("error:", error));

// --------------------
// Promise API:
// --------------------

// resolve and reject (called with a VALUE as arg):
// --------------------

// Usage 1: See example above when they're used within the executor.
// Usage 2: "Promise.resolve(value) for 2-in-1 effect". Creates+returns a new promise (that resolves with the given value). "Generally, if you don't know if a value is a promise or not, Promise.resolve(value) it instead. And work with the return value as a promise." Useful to create the return value of an async function. For example when the return value depends on conditions, one of them is async and the other is not really, but we want the result of an async function to be THENABLE in both cases.
// Example:

const promiseCreator = () => Promise.resolve("foo2");
console.log("promiseCreator", promiseCreator());
promiseCreator().then(value => console.log("value:", value));

// --------------------
// all and race (called with an ITERABLE as arg):

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1");
  }, 100);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2");
  }, 200);
});

// all and race are very similar BUT for the argument of the callback: array vs. single value (values vs value).
// don't forget the then of course!!
Promise.all([p1, p2]).then(values => values.map(v => console.log(v)));
Promise.race([p1, p2]).then(value => console.log(value));

// --------------------
// catch, then, finally ----- return a new Promise

// Create a new promise? x = new Promise((resolve, reject) => { settimeout(resolve("hi"), 2000)})
// Get the result of a promise?

// Link between promise and async???
// main diffs between promise and async aka one is not cancellable

// Main promise methods:

// const newBlockHashCheck = await blockchain.api.rpc.chain .getBlockHash(newCheckBlockNumber) .then(block => { return block.toHex() })

// function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });
// }

// async function asyncCall() {
//   console.log('calling');
//   var result = await resolveAfter2Seconds();
//   console.log(result);
//   // expected output: 'resolved'
// }

// asyncCall();

// ---
// function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(33);
//     }, 200);
//   });
// }

// async function getLastBlock() {
//   console.log('calling');
//   var result = await resolveAfter2Seconds();
//   console.log(result);
//   return result;
//   // expected output: 'resolved'
// }

// async function isBlockStateDifferent() {
//   return await getLastBlock() < 34;
// }

// async function main() {
//  console.log("isBlockStateDifferent", await isBlockStateDifferent());
// }

// main();

// ----
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// 000
// https://javascript.info/async-await
// 999
// can you do &&?
