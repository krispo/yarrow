# svg-path-utils
[![NPM Version](http://img.shields.io/npm/v/svg-path-utils.svg?style=flat)](https://www.npmjs.org/package/svg-path-utils)

Some svg utilities for `path` element like to calculate inverse path, or the first/second derivative at a point on a path, ...

## Install 

    npm install svg-path-utils
    
## Usage

```js
var spu = require('svg-path-utils');
var utils = new spu.SVGPathUtils();
```
or in es6
```js
import {SVGPathUtils} from 'svg-path-utils';
const utils = new SVGPathUtils();
```

## Example
Reverse path calculation

| Direct Path   | Inverse Path  |
|:-------------:|:-------------:|
| <img src="http://i.imgur.com/yiqwvS7.png" width="250"> | <img src="http://i.imgur.com/V2xjCfK.png" width="250"> |
| `d="M50,300 L50,250 C50,150 75,150 100,250 C150,450 200,450 200,250 Q200,100 400,100"`  | `d="M400,100 Q200,100 200,250 C200,450 150,450 100,250 C75,150 50,150 50,250 L50,300"`|

```js
var new_d = utils.inversePath(d);
```
Check also [online demo](http://plnkr.co/edit/rIhZfI?p=preview).

## API Reference

We can generate and parse `d` string attribute, calculate inverse path, the first/second derivatives at a specific point on a path,..

uppercase (M) - absolute coordinates, lowercase (m) - relative coordinates

Path operators: 

* .M(x,y) - moveto
* .m(x,y) 
* .L(x,y) - lineto
* .l(x,y)
* .H(x) - horizontal lineto
* .h(x)
* .V(y) - vertical lineto
* .v(y)
* .C(x1,y1,x2,y2,x,y) - cubic bezier curveto
* .c(x1,y1,x2,y2,x,y)
* .S(x2,y2,x,y) - smooth cubic bezier curveto
* .s(x2,y2,x,y)
* .Q(x1,y1,x,y) - quadratic bezier curveto
* .q(x1,y1,x,y)
* .T(x,y) - smooth quadratic bezier
* .t(x,y)
* .Z() - close path
* .z()

> Todo: add .A(...) and .a(...) - elliptical arc.

Path utils: 

* .parse(*d*) - parse *d* string into sequence of operators ['M', 'L', ...] and sequence of principal points [*(x,y)*]
* .generate({ operators: [*(operators)*], points: [*(points)*]}) - generate *d* string from a sequence of operators ['M', 'L', ...] and sequence of principal points [*(x,y)*]
* .inversePath(*d*) - calculate and return *d* string of inverse path
* .join(*args*) - join input args into a string with space (' ') separator.
...

## Licence
MIT