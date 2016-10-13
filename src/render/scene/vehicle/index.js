var THREE = require('three.js')

var chassis = require('./chassis')
var wheels = require('./wheels')

const vehicle = module.exports = window.vehicle = new THREE.Object3D
vehicle.position.y = 200
vehicle.rotation.y = Math.PI * 45 / 180

vehicle.add(chassis, wheels)
