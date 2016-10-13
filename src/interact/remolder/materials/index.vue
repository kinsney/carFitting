<template>
<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1080 1080" class="v-materials" @click.stop="afterClick($event)" id="regular" v-el:svg>
  <component is="color" v-if="current == 'junior'"  :value.sync="color" :BRangle.sync="BRangle" :BLangle.sync="BLangle" :current.sync="current" :colorpad.sync="colorpad" :material.sync="material" :cancel.sync="cancel"></component>
  <component is="proColor" v-if="current == 'pro'"  :current.sync="current" :BRangle.sync="BRangle" :BLangle.sync="BLangle"  :deg="deg" :value.sync="color" :colorpad.sync="colorpad" :material.sync="material" ></component>
</svg>
<component is="specular" v-if="material == 'discolor'" :value.sync="specular"></component>
<div class="fastColor">
  <ul v-if="material == 'discolor'" class="discolor">
    <li v-for="fastcolor in materialToColor[material]"  @click="color = fastcolor['nor'],specular = fastcolor['spe']"><div class="circle" :style="'background:'+toHex(fastcolor['nor'])"></div><div class="circle right" :style="'background:'+toHex(fastcolor['spe'])"></div></li>
  </ul>
  <ul v-else class= "normal" >
    <li v-for="fastcolor in materialToColor[material]" :style="'background:'+toHex(fastcolor)" @click="color = fastcolor"></li>
  </ul>
</div>
</template>

<style>
.v-materials {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 500px;
  height: 360px;
}
.st56{
  opacity: 0.5
}
.st1{
  fill:#F5D96C;
}
.fastColor{
  position: absolute;
  z-index: 999;
  left: 500px;
  bottom: 10px;
  width: 380px;
}
.fastColor .discolor li{
display: inline-block;
margin: 0 5px;
}
.fastColor .discolor li .circle{
    width: 9px;
    height: 18px;
    display: inline-block;
    border-radius:9px 0px 0px 9px;
    border: 1px #F5D96C solid;
    border-width: 1px 0px;


}
.fastColor .discolor li .circle.right {
    border-radius:0px 9px 9px 0px;
}
.fastColor .normal li{

    width: 18px;
    height: 18px;
    display: inline-block;
    border-radius: 20px;
    margin: 0 5px;
    border: 1px #F5D96C solid

}
</style>

