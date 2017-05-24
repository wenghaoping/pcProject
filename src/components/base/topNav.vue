<template>
  <div id="topNav">
    <ul class="select ulfl tc">
      <li @click="toggle(index)" v-for="(tab,index) in tabs" :class="{border:active===index}">
        <router-link :to=" tab.jump ">
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
          {type: '我的人脉',jump:{name:"myContacts"}},
          {type: '跟进记录',jump:{name:"followUp"}}
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
    border-bottom: 1px black solid;height: 58px;
    cursor: pointer;
    li{width: 100px;height: 50px;line-height: 50px;border:4px #fff solid;

      a{
        width: 100px;height: 50px;color:#8492a6;display: block;
      }
    }


    .border{
      border:4px #d3dce6 solid;
      border-bottom: none;
      border-radius: 10px 10px  0 0;
      a{
        color: #20a0ff;
      }
    }
  }
}

</style>
