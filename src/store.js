const Vue = require('vue')
const THREE = require('three.js')
const chassis = require('./interact/data/chassis')
const wheels = require('./interact/data/wheels')
const position = require('./interact/data/position')

function toHSLObject(colorString) {
  var color = new THREE.Color(colorString)
  var hsl = color.getHSL()
  return {
    h: hsl.h,
    s: hsl.s * 100 + '%',
    l: hsl.l * 100 + '%'
  }
}

window.store = module.exports = new Vue({
  data: {
    music: false,
    rotation: true,
    hoverEnabled: true,
    hoverPartName: null,
    currentPartName: null,
    situation: 'garage',
    chassis: {
      name: '',
      offsetY: 30,
      parts: null
    },
    wheels: {
      name: '',
      offsetX: 0,
      offsetZ: 0,
      parts: null
    }
  },
  computed: {
    currentPart () {
      return this.chassis.parts[this.currentPartName] ||
        this.wheels.parts[this.currentPartName] ||
        null
    }
  },
  watch: {
    'chassis.name' (name) {
      const chassisParts = {}
      const partsData = chassis[name]

      Object.keys(partsData).sort().forEach(partName => {
        const partData = partsData[partName]
        chassisParts[partName] = {
          name: partName,
          area: partData.area,
          choice: partData.choices[0],
          color: toHSLObject(partData.color),
          material: partData.material,
          all: partData.all,
          set: partData.set
        }
      })

      this.chassis.parts = chassisParts
      this.chassis.offsetY = 30
      this.wheels.offsetX = Math.abs(position[name].wheels[0])
      this.wheels.offsetZ = Math.abs(position[name].wheels[1])
    },
    'wheels.name' (name) {
      const wheelsParts = {}
      const partsData = wheels[name]

      Object.keys(partsData).sort().forEach(partName => {
        const partData = partsData[partName]
        wheelsParts[partName] = {
          name: partName,
          area: partData.area,
          choice: partData.choices[0],
          color: toHSLObject(partData.color),
          material: partData.material,
          all: partData.all,
          set: partData.set,
        }
      })
      this.wheels.parts = wheelsParts
    }
  },
  created () {
    this.chassis.name = 'a3'
    this.wheels.name = '19'
  }
})
/**
 * part 格式
 * {
 *   name: 'spoiler',
 *   choice: 'spoiler2',
 *   set: true,
 *   color: '',
 *   reflectivity: 0
 * }
 */
