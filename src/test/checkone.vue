<template>
  <div id="check">
    <draggable v-model="tags" :move="getdata" @update="datadragEnd">
      <transition-group>
        <div v-for="element in tags" :key="element.id" class="tab">
          {{element.name}}
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  export default {
    data () {
      return {
        tags: [
          {id: 0, name: '1'},
          {id: 1, name: '2'},
          {id: 2, name: '3'},
          {id: 3, name: '4'},
          {id: 4, name: '5'}
        ]
      };
    },
    methods: {
      getdata (evt) {
        console.log(evt.draggedContext.element.id);
      },
      datadragEnd (evt) {
        console.log('拖动前的索引 :' + evt.oldIndex);
        console.log('拖动后的索引 :' + evt.newIndex);
        console.log(this.tags);
      }
    },
    mounted () {

    },
    components: {
      draggable
    },
    watch: {
      '$route' (to, from) {

      }
    }
  };
</script>

<style lang="less" scoped>
.tab{
  width: 100px;
  height: 50px;
  background: red;
  margin-bottom: 10px;
}
</style>
