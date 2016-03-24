# Yarrow
[![Build Status](https://travis-ci.org/krispo/yarrow.svg?branch=master)](https://travis-ci.org/krispo/yarrow)
[![NPM Version](http://img.shields.io/npm/v/yarrow.svg?style=flat)](https://www.npmjs.org/package/yarrow)

SVG animated arrow pointer and tooltip. 

|:-------------:|:-------------:|
| <img src="http://i.imgur.com/BQbc9m1.png" width="250"> | <img src="http://i.imgur.com/UymjfkJ.png" width="250"> |

Demos:

1. [Web page](http://krispo.github.io/yarrow/).
2. [Plnkr](http://plnkr.co/edit/jUGsAw?p=preview).

## Install

    npm install yarrow

or include it in html `head` section directly:

    <link href="//raw.githack.com/krispo/yarrow/v1.1.0/build/yarrow.css" rel="stylesheet" type="text/css"/>
    <script src="//d3js.org/d3-selection.v0.6.min.js"></script>
    <script src="//raw.githack.com/krispo/svg-path-utils/v0.0.3/build/svg-path-utils.min.js"></script>
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

<a name="yarrow_arrow" href="#yarrow_arrow">#</a> <i>yarrow</i>.<b>arrow</b>(<i>opts</i>)
Create new arrow with specified options. Returns created arrow.

<a name="yarrow_arrows" href="#yarrow_arrows">#</a> <i>yarrow</i>.<b>arrows</b>(<i>[opts]</i>)
Create multiple arrows with specified options at a time. If *opts* are not specified, returns the current array of *arrow*.  

<a name="yarrow_renderAll" href="#yarrow_renderAll">#</a> <i>yarrow</i>.<b>renderAll</b>(<i></i>)
Render all arrows at a time.

<a name="yarrow_disposeAll" href="#yarrow_disposeAll">#</a> <i>yarrow</i>.<b>disposeAll</b>(<i>duration</i>, <i> delay</i>)
Dispose all arrows with specified *duration*, and after specified *delay* time. Arrows are removed completely.

### Arrow
Single arrow instance. Available options are listed below.

<a name="arrow_render" href="#arrow_render">#</a> <i>arrow</i>.<b>render</b>(<i></i>)
Render the current arrow.

<a name="arrow_dispose" href="#arrow_dispose">#</a> <i>arrow</i>.<b>dispose</b>(<i>duration</i>, <i> delay</i>)
Dispose the current arrow with specified *duration*, and after specified *delay* time. The arrow is removed completely.


#### Arrow options
*option_name* can take any option from available list of options *opts* (except `READ ONLY` properties). If *option_value* is not specified, returns current option value.

<a name="_x1" href="#_x1">#</a> <i></i>.<b>x1</b>() 
Source x coordinate

<a name="_y1" href="#_y1">#</a> <i></i>.<b>y1</b>() 
Source y coordinate

<a name="_x2" href="#_x2">#</a> <i></i>.<b>x2</b>() 
Target x coordinate

<a name="_y2" href="#_y2">#</a> <i></i>.<b>y2</b>() 
Target y coordinate

<a name="_dx" href="#_dx">#</a> <i></i>.<b>dx</b>() 
`READ ONLY` property, equals (x2 - x1)

<a name="_dy" href="#_dy">#</a> <i></i>.<b>dy</b>() 
`READ ONLY` property, equals (y2 - y1)

<a name="_w" href="#_w">#</a> <i></i>.<b>w</b>() 
`READ ONLY` property, equals |x2 - x1|

<a name="_h" href="#_h">#</a> <i></i>.<b>h</b>() 
`READ ONLY` property, equals |y2 - y1|

<a name="_source" href="#_source">#</a> <i></i>.<b>source</b>() 
Selector or node element for source point. Eg, `source: '#source_id'`. After rendering it's converted into object with props: `element`, `top`, `left`, `width`, `height`.  

<a name="_target" href="#_target">#</a> <i></i>.<b>target</b>() 
Selector or node element for target point. Eg, `target: '#target_id'`. After rendering it's converted into object with props: `element`, `top`, `left`, `width`, `height`.
    
<a name="_duration" href="#_duration">#</a> <i></i>.<b>duration</b>() 
Render duration for the arrow curve

<a name="_delay" href="#_delay">#</a> <i></i>.<b>delay</b>() 
Delay before start rendering for the arrow curve

<a name="_d" href="#_d">#</a> <i></i>.<b>d</b>() 
Path for the arrow curve (by default it's a simple line) 
    
<a name="_duration1" href="#_duration1">#</a> <i></i>.<b>duration1</b>() 
Render duration for the first tip

<a name="_delay1" href="#_delay1">#</a> <i></i>.<b>delay1</b>() 
Delay before start rendering for the first tip

<a name="_d1" href="#_d1">#</a> <i></i>.<b>d1</b>() 
Path for the first tip (by default it's a simple line) 
        
<a name="_duration2" href="#_duration2">#</a> <i></i>.<b>duration2</b>() 
Render duration for the second tip

<a name="_delay2" href="#_delay2">#</a> <i></i>.<b>delay2</b>() 
Delay before start rendering for the second tip

<a name="_d2" href="#_d2">#</a> <i></i>.<b>d2</b>() 
Path for the second tip (by default it's a simple line) 
           
<a name="_arrowStyles" href="#_arrowStyles">#</a> <i></i>.<b>arrowStyles</b>() 
Specify styles for arrow

<a name="_textStyles" href="#_textStyles">#</a> <i></i>.<b>textStyles</b>() 
Specify styles for text
    
<a name="_text" href="#_text">#</a> <i></i>.<b>text</b>() 
Label text for arrow

<a name="_textReverseDirection" href="#_textReverseDirection">#</a> <i></i>.<b>textReverseDirection</b>() 
Direct arrow text in a `end -> start` way (default direction is `start -> end`) 

<a name="_textStartOffset" href="#_textStartOffset">#</a> <i></i>.<b>textStartOffset</b>() 
Text offset from the `start` of the path (or from the `end` of the path if used `textReverseDirection`)

<a name="_textDx" href="#_textDx">#</a> <i></i>.<b>textDx</b>() 
Horizontal text offset

<a name="_textDy" href="#_textDy">#</a> <i></i>.<b>textDy</b>() 
Vertical text offset

<a name="_margin" href="#_margin">#</a> <i></i>.<b>margin</b>() 
An outer margin for drawing rectangle. Eg, suppose `(x1,y1)=(100,100)`, `(x2,y2)=(200,200)`. 
If `margin = { top: 0, right: 0, bottom: 0, left: 0 }`, the drawing rectangle will be `(100,100),(200,200)`. 
If `margin = { top: 50, right: 20, bottom: 10, left: 30 }`, the drawing rectangle will be `(70,50),(220,210)`. 

## Licence
MIT