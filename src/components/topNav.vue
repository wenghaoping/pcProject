<template>
  <div id="topNav">
    <ul class="select ulfl tc">
      <li @click="toggle(index)" v-for="(tab,index) in tabs">
        <router-link :to=" tab.jump " :class="{border:active===index}">
          {{tab.type}}
        </router-link>
      </li>
    </ul>

  </div>

</template>

<script type="text/ecmascript-6">

  export default {
    name: 'hello',
    data () {
      return {
        active: 0,
        tabs: [
          {type: '我的项目',jump:{name:"myProject"}},
/*          {type: '我的人脉',jump:{name:"myContacts"}},
          {type: '跟进记录',jump:{name:"followUp"}}*/
        ]
      }
    },
    methods: {
      toggle(i){
        this.active = i

      }
    }
  }
</script>

<style lang="less">
#topNav{
  .select{
    height: 50px;
    cursor: pointer;
    padding-left: 25px;
    background: #ffffff;
    width: 1336px;
    li{width: 100px;height: 50px;line-height: 50px;
      a{
        height: 40px;color:#8492a6;display: block;font-size: 15px;
      }
    }
    .border{
      border-bottom: 2px #20a0ff solid;
      color: #20a0ff;
    }
  }
}

</style>
