const THREE = require('three.js')
const store = require('../../../store')

const chassis = module.exports = new THREE.Object3D()

const utils = require('../utils')

store.$watch('chassis.parts', parts => {
  // Dispose all mesh
  for (let mesh = chassis.children[0];
      mesh != null;
      mesh = chassis.children[0]) {
    utils.dispose(mesh)
    chassis.remove(mesh)
  }

  for (let name in parts) {
    const part = parts[name]
    if (part.area && part.set) {
      const mesh = new THREE.Mesh()
      mesh.name = name
      mesh.material.visible = false
      chassis.add(mesh)

      utils.load(mesh, `chassis/${part.area}`, false)
    }
  }
}, { immediate: true })

store.$watch('chassis.offsetY',
  offsetY => chassis.position.y = offsetY,
  { immediate: true })
