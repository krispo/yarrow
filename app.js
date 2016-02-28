var d3s;
var ex = [
  'ex_basic',
  'ex_text_start_offset',
  'ex_text_xy_offset',
  'ex_reverse_text_direction',
  'ex_styles'
];
document.addEventListener('DOMContentLoaded', function main() {
  hljs.initHighlightingOnLoad();

  d3s = d3_selection;

  ex.forEach(function(id){
    var el = document.getElementById(id + '_output');
    el.addEventListener("click", function(e){
      var el = e.target;
      var id = el.id.replace('_output', '');
      if (typeof window[id] === 'function') window[id].call(el, el);
    });
    if (typeof window[id] === 'function') window[id].call(el, el);
  });
});

function ex_basic(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x: 100,
      y: 220,
      dx: 200,
      dy: -140,
      text: "I'm arrow!"
    }, el)
    .render();

  var s = document.createElement('div');
  s.setAttribute('class', 'coords');
  s.setAttribute('style', 'top:225px;left:74px;');
  s.innerHTML = '(100, 220)';
  var t = document.createElement('div');
  t.setAttribute('class', 'coords');
  t.setAttribute('style', 'top:60px;left:242px;');
  t.innerHTML = '(100 + 200, 220 - 140)';
  el.appendChild(s);
  el.appendChild(t);
}

function ex_text_start_offset(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x: 100,
      y: 220,
      dx: 200,
      dy: -140,
      text: "I'm arrow!",
      textStartOffset: 80
    }, el)
    .render();
}

function ex_text_xy_offset(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x: 100,
      y: 220,
      dx: 200,
      dy: -140,
      text: "I'm arrow!",
      textDx: 80,
      textDy: 20
    }, el)
    .render();
}

function ex_reverse_text_direction(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x: 100,
      y: 220,
      dx: 200,
      dy: -140,
      text: "I'm arrow!",
      textReverseDirection: true,
      textStartOffset: 70
    }, el)
    .render();
}

function ex_styles(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x: 100,
      y: 220,
      dx: 200,
      dy: -140,
      text: "I'm arrow!",
      arrowStyles: {
        'stroke-width': 6,
        'stroke': '#ff5a00'
      },
      textStyles: {
        'fill': '#0070a7',
        'font-size': 20,
        'font-weight': 'bold'
      }
    }, el)
    .render();
}