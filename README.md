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

## Licence
MIT