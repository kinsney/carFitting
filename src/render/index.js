const THREE = window.THREE = require('three.js')
require('./plugins/OrbitControls')

const renderer = module.exports = new THREE.WebGLRenderer({
  canvas: document.querySelector('#render'),
  antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.soft = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const setSize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', setSize)
setSize()

// const stats = require('./stats')
const controller = require('./controller')
const camera = require('./controller/camera')
const raycast = require('./scene/area/raycast')
const scene = window.scene = require('./scene')

const render = () => {
  // stats.begin()
  controller.update()
  raycast()
  renderer.render(scene, camera)
  // stats.end()
  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)
