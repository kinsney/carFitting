const THREE = require('three.js')

const environment = require('./environment')
const vehicle = require('./vehicle')
const area = require('./area')

const scene = module.exports = new THREE.Scene()
scene.add(
  environment,
  vehicle,
  area)
