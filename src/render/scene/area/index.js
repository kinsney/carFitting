var THREE = require('three.js')

var chassis = require('./chassis')
var wheels = require('./wheels')

const area = module.exports = window.area = new THREE.Object3D()
area.position.y = 200
area.rotation.y = Math.PI * 45 / 180

area.add(chassis, wheels)
