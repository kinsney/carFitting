var THREE = require('three.js')
var store = require('../../store')

var reflections = {}

;['ground', 'garage', 'lab'].forEach(situation =>
  reflections[situation] = THREE.ImageUtils.loadTextureCube([
    `${situation}/px.jpg`, `${situation}/nx.jpg`,
    `${situation}/py.jpg`, `${situation}/ny.jpg`,
    `${situation}/pz.jpg`, `${situation}/nz.jpg`
  ]))

var reflection = module.exports = new THREE.CubeTexture()

store.$watch('situation', value => {
  reflection.copy(reflections[value])
  reflection.needsUpdate = true
}, {immediate: true})
