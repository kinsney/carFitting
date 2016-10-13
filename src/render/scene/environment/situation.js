const THREE = require('three.js')

const loader = new THREE.JSONLoader()
const store = require('../../../store')

const choices = ['garage', 'ground', 'lab']
const data = {}

const situation = module.exports = new THREE.Mesh()
situation.position.y = 200
situation.receiveShadow = true
situation.castShadow = true

let loaded = 0
choices.forEach(choice => {
  loader.load(`${choice}/${choice}.json`, (geometry, materials) => {
    data[choice] = {
      geometry,
      material: new THREE.MeshFaceMaterial(materials)
    }

    if (++loaded === choices.length) {
      store.$watch('situation', function (value) {
        Object.assign(situation, data[value])
      }, { immediate: true })
    }
  })
})
