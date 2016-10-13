const THREE = require('three.js')

const environment = module.exports = new THREE.Object3D

environment.add(require('./situation'),
  require('./lights'))
