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

## Sample output

All output below assumes the following markup:

```html
<div class="demo">
  <ul>
    <li></li>
    <li></li>
    <li>
      <a href="linkOne" class="linkOne"></a>
      <a href="linkTwo" class="linkTwo"></a>
      <a href="linkThree" class="linkThree"></a>
    </li>
  </ul>
  <ul>
    <li class="itemOne first">
      <a href="linkOne" class="linkOne"></a>
      <a href="linkTwo" class="linkTwo"></a>
      <a href="linkThree" class="linkThree"></a>
    </li>
    <li class="itemTwo" id="list-item-two">
      <a href="linkOne" class="list-item-two-link-one"></a>
      <a href="linkTwo"></a>
      <a href="linkThree"></a>
      <a></a>
      <a href="linkOne" class="classOne classTwo classThree"></a>
      <a href="linkTwo" target="someTarget2" rel="someRel" class="classOne classTwo classThree"></a>
      <a href="linkThree" target="someTarget" rel="someRel" class="classOne classTwo classThree" id="linkZero"></a>
    </li>
    <li class="itemThree last">
      <a href="linkOne" id="linkOne" class="classOne classTwo classThree"></a>
      <a href="linkTwo" id="linkTwo"></a>
      <a href="linkThree" id="linkThree"></a>
    </li>
  </ul>
</div>
```

***

Basic usage:

```js
getSelector(document.querySelector('.demo li.last'))
```

```
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(3)
```

***

Invalid element:

```js
getSelector(document.querySelector('#i-do-not-exist'))
```

```
false
```

***

Closest descendant with an ID attribute:

```js
getSelector(document.querySelector('.demo .list-item-two-link-one'))
```

```
#list-item-two > a:nth-child(1)
```

***

Build selector from document Element if no ancestors have an id:

```js
getSelector(document.querySelector('.demo .linkThree'))
```

```
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(3)
```

***

Build a unique selector for any DOM element:

```js
.demo *
```

```
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(1)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(1) > li:nth-child(1)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(1) > li:nth-child(2)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(1) > li:nth-child(3)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(2)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(3)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(2)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(1)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(2)
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(3)
#list-item-two
#list-item-two > a:nth-child(1)
#list-item-two > a:nth-child(2)
#list-item-two > a:nth-child(3)
#list-item-two > a:nth-child(4)
#list-item-two > a:nth-child(5)
#list-item-two > a:nth-child(6)
#linkZero
html > body > main:nth-child(3) > div:nth-child(4) > ul:nth-child(2) > li:nth-child(3)
#linkOne
#linkTwo
#linkThree
```
