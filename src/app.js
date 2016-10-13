const Vue = require('vue')
const store = require('./store')
const THREE = require('three.js')
const audio = document.querySelector('audio')
const iploader = document.querySelector('.ip-loader')
const jsonLoader = new THREE.JSONLoader()
var images = ['bump/matting.jpg','garage/garage.jpg','ground/sandy.jpg','ground/sphere002.png','ground/cylinder001.png','ground/rectangle1408.png','ground/box03.png','ground/gas_station.png','ground/cylinder002.png','chassis/a3/rvent.png','chassis/a3/chassis.png','wheels/19/brake.png','wheels/19/tyre19.png','chassis/a3/interior.png','chassis/a3/cvent.png','chassis/a3/fvent.png','lab/Obj_000002.png','lab/Obj_000069.png']
;['ground', 'garage', 'lab'].forEach(function(situation){
  images = images.concat([`${situation}/px.jpg`, `${situation}/nx.jpg`,
    `${situation}/py.jpg`, `${situation}/ny.jpg`,
    `${situation}/pz.jpg`, `${situation}/nz.jpg`])
})
var jsonArray = ['chassis/a3/hood-area.json','chassis/a3/fbumper-area.json','chassis/a3/body-area.json','chassis/a3/rbumper-area.json','chassis/a3/roof-area.json','chassis/a3/trunk-area.json','chassis/a3/reflector-area.json','chassis/a3/glass.json','chassis/a3/hood.json','chassis/a3/lens.json','chassis/a3/rbumper.json','chassis/a3/reflector.json','chassis/a3/roof.json','chassis/a3/chassis.json','chassis/a3/interior.json','chassis/a3/trunk.json','chassis/a3/body.json','chassis/a3/fbumper.json','lab/lab.json','garage/garage.json','ground/ground.json','wheels/19/caliper.json','wheels/19/AEZ-Antigua.json','wheels/19/tyre19.json','wheels/rim/19.json','wheels/tyre/tyre19.json']

var totalLength = images.length + jsonArray.length
const root = (function (hash) {
  if (hash[0] !== '#') {
    return ''
  } else {
    const root = hash.slice(1)
    return root.slice(0, hash.lastIndexOf('/'))
  }
})(window.location.hash)

audio.src = root + 'music.mp3'

function PathLoader( el ) {
    this.el = el;
    // clear stroke
    this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
  }

  PathLoader.prototype._draw = function( val ) {
    this.el.style.strokeDashoffset = this.el.getTotalLength() * ( 1 - val );
  }

  PathLoader.prototype.setProgress = function( val, callback ) {
    this._draw(val);
    if( callback && typeof callback === 'function' ) {
      // give it a time (ideally the same like the transition time) so that the last progress increment animation is still visible.
      setTimeout( callback, 200 );
    }
  }

  PathLoader.prototype.setProgressFn = function( fn ) {
    if( typeof fn === 'function' ) { fn( this ); }
  }

  // add to global namespace
  window.PathLoader = PathLoader

var loader = new PathLoader(document.getElementById('ip-loader-circle'))

function startLoading() {
    // simulate loading something..
    var simulationFn = function(instance) {
      var progress = 0,loaded=0;
      jsonArray.forEach(function(value){
            jsonLoader.load(value,function(){
              progress = ++loaded/totalLength
            })
      })
      images.forEach(function(url){
        var img = new Image();
        img.onload=function(){
          progress = ++loaded/totalLength
          img = null;
        }
        img.src = url
      })
      require('./render')
      require('./interact')
        var interval = setInterval( function() {
          instance.setProgress( progress );
          // reached the end
          if( progress === 1 ) {
            iploader.style.opacity = 0
            setTimeout(()=>{
              iploader.style.display = 'none'
            })
            clearInterval( interval );
          }
        }, 80);
    };
    loader.setProgressFn( simulationFn );
  }

startLoading();
