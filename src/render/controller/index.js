const THREE = require('three.js')

const camera = require('./camera')
const store = require('../../store')
const raycast = require('../scene/area/raycast')
const controls = module.exports = new THREE.OrbitControls(camera)
const bgmusic = document.querySelector('audio')

Object.assign(controls, {
  maxDistance: 7000,
  minDistance: 4000,

  enableDamping: true,
  dampingFactor: 0.2,

  rotateSpeed: 0.2,
  autoRotateSpeed: -0.3,

  // enablePan: false,
  enableKeys: false,

  minPolarAngle: Math.PI / 180 * 50,
  maxPolarAngle: Math.PI / 180 * 80
})

controls.target.set(0, 200, 0)

store.$watch('rotation',
  value => controls.autoRotate = value,
  { immediate: true })

store.$watch('music',
  value => value ? bgmusic.play() : bgmusic.pause(),
  { immediate: true })

document.addEventListener('mousemove', event => {
  raycast.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  raycast.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
})

document.addEventListener('click',
  () => {
    if (store.hoverEnabled) {
      store.currentPartName = store.hoverPartName
    }
  })
