import * as d3s from 'd3-selection';
import {SVGPathUtils} from 'svg-path-utils';

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

  var utils = new SVGPathUtils();
  var id = 'id' + Math.random().toString(36).substr(2, 10)
    , root = d3s.select(el)
    , _ = {};

  // define options
  _ = {
    animation: typeof opts.animation === 'undefined'?true:opts.animation,
    x1: opts.x1 || 0,
    y1: opts.y1 || 0,
    x2: opts.x2 || 0,
    y2: opts.y2 || 0,
    d: opts.d || function(_, u){
      return  u.join(
        u.M(_.dx > 0 ? 0 : _.w, _.dy > 0 ? 0 : _.h),
        u.L(_.dx > 0 ? _.dx : 0, _.dy > 0 ? _.dy :0)
      );
    },
    d1: opts.d1 || function(_, u){
      return u.join(u.m(0,0), u.l(-20,-10));
    },
    d2: opts.d2 || function(_, u){
      return u.join(u.m(0,0), u.l(-20,10));
    },
    arrowStyles: opts.arrowStyles || {},
    text: opts.text,
    textDx: opts.textDx || 0,
    textDy: opts.textDy || -5,
    textStyles: opts.textStyles || {},
    margin: Object.assign({}, {top: 20, right:20, bottom: 20, left: 20}, opts.margin),
    get dx(){ return this.x2 - this.x1; },
    get dy(){ return this.y2 - this.y1; },
    get w(){ return Math.abs(this.dx); },
    get h(){ return Math.abs(this.dy); },
  };

  // define source and target if exist
  var node;
  if (opts.source && (node = d3s.select(opts.source).node())) {
    _.source = defineElement(node, el);
  }
  if (opts.target && (node = d3s.select(opts.target).node())) {
    _.target = defineElement(node, el);
  }

  // set x1, y1, x2, y2 if functions
  setCoords();

  // calculate duration and delay options for path
  _.duration = opts.duration || 300;
  _.delay = opts.delay || 0;
  _.duration1 = opts.duration1 || 200;
  _.delay1 = opts.delay1 || _.duration + _.delay;
  _.duration2 = opts.duration2 || _.duration1;
  _.delay2 = opts.delay2 || _.duration + _.delay;
  // calculate extra options for text
  _.textReverseDirection = (typeof opts.textReverseDirection === 'function' ? opts.textReverseDirection(_, utils) : opts.textReverseDirection) || false;
  _.textStartOffset= (typeof opts.textStartOffset === 'function' ? opts.textStartOffset(_, utils) : opts.textStartOffset) || 0;

  // utils
  function defineElement(element, rootElement){
    var rect = element.getBoundingClientRect()
      , w = rect.right - rect.left
      , h = rect.bottom - rect.top
      , offset = getOffset(element)
      , rootOffset = getOffset(rootElement)
    ;
    return {
      element: element,
      top: offset.top - rootOffset.top,
      left: offset.left - rootOffset.left,
      width: w,
      height: h
    };

    function getOffset(el){
      var x = 0, y = 0;
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return { top: y, left: x };
    }
  }

  function setCoords(){
    if (typeof opts.x1 === 'function') _.x1 = opts.x1(_);
    if (typeof opts.y1 === 'function') _.y1 = opts.y1(_);
    if (typeof opts.x2 === 'function') _.x2 = opts.x2(_);
    if (typeof opts.y2 === 'function') _.y2 = opts.y2(_);
  }

  // arrow methods
  arrow.id = id;

  arrow.render = function(){
    var margin = _.margin
      , width = _.w
      , height = _.h
      , top = Math.min(_.y1, _.y2) - margin.top
      , left = Math.min(_.x1, _.x2) - margin.left
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
      })
      .styles(_.arrowStyles);

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

    if (_.animation) {
      path.styles({
        'animation-duration': _.duration / 1000 + 's',
        'animation-delay': _.delay / 1000 + 's',
        'stroke-dasharray': l + ' ' + l,
        'stroke-dashoffset': l
      });
    }

    var tip1 = g.append('path')
      .attrs({
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: 'arrow tip-1',
        d: typeof _.d1 === 'function' ? _.d1(_, utils) : _.d1,
        transform: 'translate(' + p.x + ',' + p.y + ')rotate(' + alpha + ')'
      });

    if (_.animation) {
      var l1 = isSVG ? tip1.node().getTotalLength() : 0;
      tip1.styles({
        'animation-duration': _.duration1 / 1000 + 's',
        'animation-delay': _.delay1 / 1000 + 's',
        'stroke-dasharray': l1 + ' ' + l1,
        'stroke-dashoffset': l1
      })
    }
    tip1.styles(_.arrowStyles);

    var tip2 = g.append('path')
      .attrs({
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: 'arrow tip-2',
        d: typeof _.d2 === 'function' ? _.d2(_, utils) : _.d2,
        transform: 'translate(' + p.x + ',' + p.y + ')rotate(' + alpha + ')'
      });

    if (_.animation) {
      var l2 = isSVG ? tip2.node().getTotalLength() : 0;
      tip2.styles({
        'animation-duration': _.duration2 / 1000 + 's',
        'animation-delay': _.delay2 / 1000 + 's',
        'stroke-dasharray': l2 + ' ' + l2,
        'stroke-dashoffset': l2
      })
    }
    tip2.styles(_.arrowStyles);

    if (_.textReverseDirection) {
      g.append('path').attrs({
          id: 'path_reverse_' + id,
          d: utils.inversePath(typeof _.d === 'function' ? _.d(_, utils) : _.d)
        })
        .style('display', 'none');
    }
    var label = g.append('text')
      .attrs({
        class: 'arrow text',
        dx: _.textDx,
        dy: _.textDy
      })
      .styles(_.textStyles);

    var textPath = label.append('textPath')
      .attrs({
        'xlink:href': _.textReverseDirection ? '#path_reverse_' + id : '#path_' + id,
        startOffset: _.textReverseDirection ? l - _.textStartOffset : _.textStartOffset
      })
      .html(_.text);

    if (_.animation) {
      textPath.styles({
        opacity: 0
      });

      setTimeout(function () {
        textPath.styles({
          transition: 'all ' + (_.duration / 1000) + 's linear',
          opacity: 1
        })
      }, 10)
    }

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

  // get/set multiple specific options
  arrow.options = function(opts){
    if (!arguments.length) return _;
    for (var k in opts) {
      if (_.hasOwnProperty(k)) _[k] = opts[k];
    }
    return this;
  }

  // get/set specific options
  arrow.x1 = function(v){
    if (!arguments.length) return _.x1;
    _.x1 = v;
    return this;
  }
  arrow.y1 = function(v){
    if (!arguments.length) return _.y1;
    _.y1 = v;
    return this;
  }
  arrow.x2 = function(v){
    if (!arguments.length) return _.x2;
    _.x2 = v;
    return this;
  }
  arrow.y2 = function(v){
    if (!arguments.length) return _.y2;
    _.y2 = v;
    return this;
  }
  arrow.source = function(v){
    if (!arguments.length) return _.source;
    _.source = v;
    setCoords();
    return this;
  }
  arrow.target = function(v){
    if (!arguments.length) return _.target;
    _.target = v;
    setCoords();
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
  arrow.arrowStyles = function(v){
    if (!arguments.length) return _.arrowStyles;
    _.arrowStyles = v;
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
  arrow.textStyles = function(v){
    if (!arguments.length) return _.textStyles;
    _.textStyles = v;
    return this;
  }
  arrow.margin = function(v){
    if (!arguments.length) return _.margin;
    _.margin = Object.assign({}, _.margin, v);
    return this;
  }

  return arrow;
}