# `the-wheel`

[![npm (scoped)](https://img.shields.io/npm/v/the-wheel.svg)](https://www.npmjs.com/package/the-wheel)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![Build Status](https://travis-ci.com/SivanMehta/the-wheel.svg?branch=master)](https://travis-ci.com/SivanMehta/the-wheel)

## Usage

```
npm install the-wheel
```

### `For`

Let's say you wanted to write this `for` loop without iteration:

```js
let sum = 0;
for(let i = 0; i < 10; i = i + 1) {
  sum = sum + i;
}
```

Now you can write this "clearer" implementation instead:

```js
const { For } = require('the-wheel');

let sum = 0;

function condition(iterator) {
  return iterator < 10;
}

function step(iterator) {
  return iterator + 1;
}

function body(iterator) {
  sum = sum + iterator;
}

For(0, condition, step, body);
```

Or if you want to write it more compactly in a form similar to an actual `for` loop:

```js
const { For } = require('the-wheel');

let sum = 0;
For(0, i => i < 10, i => i += 1, i => {
  sum += i;
});
```

What if you want to reflect the `break` and `continue` implemented in native loops?
Given that the `body` functions don't need return anything, you take advantage of
this by `return`-ing special cases.

A simple `return` is the same as a native `continue`:

```js
// only log even numbers

for(let i = 0; i < 10; i ++) {
  if(i % 2 != 0) {
    continue;
  }

  console.log(i);
}

For(0, i => i < 10, i => i += 1, i => {
  if(i % 2 != 0) {
    return;
  }

  console.log(i);
});
```

You can also implement a `break` in this way by returning something from
your `body` function.

```js
// linear search
const target = 'Carmen Sandiego';
let where;

for(let i = 0; i < world.length; i ++) {
  if(world[i] === target) {
    where = i;
    break;
  }
}

For(0, i => i < world.length; i => i + 1, i => {
  if(world[i] === target) {
    where = i;
    return 1;
  }
});
```

### `While`

`While` has a very similar usage to `For`

```js
let sum = 0;
let i = 0;

while(i < 10) {
  sum += i;
}
```

Can in turn be written as follows

```js
const { While } = require('the-wheel');

let sum = 0;
let i = 0;

function condition() {
  return i < 10;
}

function body() {
  sum += i;
  i += 1;
}

While(condition, body);
```

Or more succinctly as

```js
While(() => i < 10, () => {
  sum += i;
  i += 1;
});
```

You can implement `break` and `continue` in the same manner as a `For` loop
by performing `return` in your `body` function.

## Tests

```
npm test
```
