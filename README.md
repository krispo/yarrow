# Yarrow
[![Build Status](https://travis-ci.org/krispo/yarrow.svg?branch=master)](https://travis-ci.org/krispo/yarrow)
[![NPM Version](http://img.shields.io/npm/v/yarrow.svg?style=flat)](https://www.npmjs.org/package/yarrow)

SVG based animated arrow pointer. 

## Install

    npm install yarrow

or include it in html `head` section directly:

    <link href="//raw.githack.com/krispo/yarrow/v1.1.0/build/yarrow.css" rel="stylesheet" type="text/css"/>
    <script src="//d3js.org/d3-selection.v0.6.min.js"></script>
    <script src="//raw.githack.com/krispo/svg-path-utils/v0.0.2/build/svg-path-utils.min.js"></script>
    <script src="//raw.githack.com/krispo/yarrow/v1.1.0/build/yarrow.min.js"></script>
  
## Usage

```js
// for es6
import {Yarrow} from 'yarrow';
var yarrow = new Yarrow();

// or in older versions use require:
// var Yarrow = require('yarrow');
// var yarrow = new Yarrow.Yarrow(); 

// add new arrow
var arrow = yarrow.arrow({
  x1: 0,                // source x coordinate
  y1: 0,                // source y coordinate
  x2: 100,              // target x coordinate
  y2: 100,              // target y coordinate
  text: "I'm arrow!"    // arrow label    
});

// render arrow on the page
arrow.render();

// dispose arrow with duration=1000 after delay=500
arrow.dispose(1000, 500);
```   

the same with chaining notation:

```js
yarrow.arrow({...}).render().dispose(1000, 500);
```

## API Reference

### Yarrow
Yarrow is a container of `arrows`.

#### .arrow(*opts*)
Create new arrow with specified options. Returns created arrow.

#### .arrows([*opts*])
Create multiple arrows with specified options at a time. If *opts* are not specified, returns the current array of *arrow*.  

#### .renderAll()
Render all arrows at a time.

#### .disposeAll(duration, delay)
Dispose all arrows with specified *duration*, and after specified *delay* time. Arrows are removed completely.

### Arrow
Single arrow instance. Available options are listed below.

#### .render()
Render the current arrow.

#### .dispose(duration, delay)
Dispose the current arrow with specified *duration*, and after specified *delay* time. The arrow is removed completely.

#### .*option_name*(*option_value*)
*option_name* can take any option from available list of options *opts* (except `READ ONLY` properties). If *option_value* is not specified, returns current option value.

### *opts*
Available arrow options:

* **x1** &mdash; source x coordinate
* **y1** &mdash; source y coordinate
* **x2** &mdash; target x coordinate
* **y2** &mdash; target y coordinate

* **dx** &mdash; `READ ONLY` property, equals (x2 - x1)
* **dy** &mdash; `READ ONLY` property, equals (y2 - y1)
* **w** &mdash; `READ ONLY` property, equals |x2 - x1|
* **h** &mdash; `READ ONLY` property, equals |y2 - y1|

* **source** &mdash; selector or node element for source point. Eg, `source: '#source_id'`. After rendering it's converted into object with props: `element`, `top`, `left`, `width`, `height`.  
* **target** &mdash; selector or node element for target point. Eg, `target: '#target_id'`. After rendering it's converted into object with props: `element`, `top`, `left`, `width`, `height`.
    
* **duration** &mdash; render duration for the arrow curve
* **delay** &mdash; delay before start rendering for the arrow curve
* **d** &mdash; path for the arrow curve (by default it's a simple line) 
    
* **duration1** &mdash; render duration for the first tip
* **delay1** &mdash; delay before start rendering for the first tip
* **d1** &mdash; path for the first tip (by default it's a simple line) 
        
* **duration2** &mdash; render duration for the second tip
* **delay2** &mdash; delay before start rendering for the second tip
* **d2** &mdash; path for the second tip (by default it's a simple line) 
           
* **arrowStyles** &mdash; specify styles for arrow
* **textStyles** &mdash; specify styles for text
    
* **text** &mdash; label text for arrow
* **textReverseDirection** &mdash; direct arrow text in a `end -> start` way (default direction is `start -> end`) 
* **textStartOffset** &mdash; text offset from the `start` of the path (or from the `end` of the path if used `textReverseDirection`)
* **textDx** &mdash; horizontal text offset
* **textDy** &mdash; vertical text offset

* **margin** &mdash; an outer margin for drawing rectangle. Eg, suppose `(x1,y1)=(100,100)`, `(x2,y2)=(200,200)`. 
If `margin = { top: 0, right: 0, bottom: 0, left: 0 }`, the drawing rectangle will be `(100,100),(200,200)`. 
If `margin = { top: 50, right: 20, bottom: 10, left: 30 }`, the drawing rectangle will be `(70,50),(220,210)`. 

## Licence
MIT