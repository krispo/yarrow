var test = require('tape'),
    jsdom = require("jsdom"),
    yarrow = require('../')
  ;
require('d3-selection');
require('d3-selection-multi');
require('svg-path-utils');

test('Yarrow tests', function(t){

  t.test('add single arrow', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    var a = ya.arrow({}, document.body);
    t.equal(ya.arrows().length, 1);
    t.equal(typeof a.render, 'function');
    t.end();
  });

  t.test('add 2 arrows successively with .arrow()', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    ya.arrow({}, document.body);
    ya.arrow({}, document.body);
    t.equal(ya.arrows().length, 2);
    t.end();
  });

  t.test('add 3 arrows simultaneously with .arrows()', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    ya.arrows([{}, {}, {}], document.body);
    t.equal(ya.arrows().length, 3);
    t.equal(typeof ya.arrows()[0].render, 'function');
    t.end();
  });

  t.test('.renderAll() should render all arrows', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    ya.arrows([{}, {}, {}], document.body);
    t.equal(document.querySelectorAll('.yarrow').length, 0);
    ya.renderAll();
    t.equal(document.querySelectorAll('.yarrow').length, 3);
    t.end();
  });

  t.test('.disposeAll() should dispose all arrows', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    ya.arrows([{}, {}, {}], document.body);
    t.equal(document.querySelectorAll('.yarrow').length, 0);
    ya.renderAll();
    t.equal(document.querySelectorAll('.yarrow').length, 3);
    ya.disposeAll();
    t.equal(document.querySelectorAll('.yarrow').length, 0);
    t.end();
  });

  t.end();
});

test('Yarrow tests with options', function(t){
  var opts = {
    x: 0,
    y: 0,
    dx: 100,
    dy: 100,
    duration: 1000,
    delay: 500,
    d: 'M0,0 L100,100',
    duration1: 500,
    delay1: 1500,
    d1: 'M0,0 L20,20',
    duration2: 500,
    delay2: 1500,
    d2: 'M0,0 L20,20',
    text: 'Hello World',
    textReverseDirection: true,
    textStartOffset: 100,
    textDx: 10,
    textDy: 10
  };

  t.test('add single arrow with options', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();

    var a = ya.arrow(opts, document.body);
    t.equal(a.x(), 0);
    t.equal(a.y(), 0);
    t.equal(a.dx(), 100);
    t.equal(a.dy(), 100);
    t.equal(a.duration(), 1000);
    t.equal(a.delay(), 500);
    t.equal(a.d(), 'M0,0 L100,100');
    t.equal(a.duration1(), 500);
    t.equal(a.delay1(), 1500);
    t.equal(a.d1(), 'M0,0 L20,20');
    t.equal(a.duration2(), 500);
    t.equal(a.delay2(), 1500);
    t.equal(a.d2(), 'M0,0 L20,20');
    t.equal(a.text(), 'Hello World');
    t.equal(a.textReverseDirection(), true);
    t.equal(a.textStartOffset(), 100);
    t.equal(a.textDx(), 10);
    t.equal(a.textDy(), 10);
    t.end();
  });
});

test('Arrow tests', function(t){

  t.test('.render() should create an arrow', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    var a = ya.arrow({}, document.body);
    a.render();
    t.equal(document.querySelectorAll('.yarrow').length, 1);
    t.end();
  });

  t.test('multiple .render() should not create extra arrows in the DOM', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    var a = ya.arrow({}, document.body);
    t.equal(document.querySelectorAll('.yarrow').length, 0);
    a.render();
    t.equal(document.querySelectorAll('.yarrow').length, 1);
    a.render();
    t.equal(document.querySelectorAll('.yarrow').length, 1);
    a.render().render();
    t.equal(document.querySelectorAll('.yarrow').length, 1);
    t.end();
  });

  t.test('multiple .render() should not create extra arrows in the DOM with multiple arrows', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    var a1 = ya.arrow({}, document.body);
    var a2 = ya.arrow({}, document.body);
    var a3 = ya.arrow({}, document.body);
    t.equal(document.querySelectorAll('.yarrow').length, 0);
    a1.render();
    a2.render();
    a3.render();
    t.equal(document.querySelectorAll('.yarrow').length, 3);
    a1.render().render();
    a2.render().render();
    a3.render().render();
    t.equal(document.querySelectorAll('.yarrow').length, 3);
    t.end();
  });

  t.test('.dispose() should remove arrow globally', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    var a = ya.arrow({}, document.body);
    t.equal(ya.arrows().length, 1);
    a.dispose();
    t.equal(ya.arrows().length, 0);
    t.end();
  });

  t.test('.dispose() should remove rendered arrow from the DOM', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    var a = ya.arrow({}, document.body);
    t.equal(document.querySelectorAll('.yarrow').length, 0);
    a.render();
    t.equal(document.querySelectorAll('.yarrow').length, 1);
    a.dispose();
    t.equal(document.querySelectorAll('.yarrow').length, 0);
    t.end();
  });

  t.end();
})