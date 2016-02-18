# Yarrow
SVG based animated arrow pointer. 

## Install

    npm install yarrow
    
## Usage

```js
var yarrow = new Yarrow();

// add new arrow
var arrow = yarrow.arrow({
  x: 0,                 // init x coords on the page
  y: 0,                 // init y coords on the page
  dx: 100,              // x target offset
  dy: 100,              // y target offset
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

* **x** --- x page coordinate 
* **y** --- y page coordinate
* **dx** --- x target offset
* **dy** --- y target offset
    
* **duration** --- render duration for the arrow curve
* **delay** --- delay before start rendering for the arrow curve
* **d** --- path for the arrow curve (by default it's a simple line) 
    
* **duration1** --- render duration for the first tip
* **delay1** --- delay before start rendering for the first tip
* **d1** --- path for the first tip (by default it's a simple line) 
        
* **duration2** --- render duration for the second tip
* **delay2** --- delay before start rendering for the second tip
* **d2** --- path for the second tip (by default it's a simple line)            
    
* **text** --- label text for arrow
* **textReverseDirection** --- direct arrow text in a `end -> start` way (default direction is `start -> end`) 
* **textStartOffset** --- text offset from the `start` of the path (or from the `end` of the path if used `textReverseDirection`)
* **textDx** --- horizontal text offset
* **textDy** --- vertical text offset

## Licence
MIT