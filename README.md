# Week 4 - Callbacks and Promises

This is my Week 4 homework for Sundsgården Backend Development.

In this assignment I practiced callbacks, async code, Promises and `fetch()`.

The main file is:

```text
promises.ts
```

## What I practiced

- callback functions
- arrow functions
- `setTimeout()`
- callbacks that return values
- Promises
- `.then()`
- `.catch()`
- `fetch()`
- API data
- fixing TypeScript errors

## Skill 1 - Order Confirmation

I made a function that takes an item and a callback.

After the order is placed, the callback runs.

```ts
type OrderCallback = () => void;
```

I learned that a callback is a function that can be passed into another function.

## Skill 2 - Countdown Timer

I used `setTimeout()` to wait before running a callback.

I first made a mistake and used:

```ts
seconds: string
```

but it needed to be:

```ts
seconds: number
```

I also wrote:

```ts
callback;
```

instead of:

```ts
callback();
```

The code compiled, but the callback did not run.

This helped me understand that `callback` is the function, while `callback()` runs it.

## Skill 3 - Temperature Converter

I made callbacks that return numbers.

I converted Celsius to Fahrenheit and Kelvin.

At first I wrote:

```ts
return callback;
```

but I needed to actually call it:

```ts
return callback(celsius);
```

## Skill 4 - Promises

I created my own Promise to check if an item is in stock.

I used:

```ts
resolve()
```

for success and:

```ts
reject()
```

for failure.

I also used:

```ts
.then()
.catch()
```

At first I tried:

```ts
resolve(true);
```

but my Promise was:

```ts
Promise<string>
```

so I changed it to return text instead.

## Skill 5 - Fetch API

I used `fetch()` to get advice from an API.

I created a type for the returned data:

```ts
type AdviceSlipType = {
  slip: {
    id: number;
    advice: string;
  };
};
```

I first used:

```ts
id: string
```

but I was calling the function with numbers, so I changed it to:

```ts
id: number
```

I also first tried:

```ts
data.id
data.advice
```

but the values were inside `slip`.

So I changed it to:

```ts
data.slip.id
data.slip.advice
```

I also noticed that the API results do not always print in the same order because the requests are asynchronous.

## What I learned

This homework helped me understand callbacks and Promises better.

I also learned that TypeScript can catch many mistakes before I run the program, but some logic mistakes can still compile.

I kept some of my first attempts and fixes in Git commits so I can see what I changed while learning.

## How to run

Compile:

```bash
npx tsc promises.ts
```

Run:

```bash
node promises.js
```

## Branch

This assignment is on:

```text
week4/promises
```

## Files

```text
promises.ts
README.md
.gitignore
```

## Author

Snezana Kragujevac

Sundsgården Backend Development