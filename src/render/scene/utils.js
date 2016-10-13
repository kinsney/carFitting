const Vue = require('vue')
const THREE = require('three.js')

const reflection = require('./reflection')
const materials = require('./materials')

const loader = new THREE.JSONLoader()

const toTHREEColorObject = color =>
  new THREE.Color(`hsl(${color.h}, ${color.s}, ${color.l})`)

const getPureMaterial = mesh => {
  const materials = mesh.material.materials

  if (materials == null) {
    return null
  }

  for (let i = 0, l = materials.length; i < l; i++) {
    const material = materials[i]
    if (material.map == null) {
      return material
    }
  }

  return null
}

const load = exports.load = (mesh, file, includeMaterial, callback) => {
  const apply = (geometry, material) => {
    Object.assign(mesh, includeMaterial ? {geometry, material} : {geometry})

    if (typeof callback === 'function') {
      callback()
    }
  }

  if (file !== '') {
    loader.load(file, (geometry, materials) => {
      materials.forEach(material => {
        material.side = THREE.DoubleSide
        if (material.name === 'mirror') {
          material.envMap = reflection
        }
      })
      const material = new THREE.MeshFaceMaterial(materials)
      apply(geometry, material)
    })
  } else {
    // Hide the mesh
    setTimeout(() => {
      const material = new THREE.Material()
      material.visible = false
      apply(new THREE.Geometry(), material)
    }, 0)
  }
}

const dispose = exports.dispose = mesh => {
  const disposeMaterial = material => {
    if (material.envMap != null) {
      material.envMap.dispose()
    }
    if (material.map != null) {
      material.map.dispose()
    }
    material.dispose()
  }

  if (mesh.material != null) {
    if (mesh.material.materials) {
      mesh.material.materials.forEach(disposeMaterial)
    } else {
      disposeMaterial(mesh.material)
    }
  }

  if (mesh.geometry != null) {
    mesh.geometry.dispose()
  }
}

exports.initVM = (mesh, model, prefix, autoLoad = false) => new Vue({
  // options
  mesh: mesh,
  material: null,

  data: model,
  watch: {
    color: {
      handler: 'setColor',
      deep: true
    },
    specular: {
      handler: 'setSpecular',
      deep: true
    },
    material: 'setMaterial',
    choice: 'setChoice'
  },
  methods: {
    setColor (color) {
      const colorObject = toTHREEColorObject(color)
      const material = this.$options.material
      if (material != null) {
        material.color = colorObject
        if (this.material !== 'discolor') {
          material.specular = colorObject.clone()
        }
      }
    },
    setSpecular (color) {
      const colorObject = toTHREEColorObject(color)
      const material = this.$options.material
      material.specular = colorObject
    },
    setMaterial (materialStyle, oldMaterialStyle) {

      const materialFunc = materials[materialStyle]
      const material = this.$options.material
      if (typeof materialFunc === 'function' && material != null) {
        materialFunc(material)
        material.needsUpdate = true
      }
      if (materialStyle === 'discolor') {
        Vue.set(this, 'specular', Object.assign({}, this.color))
      }
      if (oldMaterialStyle === 'discolor') {
        Vue.set(this, 'specular', Object.assign({}, this.color))
      }
    },
    setChoice (choice) {
      const mesh = this.$options.mesh

      dispose(mesh)
      this.$options.material = null

      load(mesh, choice ? prefix + choice : '', true, () => {
        this.$emit('load')
      })
    }
  },
  events: {
    load () {
      this.$options.material = getPureMaterial(mesh)
      this.setColor(this.color)
      this.setMaterial(this.material)
    }
  },
  created () {
    if (autoLoad) {
      this.setChoice(this.choice)
    } else {
      this.$emit('load')
    }
  }
})

exports.hover = (mesh, value) => {
  const color = new THREE.Color(value ? '#666' : '#000')
  if (mesh != null && mesh.material && mesh.material.materials) {
    mesh.material.materials.forEach(material => {
      material.emissive = color
    })
  }
}
