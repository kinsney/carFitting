<template>
  <div id="wrapper" @mousedown.stop @touchstart.stop @click.stop>
    <ul class="v-parts">
      <li :class="{active: !store.currentPartName}"
        @click="store.currentPartName = ''"><span class="text">整车</span></li>
      <li v-for="part in parts"
        v-if="part.set || part.choices.length > 1"
        :class="{active: store.currentPartName == part.name}"
        @click="store.currentPartName = (store.currentPartName == part.name ? '' : part.name)">
        <span class="text" v-text="map[part.name] || part.name"></span>
        <ul v-if="part.choices.length > 1">
          <li v-for="choice in part.choices" :class="{active: store.currentPart && store.currentPart.choice === choice}" @click.stop="changePart(choice)">
            <img v-if="part.previews[$index]" :src="'chassis/' + part.previews[$index]">
            <span v-else v-text="$index + 1"></span>
          </li>
        </ul>
      </li>
      <li v-for="part in wheels"
        v-if="part.set || part.choices.length > 1"
        :class="{active: store.currentPartName == part.name}"
        @click="store.currentPartName = (store.currentPartName == part.name ? '' : part.name)">
        <span class="text" v-text="map[part.name] || part.name"></span>
        <ul v-if="part.name == 'rim'" class="sizes">
          <li v-for="size in part.sizeNumber" :class="{active: store.wheels.name == size}" @click.stop="store.wheels.name = size">
            <span v-text="size"></span>
            <ul v-if="part.choices.length > 1">
              <li v-for="choice in part.choices" :class="{active: store.currentPart && store.currentPart.choice === choice}" @click.stop="changePart(choice)">
                <img v-if="part.previews[$index]" :src="'wheels/' + part.previews[$index]">
                <span v-else v-text="$index + 1"></span>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li v-for="type in types" @click="changeType($index)" :class="{active: currentType == type}">
        <span class="type" v-text="type ==''?'原车':type"></span>
      </li>
    </ul>
    </div>
  <div id="jack">
      <img src="../../jack.png">
      <div id="vBar">
        <div id="vKnob" :style="'top:'+store.chassis.offsetY+'px';" @mousedown.stop="knobEvent($event)"></div>
      </div>
    </div>
</template>
<style>

  #wrapper {
    position: fixed;
    right: 30px;
    top: 60px;
    font-size: 14px;
    width: 100px;
    height: 540px;
  }
  .v-parts li{
    opacity: 0.5;
    text-align: center;
  }
  .v-parts li.active{
    opacity: 1;
  }
  .v-parts li span{
    width:40px;
    height: 40px;
    border-radius: 40px;
    color: #F5D96C;
    border:1px solid #F5D96C;
    display: inline-block;
    margin-top: 13px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    font-size: 12px
  }

  .v-parts .icon {
    position: relative;
    display: inline-block;
    width: 23px;
    height: 23px;
    border: 6px solid currentColor;
    border-radius: 100%;
    opacity: .5;
    transform: rotate(45deg);
  }

  .v-parts .active .icon {
    opacity: 1;
    transform: rotate(-45deg);
  }

  .v-parts .icon::before,
  .v-parts .icon::after {
    content: '';
    position: absolute;
    display: block;
    height: 8px;
    width: 8px;
    border: 6px solid transparent;
    border-radius: 100%;
  }

  .v-parts .icon::before {
    left: 1px;
    top: 1px;
    border-color: currentColor transparent transparent currentColor;
  }

  .v-parts .icon::after {
    right: 1px;
    bottom: 1px;
    border-color: transparent currentColor currentColor transparent;
  }

  .v-parts ul {
    display: none;
  }

  .v-parts > li.active > ul {
    display: block;
  }
  .v-parts > li.active > ul span {
    width:30px;
    height: 30px;
    border-radius: 30px;
    line-height: 30px;
  }

  .v-parts .sizes {
    position: absolute;
    top: 0;
    right: 80px;
  }

  .v-parts > li.active > ul > li.active > ul {
    display: block;
    position: absolute;
    top: 0;
    right: 50px;
    height: 600px;
    writing-mode: vertical-rl;
    text-align: left;
  }
  .v-parts > li.active > ul > li.active > ul > li {
    display: inline-block;
  }
  .v-parts img{
    height: 49px;
    transition:.5s;
  }
  .v-parts img:hover{
    transform:scale(1.2);
  }
  .v-spring{
    position: absolute;
    right: 0;
    top: 100px;
    width: 100px;
  }
  .type{
    width: 30px !important;
    height: 30px !important;
    border-radius: 30px !important;
    line-height: 30px !important;
  }
  #jack{
    position: absolute;
    right: 120px;
    bottom: 20px;
    width:70px;
  }
  #jack img{
    float: left;
    width: 24px;
    margin-right: 10px;
  }
  #vBar{
    float: left;
    width: 14px;
    height: 126px;
    position: relative;
    background-color: #bbb;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
  }
  #vKnob{
    left: 1px;
    width: 12px;
    height: 20px;
    background-color: white;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    position: relative;
  }
  #wrapper .scroller{
    position: absolute;
    width: 100%;
  }
