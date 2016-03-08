(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.svg_path_utils = global.svg_path_utils || {})));
}(this, function (exports) { 'use strict';

  var SVGPathUtils = function(){
    var utils = {};

    // uppercase (M) - absolute coordinates, lowercase (m) - relative coordinates
    // m - moveto
    // l - lineto
    // h - horizontal lineto
    // v - vertical lineto
    // c - cubic bezier curveto
    // s - smooth cubic bezier curveto
    // q - quadratic bezier curveto
    // t - smooth quadratic bezier
    // a - elliptical arc (+ to add)
    // z - close path
    utils.M = function M(x,y){ return 'M' + x + ',' + y };
    utils.m = function m(x,y){ return 'm' + x + ',' + y };
    utils.L = function L(x,y){ return 'L' + x + ',' + y };
    utils.l = function l(x,y){ return 'l' + x + ',' + y };
    utils.H = function H(x){ return 'H' + x };
    utils.h = function h(x){ return 'h' + x };
    utils.V = function V(y){ return 'V' + y };
    utils.v = function v(y){ return 'v' + y };
    utils.C = function C(x1,y1,x2,y2,x,y){ return 'C' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x + ',' + y };
    utils.c = function c(x1,y1,x2,y2,x,y){ return 'c' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x + ',' + y };
    utils.S = function S(x2,y2,x,y){ return 'S' + x2 + ',' + y2 + ' ' + x + ',' + y };
    utils.s = function s(x2,y2,x,y){ return 's' + x2 + ',' + y2 + ' ' + x + ',' + y };
    utils.Q = function Q(x1,y1,x,y){ return 'Q' + x1 + ',' + y1 + ' ' + x + ',' + y };
    utils.q = function q(x1,y1,x,y){ return 'q' + x1 + ',' + y1 + ' ' + x + ',' + y };
    utils.T = function T(x,y){ return 'T' + x + ',' + y };
    utils.t = function t(x,y){ return 't' + x + ',' + y };
    utils.Z = function Z(){ return 'Z' };
    utils.z = function z(){ return 'z' };

    utils.angle = function angle(p1, p2){
      return Math.atan2(p2.y - p1.y, p2.x - p1.x)*180/Math.PI;
    }

    utils.parse = function(d){
      var operators = d.replace(/\d+|,|\s/g, '').split('');
      var points = d.replace(/[A-Za-z]+/g, '').split(' ');
      points = points.map(function(d1){
        var p = d1.split(',');
        return { x: +p[0], y: +p[1] }
      });

      return { operators: operators, points: points }
    }

    utils.generate = function(_){
      var p = _.points.slice();
      var str = [];
      var f;
      _.operators.forEach(function(key){
        if (typeof (f = utils[key]) === 'function') {
          var args = [];
          for (var i = -1, l = f.length/2; ++i < l;) {
            var point = p.shift();
            args.push(point.x, point.y);
          }
          str.push(f.apply(null, args));
        }
      });
      return str.join(' ');
    }

    utils.inversePath = function(d){
      var _ = utils.parse(d);
      var ro = _.operators.reverse();
      var rp = _.points.reverse();

      //define first and last operators (M, Z)
      var first, last;
      first = ro.pop();
      if ((last = ro[0]).toLowerCase() === 'z') {
        ro.push(last);
        ro.shift();
      }
      ro.unshift(first);

      return utils.generate({ operators: ro, points: rp });
    }

    utils.join = function(){
      if (!arguments.length) return;
      return Array.prototype.join.call(arguments, ' ');
    }

    return utils;
  }

  exports.SVGPathUtils = SVGPathUtils;

}));