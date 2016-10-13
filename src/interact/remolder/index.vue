<template>
<div class="remolding">
  <component is="parts"></component>
  <component is="materials"
    v-show="store.currentPart == null || store.currentPart.set"></component>
</div>
<style type="text/css">
  .remolding{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 15;
    background: -webkit-radial-gradient(center, circle cover, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 40%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.09) 60%, rgba(0,0,0,0.12) 65%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.26) 75%, rgba(0,0,0,0.31) 78%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.38) 81%, rgba(0,0,0,0.42) 82%, rgba(0,0,0,0.45) 83%, rgba(0,0,0,0.52) 85%, rgba(0,0,0,0.75) 90%, rgba(0,0,0,0.9) 95%, #000 100%);
  }
</style>
</template>
<script>
module.exports = {
  data: () => ({
    store: require('../../store')
  }),
  components: {
    parts: require('./parts/index.vue'),
    materials: require('./materials/index.vue')
  }
}
</script>
