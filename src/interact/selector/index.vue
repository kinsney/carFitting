<template>
  <div class="v-scroll">
    <component is="scroller" :items="brands"
      :current-item.sync="currentBrand"
      class="brands-scroller"></component>
    <component is="scroller" :items="currentBrand.vehicles"
      :current-item.sync="currentVehicle"
      class="vehicles-scroller"></component>
  </div>
</template>

<style>

.brands-scroller {
  top: 100px;
  left: 70px;
}
.vehicles-scroller {
  top: 100px;
  left: 300px;
}

</style>

<script>
var Vue = require('vue')
const data = {
  store: require('../../store'),
  brands: require('../data/vehicles')
}

data.currentBrand = data.brands[0]
data.currentVehicle = data.currentBrand.vehicles[0]

module.exports = {
  data: () => data,
  methods: {
    stopped () { console.log('stopped') }
  },
  components: {
    scroller: require('./scroller/index.vue')
  },
  watch: {
    currentVehicle(vehicle) {
      this.store.chassis.name = vehicle.id
    }
  }
}


</script>
