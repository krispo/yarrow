var test = require('tape'),
    jsdom = require("jsdom"),
    yarrow = require('../');

test('Yarrow tests', function(t){
  var document = jsdom.jsdom("<body>");

  t.test('add single arrow', function(t){
    var ya = new yarrow.Yarrow();
    ya.arrow({}, document.body);
    t.equal(ya.arrows().length, 1);
    t.end();
  });

  t.test('add 2 arrows successively with .arrow()', function(t){
    var ya = new yarrow.Yarrow();
    ya.arrow({}, document.body);
    ya.arrow({}, document.body);
    t.equal(ya.arrows().length, 2);
    t.end();
  });

  t.test('add 3 arrows simultaneously with .arrows()', function(t){
    var ya = new yarrow.Yarrow();
    ya.arrows([{}, {}, {}], document.body);
    t.equal(ya.arrows().length, 3);
    t.end();
  });

  t.end();
})

test('Arrow tests', function(t){
  var document = jsdom.jsdom("<body>");

  t.test('expose() should remove arrow globally', function(t){
    var ya = new yarrow.Yarrow();
    var a = ya.arrow({}, document.body);
    t.equal(ya.arrows().length, 1);
    a.dispose();
    t.equal(ya.arrows().length, 0);
    t.end();
  });

  t.end();
})