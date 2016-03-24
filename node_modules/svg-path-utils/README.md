# svg-path-utils 
[![Build Status](https://travis-ci.org/krispo/svg-path-utils.svg?branch=master)](https://travis-ci.org/krispo/svg-path-utils)
[![NPM Version](http://img.shields.io/npm/v/svg-path-utils.svg?style=flat)](https://www.npmjs.org/package/svg-path-utils)

Some utilities for svg [path](https://www.w3.org/TR/SVG/paths.html) element to help operating with [path data](https://www.w3.org/TR/SVG/paths.html#PathData), 
like calculating inverse path data...

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
then
```js
// generate path data
const d = utils.join(utils.M(50,100), utils.L(200,300), utils.Z()); // d = "M50,100 L200,300 Z"

// calculate inverse path data
const inverse_d = utils.inversePath(d); // inverse_d = "M200,300 L50,100 Z"
```

## Example
Inverse path data calculation

| Direct Path   | Inverse Path  |
|:-------------:|:-------------:|
| <img src="http://i.imgur.com/yiqwvS7.png" width="250"> | <img src="http://i.imgur.com/V2xjCfK.png" width="250"> |
| `d="M50,300 L50,250 C50,150 75,150 100,250 C150,450 200,450 200,250 Q200,100 400,100"`  | `d="M400,100 Q200,100 200,250 C200,450 150,450 100,250 C75,150 50,150 50,250 L50,300"`|

Check this [online demo](http://plnkr.co/edit/rIhZfI?p=preview).

It is also used in [Yarrow](http://krispo.github.io/yarrow/).

## API Reference

#### Path data commands (operators) 

Uppercase (M, L, H, ...) - uses absolute coordinates, lowercase (m, l, h, ...) - uses relative coordinates

<a name="utils_M" href="#utils_M">#</a> <i>utils</i>.<b>M</b>(<i>x</i>, <i>y</i>) - [“moveto” commands](http://www.w3.org/TR/SVG/paths.html#PathDataMovetoCommands).

<a name="utils_m" href="#utils_m">#</a> <i>utils</i>.<b>m</b>(<i>x</i>, <i>y</i>) 

<a name="utils_L" href="#utils_L">#</a> <i>utils</i>.<b>L</b>(<i>x</i>, <i>y</i>) - [“lineto” commands](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands).

<a name="utils_l" href="#utils_l">#</a> <i>utils</i>.<b>l</b>(<i>x</i>, <i>y</i>)

<a name="utils_H" href="#utils_H">#</a> <i>utils</i>.<b>H</b>(<i>x</i>) - horizontal [“lineto” commands](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands).

<a name="utils_h" href="#utils_h">#</a> <i>utils</i>.<b>h</b>(<i>x</i>)

<a name="utils_V" href="#utils_V">#</a> <i>utils</i>.<b>V</b>(<i>y</i>) - vertical [“lineto” commands](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands).

<a name="utils_v" href="#utils_v">#</a> <i>utils</i>.<b>v</b>(<i>y</i>)

<a name="utils_C" href="#utils_C">#</a> <i>utils</i>.<b>C</b>(<i>x1</i>, <i>y1</i>, <i>x2</i>, <i>y2</i>, <i>x</i>, <i>y</i>) - [cubic Bézier curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands).

<a name="utils_c" href="#utils_c">#</a> <i>utils</i>.<b>c</b>(<i>x1</i>, <i>y1</i>, <i>x2</i>, <i>y2</i>, <i>x</i>, <i>y</i>)

<a name="utils_S" href="#utils_S">#</a> <i>utils</i>.<b>S</b>(<i>x2</i>, <i>y2</i>, <i>x</i>, <i>y</i>) - smooth [cubic Bézier curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands).

<a name="utils_s" href="#utils_s">#</a> <i>utils</i>.<b>s</b>(<i>x2</i>, <i>y2</i>, <i>x</i>, <i>y</i>)

<a name="utils_Q" href="#utils_Q">#</a> <i>utils</i>.<b>Q</b>(<i>x1</i>, <i>y1</i>, <i>x</i>, <i>y</i>) - [quadratic Bézier curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataQuadraticBezierCommands).

<a name="utils_q" href="#utils_q">#</a> <i>utils</i>.<b>q</b>(<i>x1</i>, <i>y1</i>, <i>x</i>, <i>y</i>)

<a name="utils_T" href="#utils_T">#</a> <i>utils</i>.<b>T</b>(<i>x</i>, <i>y</i>) - smooth [quadratic Bézier curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataQuadraticBezierCommands).

<a name="utils_t" href="#utils_t">#</a> <i>utils</i>.<b>t</b>(<i>x</i>, <i>y</i>)

<a name="utils_Z" href="#utils_Z">#</a> <i>utils</i>.<b>Z</b>(<i></i>) - [“closepath” commands](http://www.w3.org/TR/SVG/paths.html#PathDataClosePathCommand).

<a name="utils_z" href="#utils_z">#</a> <i>utils</i>.<b>z</b>(<i></i>)

> Todo: add .A(...) and .a(...) - [elliptical arc curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands).

Example of usage:

```js
utils.M(50,100)            // return: "M50,100"
utils.L(200,300)           // return: "L200,300"
utils.c(10,20,30,40,50,60) // return: "c10,20 30,40 50,60"
utils.Z()                  // return: "Z" 
```

#### Path data utils 

<a name="utils_parse" href="#utils_parse">#</a> <i>utils</i>.<b>parse</b>(<i>d</i>)

Parse path data *d* into sequence of operators ['M', 'L', ...] and sequence of principal points [*(x,y)*].

```js
utils.parse("M50,100 L200,300 H100"); 
/* 
return: 
  { 
    operators: ["M", "L", "H"], 
    points: [
      {x: 50, y: 100}, 
      {x: 200, y: 300},  
      {x: 100}
    ]
  }
*/  
```

<a name="utils_generate" href="#utils_generate">#</a> <i>utils</i>.<b>generate</b>({ operators: <i>[operators]</i>, points: <i>[points]</i>})

Generate path data *d* from a sequence of operators ['M', 'L', ...] and sequence of principal points [*(x,y)*].

```js
const data = { 
  operators: ["M", "L", "H"], 
  points: [
    {x: 50, y: 100}, 
    {x: 200, y: 300},  
    {x: 100}
  ]
}
utils.generate(data); // return: "M50,100 L200,300 H100"
```

<a name="utils_inversePath" href="#utils_inversePath">#</a> <i>utils</i>.<b>inversePath</b>(<i>d</i>)

Calculate and return inverse path data for path data *d*. 

```js
utils.inversePath("M50,100 L200,300 Z"); // return: "M200,300 L50,100 Z"
```

<a name="utils_join" href="#utils_join">#</a> <i>utils</i>.<b>join</b>(<i>args</i>)

Join input args into a string with space (' ') separator.

```js
utils.join("M50,100", "L200,300", "Z");                     // return: "M50,100 L200,300 Z"
utils.join(utils.M(50,100), utils.L(200,300), utils.Z());   // return: "M50,100 L200,300 Z"
```

## Licence
MIT