import * as d3s from 'd3-selection';

export default Yarrow;

// Yarrow
var Yarrow = function(){
  var yarrow = {};

  // arrows container
  var arrows = [];

  yarrow.arrow = function(_, el){
    el = el || document.body;
    var a = new Arrow(this, _, el);
    arrows.push(a);
    return a;
  }

  yarrow.arrows = function(_, el){
    if (!arguments.length) return arrows;
    el = el || document.body;

    var self = this;
    _.forEach(function(_){
      arrows.push(new Arrow(self, _, el))
    })
    return this;
  }

  yarrow.remove = function remove(id){
    for (var i = -1, n = arrows.length; i++ < n;) {
      if (arrows[i].id === id) return arrows.splice(i, 1);
    }
  }

  yarrow.renderAll = function(){
    arrows.forEach(function(a){ a.render(); });
    return this;
  }

  yarrow.disposeAll = function(){
    var _arrows = arrows.slice();
    _arrows.forEach(function(a){ a.dispose(); });
    return this;
  }

  return yarrow;
}

// Arrow
var Arrow = function(parent, opts, el){
  var arrow = {};

  var utils = new Utils();
  var id = 'id' + Math.random().toString(36).substr(2, 10)
    , root = d3s.select(el)
    , _ = {};

  // define options
  _ = {
    x: opts.x || 0,
    y: opts.y || 0,
    dx: opts.dx || 100,
    dy: opts.dy || 0,
    duration: opts.duration || 300,
    delay: opts.delay || 0,
    d: opts.d || function(_, utils){
      return  utils.m(_.dx > 0 ? 0 : Math.abs(_.dx), _.dy > 0 ? 0 : Math.abs(_.dy))
        + utils.l(_.dx > 0 ? _.dx : 0, _.dy > 0 ? _.dy :0);
    },
    duration1: opts.duration1 || 200,
    delay1: opts.delay1 || opts.duration + opts.delay,
    d1: opts.d1 || function(_, utils){
      return utils.m(0,0) + utils.l(-20,-10);
    },
    duration2: opts.duration2 || opts.duration1,
    delay2: opts.delay2 || opts.duration + opts.delay,
    d2: opts.d2 || function(_, utils){
      return utils.m(0,0) + utils.l(-20,10);
    },
    text: opts.text,
    textDx: opts.textDx || 0,
    textDy: opts.textDy || -5
  };
  // calculate extra options for text
  _.textReverseDirection = (typeof opts.textReverseDirection === 'function' ? opts.textReverseDirection(_, utils) : opts.textReverseDirection) || false;
  _.textStartOffset= (typeof opts.textStartOffset === 'function' ? opts.textStartOffset(_, utils, _.textReverseDirection) : opts.textStartOffset) || 0;

  arrow.id = id;

  arrow.render = function(){
    var margin = { top: 20, right: 20, bottom: 20, left: 20}
      , width = Math.abs(_.dx)
      , height = Math.abs(_.dy)
      , top = Math.min(_.y, _.y + _.dy) - margin.top
      , left = Math.min(_.x, _.x + _.dx) - margin.left
      , outerWidth = width + margin.left + margin.right
      , outerHeight = height + margin.top + margin.bottom
      , svg
      ;

    root.select('#' + id).remove();

    svg = root.append('svg')
      .attrs({
        id: id,
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'xml:space': 'preserve',
        class: 'yarrow',
        viewBox: '0 0 ' + outerWidth + ' ' + outerHeight + ' ',
        width: outerWidth + 'px',
        height: outerHeight + 'px'
      })
      .styles({
        top: top + 'px',
        left: left + 'px'
      });

    var g = svg.append('g')
      .attrs({
        transform: 'translate(' + margin.left + ',' + margin.top + ')'
      });

    var path = g.append('path')
      .attrs({
        id: 'path_' + id,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: 'arrow',
        d: typeof _.d === 'function' ? _.d(_, utils) : _.d
      });

    var pn = path.node(), l, p0, p, alpha;
    //check if svg is available
    var isSVG = typeof pn.getTotalLength === 'function';
    if (isSVG) {
      l = pn.getTotalLength();
      p0 = pn.getPointAtLength(l - 1);
      p = pn.getPointAtLength(l);
    } else {
      l = 0;
      p0 = { x: 0, y: 0 };
      p = { x: 0, y: 0 };
    }
    alpha = utils.angle(p0,p);

    path.styles({
      'animation-duration': _.duration/1000 + 's',
      'animation-delay': _.delay/1000 + 's',
      'stroke-dasharray': l + ' ' + l,
      'stroke-dashoffset': l
    });

    var tip1 = g.append('path')
      .attrs({
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: 'arrow tip-1',
        d: typeof _.d1 === 'function' ? _.d1(_, utils) : _.d1,
        transform: 'translate(' + p.x + ',' + p.y + ')rotate(' + alpha + ')'
      });
    var l1 = isSVG ? tip1.node().getTotalLength() : 0;
    tip1.styles({
      'animation-duration': _.duration1/1000 + 's',
      'animation-delay': _.delay1/1000 + 's',
      'stroke-dasharray': l1 + ' ' + l1,
      'stroke-dashoffset': l1
    });

    var tip2 = g.append('path')
      .attrs({
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: 'arrow tip-2',
        d: typeof _.d2 === 'function' ? _.d2(_, utils) : _.d2,
        transform: 'translate(' + p.x + ',' + p.y + ')rotate(' + alpha + ')'
      });
    var l2 = isSVG ? tip2.node().getTotalLength() : 0;
    tip2.styles({
      'animation-duration': _.duration2/1000 + 's',
      'animation-delay': _.delay2/1000 + 's',
      'stroke-dasharray': l2 + ' ' + l2,
      'stroke-dashoffset': l2
    });


    var path_reverse = g.append('path').attrs({
      id: 'path_reverse_' + id,
      d: (typeof _.d === 'function' ? _.d(_, utils) : _.d) + ' z'
    });
    var label = g.append('text')
      .attrs({
        class: 'arrow text',
        dx: _.textDx,
        dy: _.textDy
      })
    var textPath = label.append('textPath')
      .attrs({
        'xlink:href': _.textReverseDirection ? '#path_reverse_' + id : '#path_' + id,
        startOffset: _.textReverseDirection ? 2*l - _.textStartOffset : _.textStartOffset
      })
      .styles({
        opacity: 0
      })
      .text(_.text);

    setTimeout(function(){
      textPath.styles({
        transition: 'all ' + (_.duration/1000) + 's linear',
        opacity: 1
      })
    },10)

    return this;
  }

  arrow.dispose = function(dur, delay){
    var el = root.select('#' + id);
    parent.remove(id);

    if (delay) {
      setTimeout(function(){ remove(el, dur) }, delay);
    } else {
      remove(el, dur);
    }

    function remove(el, dur){
      if (!dur) return el.remove();

      el.selectAll('.arrow')
        .styles({
          transition: 'all ' + (dur/1000) + 's linear',
          opacity: 0
        });

      setTimeout(function(){

        return el.remove();
      }, dur);
    }
  }

  // get/set specific options
  arrow.x = function(v){
    if (!arguments.length) return _.x;
    _.x = v;
    return this;
  }
  arrow.y = function(v){
    if (!arguments.length) return _.y;
    _.y = v;
    return this;
  }
  arrow.dx = function(v){
    if (!arguments.length) return _.dx;
    _.dx = v;
    return this;
  }
  arrow.dy = function(v){
    if (!arguments.length) return _.dy;
    _.dy = v;
    return this;
  }
  arrow.duration = function(v){
    if (!arguments.length) return _.duration;
    _.duration = v;
    return this;
  }
  arrow.delay = function(v){
    if (!arguments.length) return _.delay;
    _.delay = v;
    return this;
  }
  arrow.d = function(v){
    if (!arguments.length) return _.d;
    _.d = v;
    return this;
  }
  arrow.duration1 = function(v){
    if (!arguments.length) return _.duration1;
    _.duration1 = v;
    return this;
  }
  arrow.delay1 = function(v){
    if (!arguments.length) return _.delay1;
    _.delay1 = v;
    return this;
  }
  arrow.d1 = function(v){
    if (!arguments.length) return _.d1;
    _.d1 = v;
    return this;
  }
  arrow.duration2 = function(v){
    if (!arguments.length) return _.duration2;
    _.duration2 = v;
    return this;
  }
  arrow.delay2 = function(v){
    if (!arguments.length) return _.delay2;
    _.delay2 = v;
    return this;
  }
  arrow.d2 = function(v){
    if (!arguments.length) return _.d1;
    _.d1 = v;
    return this;
  }
  arrow.text = function(v){
    if (!arguments.length) return _.text;
    _.text = v;
    return this;
  }
  arrow.textReverseDirection = function(v){
    if (!arguments.length) return _.textReverseDirection;
    _.textReverseDirection = v;
    return this;
  }
  arrow.textStartOffset = function(v){
    if (!arguments.length) return _.textStartOffset;
    _.textStartOffset = v;
    return this;
  }
  arrow.textDx = function(v){
    if (!arguments.length) return _.textDx;
    _.textDx = v;
    return this;
  }
  arrow.textDy = function(v){
    if (!arguments.length) return _.textDy;
    _.textDy = v;
    return this;
  }

  return arrow;
}

//Utils
var Utils = function(){
  var utils = {};

  utils.m = function m(a,b){ return 'M' + a + ',' + b + ' ' };
  utils.l = function l(a,b){ return 'L' + a + ',' + b + ' ' };
  utils.angle = function angle(p1, p2){
    return Math.atan2(p2.y - p1.y, p2.x - p1.x)*180/Math.PI;
  }

  return utils;
}