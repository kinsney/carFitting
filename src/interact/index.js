const Vue = require('vue')
const store = require('../store')

var vm = module.exports = new Vue({
  el: '#interact',
  components: {
    interact: require('./index.vue')
  },
  ready(){
    const vanish = require('./vanish').vanish
    const interactor = document.getElementById('interact')
    document.addEventListener('mousemove', event => {
      document.removeEventListener('click',vanish,false)
    })
    function onMouseMove(){

      interactor.style.opacity = .3
      document.removeEventListener( 'mouseup', vanish, false );
    }
    function onMouseUp(){
      interactor.style.opacity = 1
      document.removeEventListener( 'mousemove', onMouseMove, false );
      document.removeEventListener( 'mouseup', onMouseUp, false );
      document.addEventListener('mouseup',vanish,false)
    }
  document.addEventListener( 'mousedown', function(e){
      document.addEventListener( 'mousemove',onMouseMove,false)
      document.addEventListener( 'mouseup',onMouseUp,false)
    }, false )

    document.addEventListener('mouseup',vanish,false)

  }
})

require('./audio')

