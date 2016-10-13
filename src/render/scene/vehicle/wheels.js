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

var vms = Object.create(null)

store.$watch('wheels.parts', parts => {
  wheels.children.forEach(wheel => {
    for (let mesh = wheel.children[0];
        mesh != null;
        mesh = wheel.children[0]) {
      utils.dispose(mesh)
      wheel.remove(mesh)
    }
  })

  for (let name in vms) {
    vms[name].$destroy()
    delete vms[name]
  }

  for (let name in parts) {
    const part = parts[name]
    let sampleMesh = wheels.children.reduce((first, wheel) => {
      const mesh = new THREE.Mesh()
      mesh.name = name
      mesh.castShadow = true
      wheel.add(mesh)
      return first == null ? mesh : first
    }, null)

    vms[name] = utils.initVM(sampleMesh, part, 'wheels/', true)
    vms[name].$on('load', () => {
      wheels.children.forEach((wheel, index) => {
        var object = wheel.getObjectByName(name)
        Object.assign(object, {
          geometry: sampleMesh.geometry,
          material: sampleMesh.material
        })
        if (index > 1 && name === 'caliper') {
          object.rotation.y = Math.PI
        }
      })
    })
  }
}, { immediate: true })

store.$watch('hoverPartName', (newPart, oldPart) => {
  wheels.children.forEach(wheel => {
    const newMesh = wheel.getObjectByName(newPart)
    const oldMesh = wheel.getObjectByName(oldPart)

    utils.hover(newMesh, true)
    utils.hover(oldMesh, false)
  })
})

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
