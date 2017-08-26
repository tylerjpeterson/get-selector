![100% test coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

# get-selector
> Generates a unique CSS selector that will match only the passed element.

Browser-based utility to generate a unique selector for a given element.
There are more comprehensive (and therefore often slower) solutions out there 
that will retrieve the _smallest_ selector possible, but that comes at the price 
of complexity and usually accuracy.

This one prioritizes speed and accuracy.
If you have an invalid DOM, results will vary.
If you have duplicate or invalid `id` attributes, results will _really_ vary.

***

## How it works

Check if the element has an `id` attribute
- If it does, return it and we're done.
- If the element does not have an `id`...

Traverse the element's ancestry
- It searches for its closest ancestor with an `id` attribute.
- If found, it builds the selector to that ancestor and no further.
- If no ancestor with an `id` is found...

Build the selector to `<html>`
- This ensures a unique selector composed of `nth-child` sub-selectors.

***

## Installation
Install via npm.

```sh
$ npm i get-selector --save
```

***

## Usage
Require and call when needed.
The function will return false if the passed element is not valid.
Otherwise it will return the selector as a string.

```js
var getSelector = require('get-selector');

console.log(getSelector(someElement));
// Outputs something like:
// 	#list-item-two > a:nth-child(1)
```

***

## Documentation
Build jsdoc-based documentation:

```sh
$ npm run docs
```

***

## Tests and coverage
Run tests and coverage:

```sh
$ npm test
$ npm run coverage
```
