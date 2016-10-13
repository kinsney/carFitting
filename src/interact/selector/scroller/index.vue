<template>
<div class="v-scroller" @mousedown.stop @touchstart.stop @click.stop>
  <div v-el:wrapper>
    <ul>
      <li v-if="!item.lock" v-for="item in items" v-html="item.html" @click="currentItem = item"></li>
      <li v-if="item.lock" v-for="item in items" v-html="item.html" @click="note"
        ></li>
    </ul>
  </div>
</div>
</template>

<style>

.v-scroller {
  position: absolute;
  overflow: hidden;
  height: 540px;
  background-image: linear-gradient(to bottom,
    transparent 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
  mask-image: linear-gradient(to bottom,
    transparent 0%, black 50%, transparent 100%);
  color: #F5D96C;
  font-size: 20px;
  text-align: center;
  line-height: 1.25;
}

.v-scroller::before,
.v-scroller::after {
  content: '';
  position: absolute;
  height: 1px;
  width: 30px;
  display: block;
  top: 50%;
  margin-top: -5px;
  background-color: currentColor;
}

.v-scroller::before { left: 0; }
.v-scroller::after { right: 0; }

.v-scroller > div {
  position: relative;
  height: 60px;
  border-top: 240px solid transparent;
  border-bottom: 240px solid transparent;
}

.v-scroller li {
  width: 220px;
  height: 60px;
  cursor: pointer;
  position: relative;
}

.v-scroller small {
  font-size: 80%;
}
.v-scroller img.icon{
  position: absolute;
    width: 30px;
    left: 40px;
}
.v-scroller img.lock{
  position: absolute;
    width: 22px;
    top: 0;
    right: 30px;
}


</style>

<script>
const IScroll = require('iscroll')

var vm=module.exports = {
  props: {
    items: {
      type: Array,
      required: true
    },
    currentItem: {
      twoWay: true,
      required: true
    }
  },
  computed: {
    currentIndex() {
      return this.items.indexOf(this.currentItem)
    }
  },
  watch: {
    items() {
      this.$nextTick(() => this.refresh())
    },
    currentItem() {
      this.$nextTick(() =>
        this.$data.$iScroll.goToPage(0, this.currentIndex))
    }
  },
  ready() {
    this.$nextTick(() => this.refresh())
  },
  methods: {
    refresh() {
      if (this.$data.$iScroll != null) {
        this.$data.$iScroll.destroy()
      }
      this.$data.$iScroll = new IScroll(this.$els.wrapper, {
        mouseWheel: true,
        snap: true,
        bindToWrapper:true,
      })
      this.$data.$iScroll.on('scrollEnd', (e) => {
        const index = this.$data.$iScroll.currentPage.pageY
        //线上版
        if(!this.items[index].lock)
        this.currentItem = this.items[index]
      })
      this.$data.$iScroll.goToPage(0, this.currentIndex, 0)
      },
    note:function(){
      var note=document.querySelector('#notification')
      note.style.display='block'
    }
  }
}
var note=document.querySelector('#notification')
note.addEventListener('click',function(e){
  e.stopPropagation();
  note.style.display='none';
})

</script>
