var ex = [
  'ex_basic',
  'ex_reverse_text_direction',
  'ex_styles'
];
document.addEventListener('DOMContentLoaded', function main() {
  hljs.initHighlightingOnLoad();

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