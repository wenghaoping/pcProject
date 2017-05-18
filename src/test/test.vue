<template>
  <div id="test">

    <input type="text" id="name"/>name
    <input type="text" id="age"/>age

    <button v-on:click="test">测试</button>

  </div>

</template>

<script type="text/ecmascript-6">
  import tool from '../assets/js/tool.js'
  export default {
    name: 'hello',
    data () {
      return {
        active: 0
      }
    },
    methods: {
      test(){
          console.log(11212)
          var value=this.$moment().getFormData();
          console.log(value)
      }
    }
  }
</script>

<style lang="less">


</style>
