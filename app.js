var ex = [
  'ex_basic',
  'ex_сurve_path',
  'ex_text_start_offset',
  'ex_text_xy_offset',
  'ex_reverse_text_direction',
  'ex_text_html',
  'ex_styles',
  'ex_durations',
  'ex_animation_off',
  'ex_source_element',
  'ex_target_element',
  'ex_path_1',
  'ex_path_2',
  'ex_chart'
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

  // for `click to rerun` note
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: function(_){ return _.source.left - _.source.width; },
      y1: function(_){ return _.source.top + _.source.height; },
      x2: function(_){ return _.source.left + _.source.width; },
      y2: function(_){ return _.target.top + 100; },
      d: function(_, u){ return u.join(u.M(_.w, 0), u.L(_.w/2, 0), u.Q(0, _.h/2, _.w*2/3, _.h)); },
      source: '#click2rerun',
      target: '#ex_basic_output',
      arrowStyles: {
        'stroke-width': 4,
        'stroke': '#ff5a00'
      },
      duration: 1000,
      delay: 2000
    })
    .render()
    .dispose(5000,5000);
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

function ex_source_element(el){
  el.innerHTML = '<div id="ex_source_element_source_id" style="position:absolute;border:1px solid red;top:220px;left:100px;padding:10px;padding-top:6px;">source</div>';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: function(_){ return _.source.left + _.source.width/2; },
      y1: function(_){ return _.source.top; },
      x2: 300,
      y2: 80,
      source: "#ex_source_element_source_id",
      text: "I'm arrow"
    }, el)
    .render();

  var z = document.createElement('div');
  z.setAttribute('class', 'coords');
  z.setAttribute('style', 'top:203px;left:70px;');
  z.innerHTML = '(top, left)';
  var z_point = document.createElement('div');
  z_point.setAttribute('class', 'point');
  z_point.setAttribute('style', 'top:218px;left:98px;background-color:black;');
  el.appendChild(z);
  el.appendChild(z_point);

  var width = document.createElement('div');
  width.setAttribute('class', 'coords');
  width.setAttribute('style', 'top:258px;left:117px;');
  width.innerHTML = 'width';
  el.appendChild(width);

  var height = document.createElement('div');
  height.setAttribute('class', 'coords');
  height.setAttribute('style', 'top:230px;left:172px;');
  height.innerHTML = 'height';
  el.appendChild(height);
}

function ex_target_element(el){
  el.innerHTML = '<div id="ex_target_element_target_id" style="position:absolute;border:1px solid red;top:30px;left:250px;padding:10px;padding-top:6px;">target</div>';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: 100,
      y1: 220,
      x2: function(_){ return _.target.left + _.target.width/2; },
      y2: function(_){ return _.target.top + _.target.height; },
      target: "#ex_target_element_target_id",
      text: "I'm arrow"
    }, el)
    .render();

  var z = document.createElement('div');
  z.setAttribute('class', 'coords');
  z.setAttribute('style', 'top:13px;left:228px;');
  z.innerHTML = '(top, left)';
  var z_point = document.createElement('div');
  z_point.setAttribute('class', 'point');
  z_point.setAttribute('style', 'top:28px;left:248px;background-color:black;');
  el.appendChild(z);
  el.appendChild(z_point);
}

function ex_path_1(el){
  el.innerHTML = '';
  var ya = new yarrow.Yarrow();
  ya.arrow({
      x1: 60,
      y1: 60,
      x2: 300,
      y2: 250,
      d: function(_, u){
        return u.join(u.M(0, 0), u.L(70, 0), u.L(_.w, _.h));
      },
      text: "I'm arrow",
      arrowStyles: {
        'stroke-width': 4,
        'stroke': '#ff5a00'
      }
    }, el)
    .render();
}

function ex_path_2(el){
  var ya = new yarrow.Yarrow();
  var ar;
  el.innerHTML = '<div class="table">' +
    '<div class="row"><div class="cell"><div class="inner">Section 1</div></div></div>' +
    '<div class="row"><div class="cell"><div class="inner">Section 2</div></div></div>' +
    '<div class="row"><div class="cell"><div class="inner">Section 3</div></div></div>' +
    '</div>';
  var elems = el.querySelectorAll('.inner');

  Array.prototype.forEach.call(elems, function(elem){
    elem.addEventListener('mouseover', function(e){
      renderArrow(e.target);
    })
  });

  renderArrow(elems[0]);

  function renderArrow(target){
    if (ar) ar.dispose();
    ar = ya.arrow({
        x1: 350,
        y1: 80,
        x2: function(_){return _.target.left+_.target.width;},
        y2: function(_){return _.target.top+_.target.height/2;},
        d: function(_, u){
          return u.join(u.M(_.w, _.dy>0?0:_.h), u.L(_.w-70, _.dy>0?0:_.h), u.L(0, _.dy>0?_.h:0));
        },
        target: target,
        text: target.innerHTML,
        textReverseDirection: true,
        textStartOffset: 65,
        animation: false,
        arrowStyles: {
          'stroke-width': 4,
          'stroke': '#ff5a00'
        }
      }, el)
      .render();
  }
}

function ex_chart(el){
  var ya = new yarrow.Yarrow();
  var ar;
  el.innerHTML = '<div id="chart_id"></div>';
  // create chart
  createChart('#chart_id', {width: 400, height: 316}, renderArrow);

  //var elems = el.querySelectorAll('#chart_id');
  //Array.prototype.forEach.call(elems, function(elem){
  //  elem.addEventListener('mouseover', function(e){
  //    renderArrow(e.target);
  //  })
  //});

  //renderArrow(elems[0]);

  function renderArrow(target){
    console.log(target)

    if (ar) ar.dispose();
    ar = ya.arrow({
        x1: 100,
        y1: 100,
        x2: target.x - 10,
        y2: target.y + 3,
        //d: function(_, u){
        //  return u.join(u.M(_.w, _.dy>0?0:_.h), u.L(_.w-70, _.dy>0?0:_.h), u.L(0, _.dy>0?_.h:0));
        //},
        text: 'Max value',

        animation: false,
        arrowStyles: {
          'stroke-width': 4,
          'stroke': '#ff5a00'
        }
      }, el)
      .render();
  }
}