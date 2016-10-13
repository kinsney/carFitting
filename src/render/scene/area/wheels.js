const THREE = require('three.js')
const utils = require('../utils')
const store = require('../../../store')

const wheels = module.exports = new THREE.Object3D()

wheels.add(new THREE.Object3D(),
  new THREE.Object3D(),
  new THREE.Object3D(),
  new THREE.Object3D())

wheels.children[2].rotation.y = Math.PI
wheels.children[3].rotation.y = Math.PI

store.$watch('wheels.parts', parts => {
  wheels.children.forEach(wheel => {
    for (let mesh = wheel.children[0];
        mesh != null;
        mesh = wheel.children[0]) {
      utils.dispose(mesh)
      wheel.remove(mesh)
    }
  })

  for (let name in parts) {
    const part = parts[name]
    if (part.area) {
      let sampleMesh = wheels.children.reduce((first, wheel) => {
        const mesh = new THREE.Mesh()
        mesh.name = name
        mesh.material.visible = false
        wheel.add(mesh)
        return first == null ? mesh : first
      }, null)

      utils.load(sampleMesh, 'wheels/' + part.area, false, () => {
        wheels.children.forEach(
          wheel => wheel.getObjectByName(name).geometry = sampleMesh.geometry
        )
      })
    }
  }
}, { immediate: true })

store.$watch('wheels.offsetX', offsetX =>
  wheels.children.forEach((wheel, index) => {
    wheel.position.x = index < 2 ? offsetX : -offsetX
  }),
{ immediate: true })

store.$watch('wheels.offsetZ', offsetZ =>
  wheels.children.forEach((wheel, index) => {
    wheel.position.z = index % 2 ? offsetZ : -offsetZ
  }),
{ immediate: true })
