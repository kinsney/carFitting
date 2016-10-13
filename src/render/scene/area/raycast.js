const THREE = require('three.js')
const camera = require('../../controller/camera')
const area = require('./')
const store = require('../../../store')
const raycaster = new THREE.Raycaster()

let hoverPartName = store.hoverPartName

module.exports = () => {
  if (!store.hoverEnabled) {
    store.hoverPartName = ''
    return
  }
  raycaster.setFromCamera(mouse, camera)
  const nearest = raycaster.intersectObject(area, true)[0]
  const targetHoverPartName = nearest != null ? nearest.object.name : ''
  if (hoverPartName !== targetHoverPartName) {
    store.hoverPartName = hoverPartName = targetHoverPartName
  }
}

const mouse = module.exports.mouse = new THREE.Vector2()
