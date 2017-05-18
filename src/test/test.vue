<template>
  <div id="test">
    <ul class="select ulfl tc">
      <li @click="toggle(index)" v-for="(tab,index) in tabs" :class="{border:active===index}">
        <a :href=" tab.jump ">
          {{tab.type}}
        </a>
      </li>
    </ul>

    <!--下方主内容切换区-->
    <main>
      <transition name="fade"  mode="out-in">
        <router-view class="view">


        </router-view>
      </transition>
    </main>
  </div>

</template>

<script type="text/ecmascript-6">

export default {
  name: 'hello',
  data () {
    return {
        active: 0,
        tabs: [
          {type: '我的项目',jump:'myProject'},
          {type: '我的人脉',jump:'myContacts'},
          {type: '跟进记录',jump:'followUp'}
        ]
    }
  },
  methods: {
    toggle(i){
      this.active = i
      console.log(i)
    }
  }
}
</script>

<style scoped lang="less">

  .select{
    border-bottom: 1px black solid;height: 58px;
    cursor: pointer;
    li{width: 100px;height: 50px;line-height: 50px;border:4px #fff solid;

      a{
        color:#8492a6;
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

</style>
