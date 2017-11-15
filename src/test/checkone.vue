<template>
  <div id="check">
    <draggable v-model="tags" :move="getdata" @update="datadragEnd">
      <transition-group>
        <div v-for="element in tags" :key="element.id" class="tab">
          {{element.name}}
        </div>
      </transition-group>
    </draggable>
    <card-upload :uploadCardAddress="uploadCardAddress" :filetypes="filetypes" :uploadDate="uploadDate"
                 @delete="remove" @success="success">

    </card-upload>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import cardUpload from '@/components/upload/cardUpload.vue';
  export default {
    data () {
      return {
        tags: [
          {id: 0, name: '1'},
          {id: 1, name: '2'},
          {id: 2, name: '3'},
          {id: 3, name: '4'},
          {id: 4, name: '5'}
        ],
        uploadCardAddress: this.URL.weitianshiLine + this.URL.uploadConnectCard + localStorage.token,
        filetypes: ['.jpg', '.png', '.jpeg'],
        uploadDate: {user_id: localStorage.user_id}
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
      },
      remove (e) {
        console.log(e);
      },
      success (e) {
        console.log(e);
      }
    },
    mounted () {

    },
    components: {
      draggable,
      cardUpload
    },
    watch: {
      '$route' (to, from) {

      }
    }
  };
</script>

<style lang="less">
.tab{
  width: 100px;
  height: 50px;
  background: red;
  margin-bottom: 10px;
}

</style>
