<template>
  <div class="v-interact" @click="click()">
    <div class="v-buttons">
      <button :class="{ active: current == 'selector' }" @click.stop="toggleCurrent('selector')"></button>
      <button class="active" @click.stop="changeSituation()"></button>
      <button :class="{ active: current == 'remolder' }" @click.stop="toggleCurrent('remolder')"></button>
      <button :class="{ active:store.rotation }" @click="store.rotation = !store.rotation"></button>
      <button :class="{ active:store.music }" @click="store.music = !store.music"></button>
      <button class="active" @click="close()"></button>
      <!-- <button class="logo"><a href="http://sya.org.cn"><img class="slogan" src="./slogan.png"><img class="support"src="./support.png"></a></button> -->
    </div>
    <vehicle-selector v-if="current == 'selector'"></vehicle-selector>
    <vehicle-remolder v-if="current == 'remolder'"></vehicle-remolder>
  </div>
</template>
<style>
.v-interact {
  width: 100%;
  height: 100%;
}
.v-buttons {
  position: absolute;
  top: 10px;
  left: 60px;
  z-index: 20;
}
.v-buttons button {
  width: 40px;
  height: 40px;
  outline: none;
  margin: 10px;
  border: none;
  -webkit-appearance: none;
  background-color: transparent;
  background-image: url('./buttons.png');
  opacity: .5;
  cursor: pointer;
  background-size:cover;
}
.v-buttons .active {
  opacity: 1;
}
.v-buttons button:nth-child(1) { background-position: 0px 0; }
.v-buttons button:nth-child(2) { background-position: 0px -44px; }
.v-buttons button:nth-child(3) { background-position: 0px -88px; }
.v-buttons button:nth-child(4) { background-position: 0px -132px; }
.v-buttons button:nth-child(5) { background-position: 0px -176px; }
/*.v-buttons button:nth-child(6) { background-position: 0px -220px; }*/
.v-buttons button:nth-child(6) { background-position: 0px -264px; }
.v-buttons button.logo{
  background-image: url('./SYA.png');
  background-size:cover;
  position: relative;
}
.logo:hover{
  opacity: 1;
}
.slogan {
  position: absolute;
  width: 150px;
  opacity: 0;
  left: 40px;
  top: -36px;
  transition:0.5s;
}
.logo:hover .slogan{
  display: block;
  top: -11px;
  opacity: 1;
}
.support {
  position: absolute;
  width: 150px;
  opacity: 0;
  left: 120px;
  top: -15px;
  transition:0.5s;
}
.logo:hover .support{
  display: block;
  left:180px;
  opacity: 1;
}
</style>
<script>
   module.exports = {
    data: () => ({
      store: require('../store'),
      current: ''
    }),
    methods: {
      changeSituation() {
        this.store.situation = {
          'garage': 'ground',
          'ground': 'lab',
          'lab': 'garage'
        }[this.store.situation]
      },
      click() {
        if (this.current === 'selector') {
          this.current = ''
        }
      },
      toggleCurrent(current) {
        this.current = (this.current === current ? '' : current)
      },
      close() {
        if (location.hash[0] == '#') {
          location.href = location.hash.slice(1) + '#close'
        } else {
          window.close()
        }
      }
    },
    components: {
      vehicleSelector: require('./selector'),
      vehicleRemolder: require('./remolder')
    },
    watch:{
      current: function (value) {
        this.store.hoverEnabled = (value !== 'selector')
      },
      'store.currentPartName':function(value){
        if(value) this.current = 'remolder'
      }
    },
  }
</script>
