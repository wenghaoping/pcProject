<template>
  <div id="createForm">
    <el-form :model="dateForm" ref="dateForm" label-width="100px" class="demo-dynamic" v-for="(domain, index) in dateForm.domains">
      <el-row :span="24">
        <el-col :span="4">
          <el-form-item
            label="成员姓名"
            :prop="'domains.' + index + '.name'"
            :rules="[{required: true, message: '成员姓名不能为空', trigger: 'blur'},{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]">
            <el-input v-model="domain.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
        <el-form-item
          label="成员职位"
          :prop="'domains.' + index + '.position'"
          :rules="[{required: true, message: '成员职位不能为空', trigger: 'blur'},{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]">
          <el-input v-model="domain.position"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4">
        <el-form-item
          label="股权比例"
          :prop="'domains.' + index + '.money'"
          :rules="[{ required: true, message: '比例不能为空'},{ type: 'number', message: '比例必须为数字值'}]">
          <el-input v-model.number="domain.money"></el-input>
        </el-form-item>

        </el-col>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-row>
    </el-form>
    <br>
    <el-button @click="addDomain">新增成员</el-button>
    <el-button @click="resetForm(dateForm)">重置</el-button>
    <el-button type="primary" @click="submitForm('dateForm')">提交</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  import ElCol from "element-ui/packages/col/src/col";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
  import {tool} from '../assets/js/tool.js'
export default {
  components: {
    ElFormItem,
    ElCol,
    ElForm
  },
  name: 'hello',
  data () {
    return {
      dateForm: {
        domains: [{
          name : '',
          position : '',
          money : ''
        }],
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
/*    submitForm(formName) {
      var obj = formName.domains;
      var newArr = new Array;
      for(var i=0;i<obj.length; i++){
        newArr[i]=tool.getToObject(obj[i])
      }
      console.log(newArr)
    },*/
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.dateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dateForm.domains.push({
        name: '',
        collage : '',
        money : ''
      });
    }
  }
}
</script>

<style scoped lang="less">

</style>
