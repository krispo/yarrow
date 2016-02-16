var tape = require('tape'),
    yarrow = require('../');

tape('Yarrow tests', function(t){
  t.deepEqual('yarrow', 'yarrow');
  t.end();
})

tape('Arrow tests', function(t){
  t.equal('arrow', 'arrow');
  t.end();
})