</style>

<script>
  const Vue = require('vue');
  const store = require('../../../store');
  const chassis = require('../../data/chassis');
  const wheels = require('../../data/wheels')
  const audio = require('../../audio')
  const vanish = require('../../vanish').vanish
  const IScroll = require('iscroll')
  String.prototype.minus=function(str2){

    var head=0;
    var tail=0;
    var result;
    var str1 = this.toString()
    if(str1===str2){result=""}
    else{
      for (;str1[str1.length-1-tail]==str2[str2.length-1-tail];tail++);
        str1=str1.slice(0,str1.length-tail);
        str2=str2.slice(0,str2.length-tail);

        for (;str1[head]==str2[head];head++);
        str1=str1.slice(head,str1.length);
        str2=str2.slice(head,str2.length);
        result = str1.length>str2.length?str1:str2
    }
    return result
  }
  var transfer = function(data){
      var tmp;
      tmp = Object.keys(data).sort().map(function (partName) {
        var part = data[partName]

        var partModel = { name: partName }
        return Vue.util.extend(partModel, part)
      })
    return tmp;
  }
  var transferWheels = function(data,wheels){
      var tmp;
      var sizeNumber = Object.keys(wheels).map(function(size){
        return size
      })
      tmp = Object.keys(data).sort().map(function (partName) {
      var part = data[partName]
      var partModel = { name: partName,sizeNumber:sizeNumber }
      // if(partName=="rim"){
      //   part.choices = Object.keys(data[partName].choices).sort().map(function(brand){
      //     return {name:brand,parts:data[partName].choices[brand]}
      //   })
      // }
      return Vue.util.extend(partModel, part)
    })
    return tmp;
  }
  var transferTypes = function(data){
    var result=[]
    var overlop=[]
    data.forEach(function(part){
      overlop = []
      if(part.choices.length>1){
        result=[]
        part.choices.forEach(function(choice,index){
          var type
            type = choice.minus(part.choices[0]).replace(/\-/g,'').replace(/\./g,'').toUpperCase()
            console.log(type)
            result.push(type)
      })
      }
    })
    console.log(result)
    return result
  }
  module.exports = {
    data: () => ({
      store: store,
      currentBrand: "",
      map: {
        body : "车身",
        fbumper: "前杠",
        rbumper: "后杠",
        sideskirt: "侧裙",
        hood: "引擎盖",
        roof: "车顶",
        trunk: "尾箱",
        reflector: "反光镜",
        caliper: "卡钳",
        "rim": "轮毂",
        "spoiler":"尾翼"
      },
      currentType:""
    }),
    computed: {
      parts() { return transfer(chassis[this.store.chassis.name]) },
      wheels() { return transferWheels(wheels[this.store.wheels.name],wheels) },
      types() { return transferTypes(this.parts)}
    },
    methods: {
      changePart(choice) {
        audio.part();
        this.store.currentPart.choice = choice || ""
      },
      brandSrc(brand){
        return `parts/${brand}/logo.png`
      },
      partSrc(part){
        return this.currentBrand?`parts/${this.currentBrand}/${part}.png`:`parts/bbs/logo.png`
      },
      changeType(index){
        this.currentType = this.types[index]
        this.parts.forEach(function(part){
          if(part.choices.length>1){
            this.store.chassis.parts[part.name].choice = part.choices[index]
          }
        }.bind(this))
      },
      knobEvent(event){
        //拖拽控件
        var knob = document.querySelector('#vKnob')
        var bar = document.querySelector('#jack')
        var initY = event.clientY
        var store = this.store
        var init = store.chassis.offsetY
        function moveEvent(evt){
          evt.stopPropagation()
           var top =  evt.clientY - initY
          store.chassis.offsetY = init + top
          if(knob.offsetTop<0)store.chassis.offsetY = 0
          if(knob.offsetTop>106)store.chassis.offsetY = 106
          document.removeEventListener( 'mouseup', vanish, false );
        }
        function upEvent(evt){
          evt.stopPropagation()
          bar.removeEventListener('mousemove',moveEvent)
          knob.removeEventListener('mouseup',upEvent)
          document.addEventListener('mouseup',vanish,false)
        }
         bar.addEventListener('mousemove',moveEvent)
         knob.addEventListener('mouseup',upEvent)
         document.addEventListener('mouseup',upEvent)
         bar.addEventListener('mouseup',function(){
          bar.removeEventListener('mousemove',moveEvent)
         })


      }
    },
    ready(){
    }
  }
</script>
