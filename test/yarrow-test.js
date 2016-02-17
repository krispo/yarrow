var test = require('tape'),
    jsdom = require("jsdom"),
    yarrow = require('../')
  ;
require('d3-selection');
require('d3-selection-multi');

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
})

test('Arrow tests', function(t){

  t.test('.render() should create an arrow', function(t){
    var document = jsdom.jsdom("<body>");
    var ya = new yarrow.Yarrow();
    var a = ya.arrow({}, document.body);
    a.render();
    t.equal(document.querySelectorAll('.yarrow').length, 1);
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