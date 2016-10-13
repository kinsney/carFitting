var THREE = require('three.js')

var reflection = require('./reflection')

var mattingMap = THREE.ImageUtils.loadTexture('bump/matting.jpg', THREE.CubeRefractionMapping)

mattingMap.wrapS = mattingMap.wrapT = THREE.MirroredRepeatWrapping
mattingMap.repeat.set(2, 2);

var carbonMap = THREE.ImageUtils.loadTexture('bump/carbon.JPG', THREE.CubeRefractionMapping)
// carbonMap.mapping = THREE.CubeRefractionMapping
// carbonMap.anisotropy = 4;
// carbonMap.repeat.set( 10, 10 );
// carbonMap.offset.set( 0.001, 0.001 );
// carbonMap.wrapS = carbonMap.wrapT = THREE.RepeatWrapping
// carbonMap.format = THREE.RGBFormat

Object.assign(exports, {
  matte (material) {
    material.envMap = null
    material.bumpMap = null
    material.reflectivity = 0
    material.needUpdate = true
  },
  normal (material) {
    material.envMap = reflection
    material.bumpMap = null
    material.reflectivity = 0.3
  },
  electroplate (material) {
    material.envMap = reflection
    material.bumpMap = null
    material.reflectivity = 0.9
  },
  matting (material) {
    material.envMap = reflection
    material.bumpMap = mattingMap
    material.bumpScale = 100
    material.reflectivity = 0.1
  },
  carbon (material) {
    material.envMap = reflection
    material.bumpMap = carbonMap
    material.bumpScale = 100
    material.reflectivity = 0.1
  },
  drawbench (material) {
    material.envMap = reflection
    material.bumpMap = null
    material.reflectivity = 0.1
  },
  discolor (material) {
    material.envMap = reflection
    material.bumpMap = null
    material.reflectivity = 0.3
  },
  steel (material) {
    material.envMap = reflection
    material.bumpMap = null
    material.reflectivity = 0.9
  },
  glass (material) {
    material.envMap = reflection
    material.bumpMap = null
    material.reflectivity = 1
  }
})
