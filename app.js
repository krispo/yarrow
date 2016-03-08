var d3s;
var ex = [
  'ex_basic',
  'ex_сurve_path',
  'ex_text_start_offset',
  'ex_text_xy_offset',
  'ex_reverse_text_direction',
  'ex_text_html',
  'ex_styles',
  'ex_durations',
  'ex_animation_off'
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
      x1: 100,
      y1: 220,
      x2: 300,
      y2: 80,
      text: "I'm arrow!"
    }, el)
    .render();

  var z = document.createElement('div');
  z.setAttribute('class', 'coords');
  z.setAttribute('style', 'top:3px;left:3px;');
  z.innerHTML = '(0, 0)';
  var s = document.createElement('div');
  s.setAttribute('class', 'coords');
  s.setAttribute('style', 'top:225px;left:74px;');
  s.innerHTML = '(100, 220)';
  var t = document.createElement('div');
  t.setAttribute('class', 'coords');
  t.setAttribute('style', 'top:60px;left:275px;');
  t.innerHTML = '(300, 80)';
  el.appendChild(z);
  el.appendChild(s);
  el.appendChild(t);
}

function ex_сurve_path(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: 100,
      y1: 220,
      x2: 300,
      y2: 80,
      text: "I'm arrow!",
      d: 'M0,140 Q0,0 200,0'
    }, el)
    .render();

  var z = document.createElement('div');
  z.setAttribute('class', 'coords');
  z.setAttribute('style', 'top:3px;left:3px;');
  z.innerHTML = '(0, 0) - absolute';
  var s = document.createElement('div');
  s.setAttribute('class', 'coords');
  s.setAttribute('style', 'top:225px;left:74px;');
  s.innerHTML = '(100, 220) - absolute';
  var t = document.createElement('div');
  t.setAttribute('class', 'coords');
  t.setAttribute('style', 'top:45px;left:275px;');
  t.innerHTML = '(300, 80) - absolute';
  el.appendChild(z);
  el.appendChild(s);
  el.appendChild(t);

  var rz = document.createElement('div');
  rz.setAttribute('class', 'coords');
  rz.setAttribute('style', 'top:63px;left:88px;');
  rz.innerHTML = '(0, 0) - relative';
  var rz_point = document.createElement('div');
  rz_point.setAttribute('class', 'point');
  rz_point.setAttribute('style', 'top:80px;left:100px;');

  var rs = document.createElement('div');
  rs.setAttribute('class', 'coords');
  rs.setAttribute('style', 'top:237px;left:88px;');
  rs.innerHTML = '(0, 140) - relative';
  var rt = document.createElement('div');
  rt.setAttribute('class', 'coords');
  rt.setAttribute('style', 'top:57px;left:275px;');
  rt.innerHTML = '(200, 0) - relative';
  el.appendChild(rz);
  el.appendChild(rz_point);
  el.appendChild(rs);
  el.appendChild(rt);
}

function ex_text_start_offset(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: 100,
      y1: 220,
      x2: 300,
      y2: 80,
      text: "I'm arrow!",
      d: 'M0,140 Q0,0 200,0',
      textStartOffset: 80
    }, el)
    .render();
}

function ex_text_xy_offset(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: 100,
      y1: 220,
      x2: 300,
      y2: 80,
      text: "I'm arrow!",
      d: 'M0,140 Q0,0 200,0',
      textDx: 80,
      textDy: 20
    }, el)
    .render();
}

function ex_reverse_text_direction(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: 100,
      y1: 220,
      x2: 300,
      y2: 80,
      text: "I'm arrow!",
      d: 'M0,140 Q0,0 200,0',
      textReverseDirection: true,
      textStartOffset: 70
    }, el)
    .render();
}

function ex_text_html(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: 100,
      y1: 220,
      x2: 300,
      y2: 80,
      d: 'M0,140 Q0,0 200,0',
      textStartOffset: 80,
      text: 'I\'m <tspan font-size="25" font-weight="bold" fill="red" >also</tspan> arrow!'
    }, el)
    .render();
}

function ex_styles(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: 100,
      y1: 220,
      x2: 300,
      y2: 80,
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

function ex_durations(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: 100,
      y1: 220,
      x2: 300,
      y2: 80,
      duration: 2000,
      duration1: 500,
      delay2: 2000 + 500,
      duration2: 500
    }, el)
    .render();
}

function ex_animation_off(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: 100,
      y1: 220,
      x2: 300,
      y2: 80,
      text: "I'm arrow",
      animation: false
    }, el)
    .render();
}