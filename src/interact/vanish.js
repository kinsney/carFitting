const store = require('../store')

exports.vanish = function (event) {
  var vm = require('./index')
  if(event.target.className == 'remolding'&&!store.hoverPartName)vm.$children[0].$data.current='';}
