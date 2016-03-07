# Yarrow

[![NPM Version](http://img.shields.io/npm/v/yarrow.svg?style=flat)](https://www.npmjs.org/package/yarrow)

SVG based animated arrow pointer. 

## Install

    npm install yarrow

or include it in html `head` section directly:

    <link href="//rawgit.com/krispo/yarrow/master/build/yarrow.css" rel="stylesheet" type="text/css"/>
    <script src="//d3js.org/d3-selection.v0.6.min.js"></script>
    <script src="//d3js.org/d3-selection-multi.v0.2.min.js"></script>
    <script src="//rawgit.com/krispo/svg-path-utils/master/build/svg-path-utils.min.js"></script>
    <script src="//rawgit.com/krispo/yarrow/master/build/yarrow.js"></script>
  
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
*option_name* can take any option from available list of options *opts*. If *option_value* is not specified, returns current option value.

### *opts*
Available arrow options:

* **x1** --- source x coordinate
* **y1** --- source y coordinate
* **x2** --- target x coordinate
* **y2** --- target y coordinate
    
* **duration** --- render duration for the arrow curve
* **delay** --- delay before start rendering for the arrow curve
* **d** --- path for the arrow curve (by default it's a simple line) 
    
* **duration1** --- render duration for the first tip
* **delay1** --- delay before start rendering for the first tip
* **d1** --- path for the first tip (by default it's a simple line) 
        
* **duration2** --- render duration for the second tip
* **delay2** --- delay before start rendering for the second tip
* **d2** --- path for the second tip (by default it's a simple line) 
           
* **arrowStyles** --- specify styles for arrow
* **textStyles** --- specify styles for text
    
* **text** --- label text for arrow
* **textReverseDirection** --- direct arrow text in a `end -> start` way (default direction is `start -> end`) 
* **textStartOffset** --- text offset from the `start` of the path (or from the `end` of the path if used `textReverseDirection`)
* **textDx** --- horizontal text offset
* **textDy** --- vertical text offset

## Licence
MIT