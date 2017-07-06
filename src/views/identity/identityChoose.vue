<template>
    <div id="identityChoose">
      <div class="title tc">请问您是?</div>
      <div class="identityFrame flex">
        <div class="identity" @click="toggle(index)" v-for="(identity,index) in identitys" :class="{border:active===index}">
          <img src="identity.url"/>
          <div class="text tc">{{identity.text}}</div>
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
                active:NaN,
                identitys:[{
                  url:'',
                  text:'买方FA'
                },{
                  url:'',
                  text:'卖方FA'
                },{
                  url:'',
                  text:'投资方'
                },{
                  url:'',
                  text:'创业者'
                },{
                  url:'',
                  text:'其他'
                }]
            }
        },
        methods: {
          toggle(i){
            this.active = i
          },
          next(){
              this.$router.push('/identityDetail')
          },
          getIdentity(){
              this.$http.post(this.URL.getGroupIdentify,{}).then(
                  res=>{
                      console.log(res)
                  }
              )
          }
        },
        created(){
//          this.getIdentity()
        }
    }
</script>

<style scoped lang="less">
  @import "../../assets/css/indentity.less";
</style>
