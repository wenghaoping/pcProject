webpackJsonp([8],{715:function(e,r,t){t(858);var o=t(155)(t(774),t(925),null,null);e.exports=o.exports},743:function(e,r,t){e.exports={default:t(744),__esModule:!0}},744:function(e,r,t){t(746),e.exports=t(61).Number.isInteger},745:function(e,r,t){var o=t(73),n=Math.floor;e.exports=function(e){return!o(e)&&isFinite(e)&&n(e)===e}},746:function(e,r,t){var o=t(156);o(o.S,"Number",{isInteger:t(745)})},774:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=t(743),n=t.n(o);r.default={data:function(){return{ruleForm2:{age:""},age:[{validator:function(e,r,t){if(console.log(r,1),console.log(e,2),!r)return t(new Error("年龄不能为空"));setTimeout(function(){n()(r)?r<18?t(new Error("必须年满18岁")):t():t(new Error("请输入数字值"))},100)},trigger:"blur"}]}},methods:{submitForm:function(e){this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")})},resetForm:function(e){this.$refs[e].resetFields()}}}},823:function(e,r,t){r=e.exports=t(712)(!0),r.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"checkone.vue",sourceRoot:""}])},858:function(e,r,t){var o=t(823);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);t(713)("1cb6fb2c",o,!0)},925:function(e,r){e.exports={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{attrs:{id:"check"}},[t("el-form",{ref:"ruleForm2",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm2,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"年龄",prop:"age",rules:e.age}},[t("el-input",{model:{value:e.ruleForm2.age,callback:function(r){e.ruleForm2.age=e._n(r)},expression:"ruleForm2.age"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){e.submitForm("ruleForm2")}}},[e._v("提交")]),e._v(" "),t("el-button",{on:{click:function(r){e.resetForm("ruleForm2")}}},[e._v("重置")])],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=8.js.map