<script>
const repaint = require('./repaint')
const store = require('../../../store')
const parts = require('../../data/chassis.json')
module.exports = {
  data: () => ({
    cancel:false,
    store: store,
    color:{h:0,s:'100%',l:'50%'},
    BLangle:0,
    BRangle:0,
    current:'junior',
    deg:'0',
    colorpad:[{h:0,s:'100%',l:'50%'},{h:0,s:'100%',l:'50%'},{h:0,s:'100%',l:'50%'},{h:0,s:'100%',l:'50%'},{h:0,s:'100%',l:'50%'},{h:0,s:'100%',l:'50%'}],
    material:"normal",
    materials: [],
    specular:{h:1,s:'100%',l:'100%'},
    materialToColor:{
      "matte":[{h:0.16667,s:'60%',l:'50%'},
               {h:0.52777,s:'30%',l:'60%'},
               {h:0.09722,s:'10%',l:'40%'},
               {h:0.88889,s:'20%',l:'30%'},
               {h:0.1,s:'100%',l:'50%'},
               {h:0.83333,s:'30%',l:'50%'},
               {h:0.58333,s:'40%',l:'60%'},
               {h:0.63888,s:'50%',l:'40%'},
               {h:0.97222,s:'30%',l:'50%'},
               {h:0.13888,s:'50%',l:'50%'},
               {h:0.05555,s:'20%',l:'30%'},
               {h:0.27777,s:'10%',l:'30%'},
               {h:0.13888,s:'40%',l:'50%'},
               {h:0.11111,s:'20%',l:'40%'},
               {h:0.91666,s:'30%',l:'70%'},
               {h:0.97222,s:'60%',l:'30%'},
               {h:0.61111,s:'20%',l:'50%'},
               {h:0.63888,s:'50%',l:'30%'},
               {h:0.22222,s:'40%',l:'50%'},
               {h:0.15277,s:'70%',l:'50%'},
               {h:0.25,s:'40%',l:'70%'},
               {h:0.61111,s:'60%',l:'60%'}],
      "normal":[{h:0.69444,s:'40%',l:'30%'},
                {h:0,s:'60%',l:'40%'},
                {h:0,s:'10%',l:'40%'},
                {h:0.44444,s:'10%',l:'30%'},
                {h:0,s:'10%',l:'20%'},
                {h:0.5,s:'40%',l:'40%'},
                {h:0.583333,s:'40%',l:'40%'},
                {h:0.083333,s:'50%',l:'40%'},
                {h:0.916666,s:'50%',l:'70%'},
                {h:0.027777,s:'80%',l:'30%'},
                {h:0.5,s:'30%',l:'60%'},
                {h:0.18,s:'60%',l:'50%'},
                {h:0.361111,s:'30%',l:'50%'},
                {h:0.444444,s:'70%',l:'20%'},
                {h:0.888889,s:'60%',l:'30%'},
                {h:0.027777,s:'50%',l:'30%'},
                {h:0.75,s:'30%',l:'30%'},
                {h:0.777778,s:'30%',l:'40%'},
                {h:0.63888,s:'50%',l:'50%'},
                {h:0.61111,s:'50%',l:'60%'},
                {h:0.63888,s:'40%',l:'60%'},
                {h:0.08333,s:'60%',l:'60%'},
                {h:0.52777,s:'40%',l:'40%'}],
      "electroplate":[{h:0,s:'95%',l:'80%'},{h:0.5,s:'90%',l:'65%'},{h:0.56666,s:'90%',l:'90%'}],
      "discolor":[{nor:{h:1,s:'100%',l:'100%'},spe:{h:0.583333,s:'50%',l:'60%'}},
                  {nor:{h:1,s:'100%',l:'100%'},spe:{h:0.125,s:'60%',l:'85%'}},
                  {nor:{h:1,s:'100%',l:'100%'},spe:{h:0.25,s:'50%',l:'60%'}},
                  {nor:{h:0.8,s:'30%',l:'30%'},spe:{h:0.38888,s:'10%',l:'30%'}},
                  {nor:{h:0.52777,s:'40%',l:'30%'},spe:{h:0.27777,s:'20%',l:'40%'}}]
    }
  }),
  computed: {
    isAll () {
      var specificParts = parts[this.store.chassis.name]
      return Object.keys(specificParts).filter((partName) => {
        return specificParts[partName].all
      })
    }
  },
  components: {
    color: require('./color.vue'),
    proColor: require('./proColor.vue'),
    specular: require('./specular.vue')
  },
  methods:{
    toHex :function(value){
        var h = value.h;
        var s = value.s;
        var l = value.l;
        var color = new THREE.Color("hsl("+h+","+s+","+l+")")
        return '#'+color.getHexString()
    },
    afterClick(e){
      console.log(e.layerX,e.layerY,e.layerX,e.layerY,e.pageX,e.pageY)
      const width = 500
      const height = 360
      const radius = Math.pow(Math.pow(e.layerX-width/2,2)+Math.pow(e.layerY-height/2,2),1/2)
      if(radius<0.25*width){
        this.deg = e.layerX>width/2?Math.asin((height/2-e.layerY)/radius)/Math.PI*180:180-Math.asin((height/2-e.layerY)/radius)/Math.PI*180;
        this.deg = this.deg>=0?this.deg:this.deg+360
      }
      if(radius>0.3*width&&radius<0.3*width+15){
          var angle = e.layerX>width/2?Math.asin((height/2-e.layerY)/radius)/Math.PI*180:180-Math.asin((height/2-e.layerY)/radius)/Math.PI*180;
          if (angle>-15&&angle<75){
            this.BRangle = 10-(Math.round((angle+10)/8))*8
          }
          angle = angle>=0?angle:angle+360
          if(angle>145&&angle<235){
            this.BLangle = 30-(Math.round((angle-150)/8))*8
          }
      }

    },
    cmp( x, y ) {
        if ( x === y ) {
         return true;
        }
        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
         return false;
        }
        if ( x.constructor !== y.constructor ) {
         return false;
        }
        for ( var p in x ) {
         if ( x.hasOwnProperty( p ) ) {
         if ( ! y.hasOwnProperty( p ) ) {
          return false;
         }
         if ( x[ p ] === y[ p ] ) {
          continue;
         }
         if ( typeof( x[ p ] ) !== "object" ) {
          return false;
         }
         if ( ! Object.equals( x[ p ], y[ p ] ) ) {
          return false;
         }
         }
      }
      for ( p in y ) {
       if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
       return false;
       }
      }
      return true;
    }
  },
  watch:{
    color:function(value){
      if (this.store.currentPart) {
        this.store.currentPart.color = value
      } else {
        this.isAll.forEach(function (partName) {
          this.store.chassis.parts[partName].color = value
        }.bind(this))
      }
    },
    material:function(value,oldvalue){
      if(this.store.currentPartName){
        this.store.currentPart.material = value

      }else{
        this.isAll.forEach(function (partName) {
          this.store.chassis.parts[partName].material = value
        }.bind(this))
        if(oldvalue == 'discolor'){
          this.isAll.forEach(function (partName) {
            let part  = this.store.chassis.parts[partName]
          part.specular = Object.assign({},part.color)
        }.bind(this))
        }
      }
    },
    'store.currentPartName':function(value,oldvalue){
      if (this.store.currentPart) this.color = this.store.currentPart.color
      var oldpart = this.store.chassis.parts[oldvalue] || this.store.wheels.parts[oldvalue]
      if(oldpart){
        this.colorpad.push(oldpart.color)
        this.colorpad.shift()
      }
    },
    specular:function(value,oldvalue){
      if (this.store.currentPart) {
        this.store.currentPart.specular = value
      } else {
        this.isAll.forEach(function (partName) {
          this.store.chassis.parts[partName].specular = value
        }.bind(this))
      }
    },
    current() {
      repaint()
    }
  }
}
</script>
