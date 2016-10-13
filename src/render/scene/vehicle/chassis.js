const THREE = require('three.js')
const store = require('../../../store')

const chassis = module.exports = new THREE.Object3D

const utils = require('../utils')

store.$watch('chassis.parts', parts => {
  // Dispose all mesh
  for (let mesh = chassis.children[0];
      mesh != null;
      mesh = chassis.children[0]) {
    mesh.vm.$destroy()
    utils.dispose(mesh)
    chassis.remove(mesh)
  }
  for (let name in parts) {
    const part = parts[name]
    const mesh = new THREE.Mesh()
    mesh.name = name
    mesh.castShadow = true
    chassis.add(mesh)
    mesh.vm = utils.initVM(mesh, part, 'chassis/', true)
  }

}, { immediate: true })

store.$watch('hoverPartName', (newPart, oldPart) => {
  const newMesh = chassis.getObjectByName(newPart)
  const oldMesh = chassis.getObjectByName(oldPart)

  utils.hover(newMesh, true)
  utils.hover(oldMesh, false)
})

store.$watch('chassis.offsetY',
  offsetY => chassis.position.y = offsetY - 30,
  { immediate: true })
