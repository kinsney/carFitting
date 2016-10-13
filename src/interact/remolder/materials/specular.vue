<template>
<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1080 1080" class="v-materials specular" @click.stop="afterClick($event)" id="spe" v-el:svg>
  <component is="color" v-if="current == 'junior'" :value.sync="value" :BRangle.sync="BRangle" :BLangle.sync="BLangle" :current.sync="current" :cancel.sync='cancel'></component>
  <component is="proColor" v-if="current == 'pro'" :current.sync="current" :BRangle.sync="BRangle" :BLangle.sync="BLangle"  :deg="deg" :value.sync="value" ></component>
</svg>
</template>

<style>
.specular{
  left: 500px;
}
</style>

<script>

const repaint = require('./repaint')
const store = require('../../../store')
const parts = require('../../data/chassis.json')
module.exports = {
  data: () => ({
    store: store,
    color:{h:0,s:'100%',l:'50%'},
    BLangle:0,
    BRangle:0,
    current:'junior',
    deg:'0',
    colorpad:[{h:0,s:'100%',l:'50%'},{h:0,s:'100%',l:'50%'},{h:0,s:'100%',l:'50%'},{h:0,s:'100%',l:'50%'},{h:0,s:'100%',l:'50%'},{h:0,s:'100%',l:'50%'}],
    material:"normal",
    materials: [],
  }),
  props:['value'],
  components: {
    color: require('./spec_color.vue'),
    proColor: require('./spec_pro_color.vue'),
  },
  watch: {
    current() {
      repaint()
    }
  },
  methods:{
    afterClick(e){
      const width = 500
      const height = 360
      const radius = Math.pow(Math.pow(e.offsetX-width/2,2)+Math.pow(e.offsetY-height/2,2),1/2)
      if(radius<0.25*width){
        this.deg = e.offsetX>width/2?Math.asin((height/2-e.offsetY)/radius)/Math.PI*180:180-Math.asin((height/2-e.offsetY)/radius)/Math.PI*180;
        this.deg = this.deg>=0?this.deg:this.deg+360
      }
      if(radius>0.3*width&&radius<0.3*width+15){
          var angle = e.offsetX>width/2?Math.asin((height/2-e.offsetY)/radius)/Math.PI*180:180-Math.asin((height/2-e.offsetY)/radius)/Math.PI*180;
          if (angle>-15&&angle<75){
            this.BRangle = 10-(Math.round((angle+10)/8))*8
          }
          angle = angle>=0?angle:angle+360
          if(angle>145&&angle<235){
            this.BLangle = 30-(Math.round((angle-150)/8))*8
          }
      }
    }
  }
}
</script>
