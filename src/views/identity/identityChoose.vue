<template>
  <div id="identityChoose">
    <div class="title tc">请问您是?</div>
    <div class="identityFrame flex">
      <div class="identity" @click="toggle(index)" v-for="(identity,index) in identitys"
           :class="{border:active===index}">
        <img :src="identity.url"/>
        <div class="text tc">{{identity.group_title}}</div>
      </div>
    </div>
    <div class="tc">
      <button class="next" @click="next">下一步</button>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        active: NaN,
        identitys: [{
          url: '/static/images/maifangFa.png',
          group_title: '买方FA',
          group_id: ''
        }, {
          url: '/static/images/maifangFa.png',
          group_title: '卖方FA',
          group_id: ''
        }, {
          url: '/static/images/touzifang.png',
          group_title: '投资方',
          group_id: ''
        }, {
          url: '/static/images/chuangyezhe.png',
          group_title: '创业者',
          group_id: ''
        }, {
          url: '/static/images/qita.png',
          group_title: '其他',
          group_id: ''
        }]
      }
    },
    methods: {
      toggle(i){
        this.active = i
      },
      next(){
        if (typeof this.active == "number") {
          this.$http.post(this.URL.setUserGroup, {
            user_id: sessionStorage.user_id,
            group_id: this.active,
          }).then(res => {
            console.log(res)
            sessionStorage.id=res.data.id
          })
          this.$router.push('/identityDetail')
        } else {
          this.$tool.error('请选择身份')
        }

      },
      // 获取身份列表信息
      getIdentity(){
        this.$http.post(this.URL.getGroupIdentify, {}).then(
          res => {
            this.identitys.forEach((x, index) => {
              x.group_id = res.data.data[index].group_id
            })
          }
        )
      }
    },
    created(){
      this.getIdentity()
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/indentity.less";
</style>
