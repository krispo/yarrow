(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-selection'], factory) :
  (factory((global.yarrow = global.yarrow || {}),global.d3_selection));
}(this, function (exports,d3s) { 'use strict';

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
  var Arrow = function(parent, _, el){
    var arrow = {};

    var utils = new Utils();
    var id = 'id' + Math.random().toString(36).substr(2, 10)
      , root = d3s.select(el)

      , duration = _.duration || 300
      , delay = _.delay || 0
      , d = _.d || function(_, utils){
          return  utils.m(_.dx > 0 ? 0 : Math.abs(_.dx), _.dy > 0 ? 0 : Math.abs(_.dy))
            + utils.l(_.dx > 0 ? _.dx : 0, _.dy > 0 ? _.dy :0);
        }
      , duration1 = _.duration1 || 200
      , delay1 = _.delay1 || duration + delay
      , d1 = _.d1 || function(_, utils){
          return utils.m(0,0) + utils.l(-20,-10);
        }
      , duration2 = _.duration2 || duration1
      , delay2 = _.delay || duration + delay
      , d2 = _.d2 || function(_, utils){
          return utils.m(0,0) + utils.l(-20,10);
        }
      , text = _.text
      , textReverseDirection = (typeof _.textReverseDirection === 'function'
          ? _.textReverseDirection(_, utils)
          : _.textReverseDirection) || false
      , textStartOffset = (typeof _.textStartOffset === 'function'
          ? _.textStartOffset(_, utils, textReverseDirection)
          : _.textStartOffset) || 0
      , textDx = _.textDx || 0
      , textDy = _.textDy || -5
      , margin = { top: 20, right: 20, bottom: 20, left: 20}
      , width = Math.abs(_.dx)
      , height = Math.abs(_.dy)
      , top = Math.min(_.y, _.y + _.dy) - margin.top
      , left = Math.min(_.x, _.x + _.dx) - margin.left
      , outerWidth = width + margin.left + margin.right
      , outerHeight = height + margin.top + margin.bottom
      , svg
      ;

    arrow.id = id;

    arrow.render = function(){
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
          d: typeof d === 'function' ? d(_, utils) : d
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
        'animation-duration': duration/1000 + 's',
        'animation-delay': delay/1000 + 's',
        'stroke-dasharray': l + ' ' + l,
        'stroke-dashoffset': l
      });

      var tip1 = g.append('path')
        .attrs({
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: 'arrow tip-1',
          d: typeof d1 === 'function' ? d1(_, utils) : d1,
          transform: 'translate(' + p.x + ',' + p.y + ')rotate(' + alpha + ')'
        });
      var l1 = isSVG ? tip1.node().getTotalLength() : 0;
      tip1.styles({
        'animation-duration': duration1/1000 + 's',
        'animation-delay': delay1/1000 + 's',
        'stroke-dasharray': l1 + ' ' + l1,
        'stroke-dashoffset': l1
      });

      var tip2 = g.append('path')
        .attrs({
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: 'arrow tip-2',
          d: typeof d2 === 'function' ? d2(_, utils) : d2,
          transform: 'translate(' + p.x + ',' + p.y + ')rotate(' + alpha + ')'
        });
      var l2 = isSVG ? tip2.node().getTotalLength() : 0;
      tip2.styles({
        'animation-duration': duration2/1000 + 's',
        'animation-delay': delay2/1000 + 's',
        'stroke-dasharray': l2 + ' ' + l2,
        'stroke-dashoffset': l2
      });


      var path_reverse = g.append('path').attrs({
        id: 'path_reverse_' + id,
        d: (typeof d === 'function' ? d(_, utils) : d) + ' z'
      });
      var label = g.append('text')
        .attrs({
          class: 'arrow text',
          dx: textDx,
          dy: textDy
        })
      var textPath = label.append('textPath')
        .attrs({
          'xlink:href': textReverseDirection ? '#path_reverse_' + id : '#path_' + id,
          startOffset: textReverseDirection ? 2*l - textStartOffset : textStartOffset
        })
        .styles({
          opacity: 0
        })
        .text(text);

      setTimeout(function(){
        textPath.styles({
          transition: 'all ' + (duration/1000) + 's linear',
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
    arrow.duration = function(_){
      if (!arguments.length) return duration;
      duration = _;
      return this;
    }
    arrow.delay = function(_){
      if (!arguments.length) return delay;
      delay = _;
      return this;
    }
    arrow.d = function(_){
      if (!arguments.length) return d;
      d = _;
      return this;
    }
    arrow.duration1 = function(_){
      if (!arguments.length) return duration1;
      duration1 = _;
      return this;
    }
    arrow.delay1 = function(_){
      if (!arguments.length) return delay1;
      delay1 = _;
      return this;
    }
    arrow.d1 = function(_){
      if (!arguments.length) return d1;
      d1 = _;
      return this;
    }
    arrow.duration2 = function(_){
      if (!arguments.length) return duration2;
      duration2 = _;
      return this;
    }
    arrow.delay2 = function(_){
      if (!arguments.length) return delay2;
      delay2 = _;
      return this;
    }
    arrow.d2 = function(_){
      if (!arguments.length) return d1;
      d1 = _;
      return this;
    }
    arrow.text = function(_){
      if (!arguments.length) return text;
      text = _;
      return this;
    }
    arrow.textReverseDirection = function(_){
      if (!arguments.length) return textReverseDirection;
      textReverseDirection = _;
      return this;
    }
    arrow.textStartOffset = function(_){
      if (!arguments.length) return textStartOffset;
      textStartOffset = _;
      return this;
    }
    arrow.textDx = function(_){
      if (!arguments.length) return textDx;
      textDx = _;
      return this;
    }
    arrow.textDy = function(_){
      if (!arguments.length) return textDy;
      textDy = _;
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

  exports.Yarrow = Yarrow;

}));