var test = require('tape'),
  SVGPathUtils = require('../')
  ;

test('svg-path-utils tests', function(t){
  var utils = new SVGPathUtils.SVGPathUtils();

  t.test('.M ', function(t){
    t.equal(utils.M(10,20), 'M10,20');
    t.end();
  });
  t.test('.m ', function(t){
    t.equal(utils.m(10,20), 'm10,20');
    t.end();
  });

  t.test('.L ', function(t){
    t.equal(utils.L(10,20), 'L10,20');
    t.end();
  });
  t.test('.l ', function(t){
    t.equal(utils.l(10,20), 'l10,20');
    t.end();
  });

  t.test('.H ', function(t){
    t.equal(utils.H(10), 'H10');
    t.end();
  });
  t.test('.h ', function(t){
    t.equal(utils.h(10), 'h10');
    t.end();
  });

  t.test('.V ', function(t){
    t.equal(utils.V(10), 'V10');
    t.end();
  });
  t.test('.v ', function(t){
    t.equal(utils.v(10), 'v10');
    t.end();
  });

  t.test('.C ', function(t){
    t.equal(utils.C(10,0,400,400,400,200), 'C10,0 400,400 400,200');
    t.end();
  });
  t.test('.c ', function(t){
    t.equal(utils.c(10,0,400,400,400,200), 'c10,0 400,400 400,200');
    t.end();
  });

  t.test('.S ', function(t){
    t.equal(utils.S(10,0,400,400), 'S10,0 400,400');
    t.end();
  });
  t.test('.s ', function(t){
    t.equal(utils.s(10,0,400,400), 's10,0 400,400');
    t.end();
  });

  t.test('.Q ', function(t){
    t.equal(utils.Q(10,0,400,400), 'Q10,0 400,400');
    t.end();
  });
  t.test('.q ', function(t){
    t.equal(utils.q(10,0,400,400), 'q10,0 400,400');
    t.end();
  });

  t.test('.T ', function(t){
    t.equal(utils.T(10,20), 'T10,20');
    t.end();
  });
  t.test('.t ', function(t){
    t.equal(utils.t(10,20), 't10,20');
    t.end();
  });

  t.test('.Z ', function(t){
    t.equal(utils.Z(), 'Z');
    t.end();
  });
  t.test('.z ', function(t){
    t.equal(utils.z(), 'z');
    t.end();
  });

  t.test('.parse ', function(t){
    var d = 'M10,200 C10,0 400,400 400,200 L20,30';
    var _ = utils.parse(d);
    t.deepEqual(_.operators, ['M', 'C', 'L']);
    t.deepEqual(_.points, [{x: 10, y:200}, {x: 10, y: 0}, {x: 400, y:400}, {x: 400, y: 200}, {x: 20, y: 30}]);
    t.end();
  });

  t.test('.parse with spaces', function(t){
    var d = 'M 10 200 C 10 0 400 400 400 200 L 20 30';
    var _ = utils.parse(d);
    t.deepEqual(_.operators, ['M', 'C', 'L']);
    t.deepEqual(_.points, [{x: 10, y:200}, {x: 10, y: 0}, {x: 400, y: 400}, {x: 400, y: 200}, {x: 20, y: 30}]);
    t.end();
  });

  t.test('.parse complex string', function(t){
    var d = ' M10,   200  C 10 0 400,   400   400  \n,200L20,30  ';
    var _ = utils.parse(d);
    t.deepEqual(_.operators, ['M', 'C', 'L']);
    t.deepEqual(_.points, [{x: 10, y:200}, {x: 10, y: 0}, {x: 400, y: 400}, {x: 400, y: 200}, {x: 20, y: 30}]);
    t.end();
  });

  t.test('.parse complex string with negatives', function(t){
    var d = ' M-10,   -200  C -10 0 -400,   -400   -400  ,-200L-20,-30  ';
    var _ = utils.parse(d);
    t.deepEqual(_.operators, ['M', 'C', 'L']);
    t.deepEqual(_.points, [{x: -10, y:-200}, {x: -10, y: 0}, {x: -400, y: -400}, {x: -400, y: -200}, {x: -20, y: -30}]);
    t.end();
  });

  t.test('.parse with H and V', function(t){
    var d = 'M10,200 H20 C10,0 400,400 400,200 V30 L20,30';
    var _ = utils.parse(d);
    t.deepEqual(_.operators, ['M', 'H', 'C', 'V', 'L']);
    t.deepEqual(_.points, [{x: 10, y:200}, {x: 20}, {x: 10, y: 0}, {x: 400, y:400}, {x: 400, y: 200}, {x: 30}, {x: 20, y: 30}]);
    t.end();
  });

  t.test('.parse with H and V without spaces', function(t){
    var d = 'M10,200H20V30h40v50v60z';
    var _ = utils.parse(d);
    t.deepEqual(_.operators, ['M', 'H', 'V', 'h', 'v', 'v', 'z']);
    t.deepEqual(_.points, [{x: 10, y:200}, {x: 20}, {x: 30}, {x: 40}, {x: 50}, {x: 60}]);
    t.end();
  });

  t.test('.parse complex string with H and V', function(t){
    var d = ' M10,   200 H 20 V 30 H40 C 10 0 400,400 400 200';
    var _ = utils.parse(d);
    t.deepEqual(_.operators, ['M', 'H', 'V', 'H', 'C']);
    t.deepEqual(_.points, [{x: 10, y:200}, {x: 20}, {x: 30}, {x: 40}, {x: 10, y: 0}, {x: 400, y: 400}, {x: 400, y: 200}]);
    t.end();
  });

  t.test('.parse complex string with negatives H and V', function(t){
    var d = ' M-10,   -200 H -20 V -30 H-40 C -10 0 -400,-400 -400 -200';
    var _ = utils.parse(d);
    t.deepEqual(_.operators, ['M', 'H', 'V', 'H', 'C']);
    t.deepEqual(_.points, [{x: -10, y: -200}, {x: -20}, {x: -30}, {x: -40}, {x: -10, y: 0}, {x: -400, y: -400}, {x: -400, y: -200}]);
    t.end();
  });

  t.test('.generate ', function(t){
    var _ = {
      operators: ['M', 'C', 'L'],
      points: [{x: 10, y:200}, {x: 10, y: 0}, {x: 400, y:400}, {x: 400, y: 200}, {x: 20, y:30}]
    }
    var d = utils.generate(_);
    t.equal(d, 'M10,200 C10,0 400,400 400,200 L20,30');
    t.end();
  });

  t.test('.generate with negatives', function(t){
    var _ = {
      operators: ['M', 'C', 'L'],
      points: [{x: -10, y: -200}, {x: -10, y: 0}, {x: -400, y: -400}, {x: -400, y: -200}, {x: -20, y: -30}]
    }
    var d = utils.generate(_);
    t.equal(d, 'M-10,-200 C-10,0 -400,-400 -400,-200 L-20,-30');
    t.end();
  });

  t.test('.generate with H and V', function(t){
    var _ = {
      operators: ['M', 'H', 'C', 'V', 'L'],
      points: [{x: 10, y: 200}, {x: 20}, {x: 10, y: 0}, {x: 400, y: 400}, {x: 400, y: 200}, {x: 30}, {x: 20, y: 30}]
    }
    var d = utils.generate(_);
    t.equal(d, 'M10,200 H20 C10,0 400,400 400,200 V30 L20,30');
    t.end();
  });

  t.test('.generate with negatives H and V', function(t){
    var _ = {
      operators: ['M', 'H', 'C', 'V', 'L'],
      points: [{x: -10, y: -200}, {x: -20}, {x: -10, y: 0}, {x: -400, y: -400}, {x: -400, y: -200}, {x: -30}, {x: -20, y: -30}]
    }
    var d = utils.generate(_);
    t.equal(d, 'M-10,-200 H-20 C-10,0 -400,-400 -400,-200 V-30 L-20,-30');
    t.end();
  });




  t.test('.inversePath ', function(t){
    var d = 'M10,200 C10,0 400,400 400,200 L20,30';
    var inverse_d = utils.inversePath(d);
    t.equal(inverse_d, 'M20,30 L400,200 C400,400 10,0 10,200');
    t.end();
  });

  t.test('.join ', function(t){
    t.equal(utils.join('foo','bar','buz'), 'foo bar buz');
    t.equal(utils.join(utils.M(10,20), utils.L(200, 100), utils.C(300,100,300,0,0,0), utils.Z()), 'M10,20 L200,100 C300,100 300,0 0,0 Z')
    t.end();
  });

  t.end();
});