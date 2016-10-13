const THREE = require('three.js')
const controller = require('../../controller')
const store = require('../../../store')

const lights = module.exports = new THREE.Object3D()

const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x888888, 0.5)

const downLight = new THREE.DirectionalLight(0xFFFFFF, 0.4)
downLight.position.set(0, 1, 0)

const spotLight = Object.assign(new THREE.SpotLight(), {
  castShadow: true,
  onlyShadow: true,
  shadowCameraNear: 1000,
  shadowCameraFar: 20000,
  shadowCameraFov: 90,
  shadowBias: 0.001
})

spotLight.position.set(0, 5000, 0)

const cameraLight = new THREE.PointLight(0xFFFFFF, 0.2)

const controllerChange = () => {
  cameraLight.position.copy(controller.object.position)
}

setTimeout(() => {
  controller.addEventListener('change', controllerChange)
  controllerChange()
})

lights.add(
  hemiLight,
  downLight,
  spotLight,
  cameraLight)

store.$watch('situation', value => {
  if (value === 'ground') {
    cameraLight.visible = false
    downLight.visible = false
    hemiLight.groundColor = new THREE.Color(0x45433A)
    hemiLight.intensity = 0.95
  } else {
    cameraLight.visible = true
    downLight.visible = true
    hemiLight.groundColor = new THREE.Color(0x888888)
    hemiLight.intensity = (value == "garage") ? 0.8 : 0.9
  }
}, { immediate: true })
