<template>
  <div>
    <el-tabs v-model="conmanyName" @tab-click="handleClick">
      <el-tab-pane label="公司信息" name="1">
        <div class="block" style="margin-bottom: 22px;">
          <span class="tag-bottom" style="margin-right: 11px;"><img src="../../../assets/images/tag2.png"></span>
          <span class="tag-bottom">融资</span>
          <span class="tag-bottom">创业</span>
          <span class="tag-bottom">大数据</span>
          <span class="tag-bottom">人工智能</span>
        </div>
        <div class="block" >
          <el-row :span="24">
            <el-col :span="4"><div class="content left">公司名称</div></el-col>
            <el-col :span="8"><div class="content right">{{company.company_name}}</div></el-col>
            <el-col :span="4"><div class="content left">成立日期</div></el-col>
            <el-col :span="8"><div class="content right">{{company.company_register_date}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="content left">所属行业</div></el-col>
            <el-col :span="8"><div class="content right"></div></el-col>
            <el-col :span="4"><div class="content left">公司规模</div></el-col>
            <el-col :span="8"><div class="content right">{{company.team_now_size}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="content left">邮箱地址</div></el-col>
            <el-col :span="8"><div class="content right">{{company.company_email}}</div></el-col>
            <el-col :span="4"><div class="content left">联系电话</div></el-col>
            <el-col :span="8"><div class="content right">{{company.company_contact}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="content left">公司地址</div></el-col>
            <el-col :span="20"><div class="content" style="padding-left: 12px;margin-right: -12px;">{{company.company_address}}</div></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="productMessage" name="2">
        <div class="block">
          <div class="inner fl" v-for="project in company.company_project">
            <div class="img fl"><img src="../../../assets/images/message.png"/></div>
            <p class="type fl" style="margin-bottom: 7px;">{{project.company_project_name}}<span>{{project.company_project_type}}</span></p>
            <p class="sec">{{project.company_project_introduce}}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="recruitMessage" name="3">
        <div class="bloack">
          <el-table
            :data="recruitData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="position"
              label="职位"
              width="150">
            </el-table-column>
            <el-table-column
              prop="money"
              label="月薪"
              width="150">
            </el-table-column>
            <el-table-column
              prop="experience"
              label="工作经验"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地区"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="发布时间">
            </el-table-column>
          </el-table>
          <el-button type="text" style="display: block;margin: 0 auto;color:#5e6d82;margin-top:16px;margin-bottom: 24px;" @click="loadMore">查看全部<i class="el-icon-arrow-right"></i></el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["comp"],
  data () {
    return {
      conmanyName: '1',
      productMessage:'产品信息(3)',
      recruitMessage:'招聘信息(29)',
      recruitData: [{
        position: 'JAVA',
        money: '20-30K',
        experience: '1-2年',
        address:"北京",
        date:'2016-05-04'
      }, {
        position: 'IOS',
        money: '1-2K',
        experience: '1年',
        address:"北京",
        date:'2016-05-04'
      }],
      /*公司信息*/
      company: {
        com_id: 4,
        company_name: "杭州投着乐网络科技有限公司",//公司名称
        company_type: "dd",//企业类型
        company_registered_capital: "ff",//注册资本
        company_Operating_state: "ss",//经营状态
        company_business_number: "123",//工商注册号
        company_legal_representative: "jdjjf",//法定代表人
        company_address: "浙江省杭州市西湖区文三路90号东部软件园一楼之韵社",//公司地址
        company_empirical_range: "科技推广和应用服务业",//经营范围
        company_register_date: "2014-03-23",//成立日期
        company_organization_code: "111",//统一社会信用代码
        company_contact: "0571-86427664",//联系方式
        company_email: "HR@weitianshi.cn",//邮箱地址
        company_unified_code: "111",//统一社会信用代码
        company_register_office: "111",//登记机关
        team_now_size: "500-2000人",//团队规模
        company_business_term: "111",//营业期限
        company_project:[
          {
            project_id: 1,
            company_project_name: "滴滴出行",
            company_project_introduce: "近3亿用户的选择】，2012年诞生的滴滴现已成为广受用户近3亿用户的选择】，2012年诞生的滴...",
            company_project_type: "IOS",
            com_id: 4
          }
        ]
      },


    }
  },
  methods: {
    handleClick(tab, event) {
//      console.log(tab, event);
    },
    loadMore(){
      this.recruitData.push({
        position: 'IOS',
        money: '1-2K',
        experience: '1年',
        address:"北京",
        date:'2016-05-04'
      },{
        position: 'IOS',
        money: '1-2K',
        experience: '1年',
        address:"北京",
        date:'2016-05-04'
      },{
        position: 'IOS',
        money: '1-2K',
        experience: '1年',
        address:"北京",
        date:'2016-05-04'
      })
    },
    getWebCrawler(){
      this.$http.post(this.URL.getWebCrawler, {
        user_id: sessionStorage.user_id,
        company_name: this.comp
      })
        .then(res => {
          this.company=res.data.data;
        })
        .catch(err => {
          alert("删除失败");
          console.log(err);
        })
    },//获取公司信息
  },
  created(){
//    this.getWebCrawler();
//    this.$watch('comp', function(newVal, oldVal){
//      console.log('newVal');//这里再感受下值拿到了没
//      console.log(newVal);//这里再感受下值拿到了没
//    });
  }

}
</script>

<style scoped lang="less">

</style>
