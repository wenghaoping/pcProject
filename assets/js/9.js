webpackJsonp([9],{745:function(t,i,n){n(911);var e=n(170)(n(837),n(982),"data-v-26578793",null);t.exports=e.exports},829:function(t,i,n){t.exports=n.p+"assets/img/maifangFA.png"},837:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=n(829),a=n.n(e),A=n(963),d=n.n(A),o=n(958),r=n.n(o),p=n(960),C=n.n(p);i.default={data:function(){return{active:"none",identitys:[{url:a.a,group_title:"买方FA",group_id:""},{url:a.a,group_title:"卖方FA",group_id:""},{url:d.a,group_title:"投资方",group_id:""},{url:r.a,group_title:"创业者",group_id:""},{url:C.a,group_title:"其他",group_id:""}]}},methods:{toggle:function(t){this.active=t},next:function(){var t=this;"number"==typeof this.active?this.$http.post(this.URL.setUserGroup,{user_id:localStorage.user_id,group_id:this.identitys[this.active].group_id}).then(function(i){2e6===i.data.status_code?(console.log(i.data),localStorage.group_id=t.identitys[t.active].group_id,localStorage.authenticate_id=i.data.authenticate_id,t.$router.push("/identityDetail")):t.$tool.error(i.data.error_msg)}):this.$tool.error("请选择身份")},getIdentity:function(){var t=this;this.$http.post(this.URL.getGroupIdentify,{}).then(function(i){t.identitys.forEach(function(t,n){t.group_id=i.data.data[n].group_id})})}},created:function(){var t=this;this.getIdentity(),this.$http.post(this.URL.getUserGroupByStatus,{user_id:localStorage.user_id}).then(function(i){2e6===i.data.status_code?1!==i.data.status&&2!==i.data.status||t.$router.push({name:"index"}):t.$tool.error("核对身份接口调用失败")})}}},877:function(t,i,n){i=t.exports=n(740)(!0),i.push([t.i,"#identityChoose .border[data-v-26578793]{border:1px solid #40587a;box-shadow:0 4px 4px 0 rgba(64,88,122,.1)}#identityChoose .title[data-v-26578793]{font-size:22px;color:#1f2d3d;margin-top:237px;margin-bottom:61px}#identityChoose .identityFrame[data-v-26578793]{width:1300px;margin:0 auto}#identityChoose .identityFrame .identity[data-v-26578793]{padding:58px 75px;margin-right:32px;background:#fff}#identityChoose .identityFrame .identity img[data-v-26578793]{margin-left:7px;width:64px;height:104px}#identityChoose .identityFrame .identity .text[data-v-26578793]{width:78px;margin-top:16px;font-size:24px;color:#1f2d3d}#identityChoose .next[data-v-26578793]{margin-top:113px;padding:10px 22px;background:#40587a;border-radius:4px;margin-bottom:144px;color:#fff}#identityDetail[data-v-26578793]{width:1200px;background:#fff;margin:0 auto;padding:30px 160px;position:relative}#identityDetail input[data-v-26578793]{border-radius:2px!important}#identityDetail .title[data-v-26578793]{font-size:22px;padding:0 64px;background:#f9fafc;padding-top:40px}#identityDetail .title .skip[data-v-26578793]{font-size:22px}#identityDetail .item-block[data-v-26578793]{width:100%;background:#f9fafc;padding:32px 64px;margin-top:16px}#identityDetail .block-tt-line span[data-v-26578793]{display:inline-block;vertical-align:middle}#identityDetail .item-block .b-title[data-v-26578793]{text-align:center;height:40px;line-height:40px;width:120px;font-size:16px;color:#1f2d3d;background:#e5e9f2;border-radius:100px}#identityDetail .item-block .b-line[data-v-26578793]{height:1px;margin-left:2px;margin-right:2px;background:#e0e6ed;width:584px}#identityDetail .item-block .b-hander[data-v-26578793]{font-size:16px;color:#009eff;cursor:pointer}#identityDetail .el-form .item[data-v-26578793]{width:360px;padding-top:32px}#identityDetail .el-form .mr32[data-v-26578793]{margin-right:32px}#identityDetail .el-form .desc[data-v-26578793]{width:753px;resize:none}#identityDetail .el-form .width360[data-v-26578793]{width:360px}#identityDetail .next[data-v-26578793]{background:#40587a;border-radius:2px;width:88px;height:36px;color:#fff;margin-top:33px}#identityDetail .mr120[data-v-26578793]{margin-right:120px}","",{version:3,sources:["E:/RQJ/Git/pcProject/src/views/identity/identityChoose.vue"],names:[],mappings:"AACA,yCACE,yBAA0B,AAC1B,yCAA+C,CAChD,AACD,wCACE,eAAgB,AAChB,cAAe,AACf,iBAAkB,AAClB,kBAAoB,CACrB,AACD,gDACE,aAAc,AACd,aAAe,CAChB,AACD,0DACE,kBAAmB,AACnB,kBAAmB,AACnB,eAAkB,CACnB,AACD,8DACE,gBAAiB,AACjB,WAAY,AACZ,YAAc,CACf,AACD,gEACE,WAAY,AACZ,gBAAiB,AACjB,eAAgB,AAChB,aAAe,CAChB,AACD,uCACE,iBAAkB,AAClB,kBAAmB,AACnB,mBAAoB,AACpB,kBAAmB,AACnB,oBAAqB,AACrB,UAAa,CACd,AACD,iCACE,aAAc,AACd,gBAAkB,AAClB,cAAe,AACf,mBAAoB,AACpB,iBAAmB,CACpB,AACD,uCACE,2BAA8B,CAC/B,AACD,wCACE,eAAgB,AAChB,eAAgB,AAChB,mBAAoB,AACpB,gBAAkB,CACnB,AACD,8CACE,cAAgB,CACjB,AACD,6CACE,WAAY,AACZ,mBAAoB,AACpB,kBAAmB,AACnB,eAAiB,CAClB,AACD,qDACE,qBAAsB,AACtB,qBAAuB,CACxB,AACD,sDACE,kBAAmB,AACnB,YAAa,AACb,iBAAkB,AAClB,YAAa,AACb,eAAgB,AAChB,cAAe,AACf,mBAAoB,AACpB,mBAAqB,CACtB,AACD,qDACE,WAAY,AACZ,gBAAiB,AACjB,iBAAkB,AAClB,mBAAoB,AACpB,WAAa,CACd,AACD,uDACE,eAAgB,AAChB,cAAe,AACf,cAAgB,CACjB,AAOD,gDACE,YAAa,AACb,gBAAkB,CACnB,AACD,gDACE,iBAAmB,CACpB,AACD,gDACE,YAAa,AACb,WAAa,CACd,AACD,oDACE,WAAa,CACd,AACD,uCACE,mBAAoB,AACpB,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,WAAa,AACb,eAAiB,CAClB,AACD,wCACE,kBAAoB,CACrB",file:"identityChoose.vue",sourcesContent:["\n#identityChoose .border[data-v-26578793] {\n  border: 1px solid #40587a;\n  box-shadow: 0 4px 4px 0 rgba(64, 88, 122, 0.1);\n}\n#identityChoose .title[data-v-26578793] {\n  font-size: 22px;\n  color: #1f2d3d;\n  margin-top: 237px;\n  margin-bottom: 61px;\n}\n#identityChoose .identityFrame[data-v-26578793] {\n  width: 1300px;\n  margin: 0 auto;\n}\n#identityChoose .identityFrame .identity[data-v-26578793] {\n  padding: 58px 75px;\n  margin-right: 32px;\n  background: white;\n}\n#identityChoose .identityFrame .identity img[data-v-26578793] {\n  margin-left: 7px;\n  width: 64px;\n  height: 104px;\n}\n#identityChoose .identityFrame .identity .text[data-v-26578793] {\n  width: 78px;\n  margin-top: 16px;\n  font-size: 24px;\n  color: #1f2d3d;\n}\n#identityChoose .next[data-v-26578793] {\n  margin-top: 113px;\n  padding: 10px 22px;\n  background: #40587a;\n  border-radius: 4px;\n  margin-bottom: 144px;\n  color: white;\n}\n#identityDetail[data-v-26578793] {\n  width: 1200px;\n  background: white;\n  margin: 0 auto;\n  padding: 30px 160px;\n  position: relative;\n}\n#identityDetail input[data-v-26578793] {\n  border-radius: 2px !important;\n}\n#identityDetail .title[data-v-26578793] {\n  font-size: 22px;\n  padding: 0 64px;\n  background: #f9fafc;\n  padding-top: 40px;\n}\n#identityDetail .title .skip[data-v-26578793] {\n  font-size: 22px;\n}\n#identityDetail .item-block[data-v-26578793] {\n  width: 100%;\n  background: #f9fafc;\n  padding: 32px 64px;\n  margin-top: 16px;\n}\n#identityDetail .block-tt-line span[data-v-26578793] {\n  display: inline-block;\n  vertical-align: middle;\n}\n#identityDetail .item-block .b-title[data-v-26578793] {\n  text-align: center;\n  height: 40px;\n  line-height: 40px;\n  width: 120px;\n  font-size: 16px;\n  color: #1f2d3d;\n  background: #e5e9f2;\n  border-radius: 100px;\n}\n#identityDetail .item-block .b-line[data-v-26578793] {\n  height: 1px;\n  margin-left: 2px;\n  margin-right: 2px;\n  background: #e0e6ed;\n  width: 584px;\n}\n#identityDetail .item-block .b-hander[data-v-26578793] {\n  font-size: 16px;\n  color: #009eff;\n  cursor: pointer;\n}\n#identityDetail .el-form[data-v-26578793] {\n  /*.el-form-item{\n      width: 360px;\n      padding-top: 32px;\n    }*/\n}\n#identityDetail .el-form .item[data-v-26578793] {\n  width: 360px;\n  padding-top: 32px;\n}\n#identityDetail .el-form .mr32[data-v-26578793] {\n  margin-right: 32px;\n}\n#identityDetail .el-form .desc[data-v-26578793] {\n  width: 753px;\n  resize: none;\n}\n#identityDetail .el-form .width360[data-v-26578793] {\n  width: 360px;\n}\n#identityDetail .next[data-v-26578793] {\n  background: #40587a;\n  border-radius: 2px;\n  width: 88px;\n  height: 36px;\n  color: white;\n  margin-top: 33px;\n}\n#identityDetail .mr120[data-v-26578793] {\n  margin-right: 120px;\n}\n"],sourceRoot:""}])},911:function(t,i,n){var e=n(877);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n(741)("ae235ea8",e,!0)},958:function(t,i,n){t.exports=n.p+"assets/img/chuangyezhe.png"},960:function(t,i,n){t.exports=n.p+"assets/img/qita.png"},963:function(t,i,n){t.exports=n.p+"assets/img/touzifang.png"},982:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{attrs:{id:"identityChoose"}},[n("div",{staticClass:"title tc"},[t._v("请问您是?")]),t._v(" "),n("div",{staticClass:"identityFrame flex"},t._l(t.identitys,function(i,e){return n("div",{staticClass:"identity",class:{border:t.active===e},on:{click:function(i){t.toggle(e)}}},[n("img",{attrs:{src:i.url}}),t._v(" "),n("div",{staticClass:"text tc"},[t._v(t._s(i.group_title))])])})),t._v(" "),n("div",{staticClass:"tc"},[n("button",{staticClass:"next",on:{click:t.next}},[t._v("下一步")])])])},staticRenderFns:[]}}});
//# sourceMappingURL=9.js.map