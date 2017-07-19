<template>
  <div>
    <!--    <div class="mark">
          <img src="../../../assets/images/mark.png">
        </div>-->
    <el-tabs v-model="bussinessName">

      <el-tab-pane label="工商信息" name="1" style="margin-top: -30px;">
        <div class="block"  style="display: block">
          <div class="rz-details" style="width: 795px;">
            <div class="rz-detail">
              <p class="det-title">法定代表人</p>
              <p class="det-info">{{business.company.company_legal_representative}}</p>
            </div>
            <div class="rz-detail">
              <p class="det-title">注册资本</p>
              <p class="det-info">{{business.company.company_registered_capital}}</p>
            </div>
            <div class="rz-detail">
              <p class="det-title">经营状态</p>
              <p class="det-info">{{business.company.company_operating_state}}</p>
            </div>
          </div>
        </div>
        <div class="block"  style="display: block">
          <el-row :span="24">
            <el-col :span="4"><div class="content left">企业类型</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_type}}</div></el-col>
            <el-col :span="4"><div class="content left">统一社会信用代码</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_unified_code}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="content left">工商注册号</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_business_number}}</div></el-col>
            <el-col :span="4"><div class="content left">组织机构代码</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_organization_code}}</div></el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4"><div class="content left">营业期限</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_business_term}}</div></el-col>
            <el-col :span="4"><div class="content left">登记机关</div></el-col>
            <el-col :span="8"><div class="content right">{{business.company.company_register_office}}</div></el-col>
            <!--            <el-col :span="4"><div class="content left">发照日期</div></el-col>
                        <el-col :span="8"><div class="content right"></div></el-col>-->
          </el-row>
          <!--          <el-row :span="24">

                      &lt;!&ndash;<el-col :span="4"><div class="content left">登记状态</div></el-col>&ndash;&gt;
                      &lt;!&ndash;<el-col :span="8"><div class="content right"></div></el-col>&ndash;&gt;
                    </el-row>-->
          <el-row :span="24">
            <el-col :span="4"><div class="left hei">经营范围</div></el-col>
            <el-col :span="20"><div class="hei2" style="padding: 14px 12px 12px 15px;border:1px solid #e0e6ed;margin-right: -8px;background: #ffffff">{{business.company.company_empirical_range}}</div></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工商变更" name="2">
        <div class="bloack change" style="display: block">
          <el-table
            :data="business.company_change"

            border
            style="width: 100%">
            <el-table-column
              prop="company_change_time"
              label="时间"
              width="150">
            </el-table-column>
            <el-table-column
              prop="company_change_matter"
              label="事项"
              width="150">
            </el-table-column>
            <el-table-column
              prop="company_change_before"
              label="变更前"
            >
            </el-table-column>
            <el-table-column
              prop="company_change_after"
              label="变更后"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!--商标信息-->
      <el-tab-pane :label="trademarkMessage" name="3">
        <div class="block" style="display: block">
          <el-table
            :data="business.brand"

            border
            style="width: 100%">
            <el-table-column
              prop="company_brand_time"
              label="时间"
              width="150">
            </el-table-column>
            <el-table-column
              prop="company_brand_name"
              label="商标名称"
              width="260">
            </el-table-column>
            <el-table-column
              prop="company_brand_status"
              label="状态"
            >
            </el-table-column>
            <el-table-column
              prop="company_brand_type"
              label="类型"
            >
            </el-table-column>
            <el-table-column
              prop="company_brand_registration_number"
              label="注册号">
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
      <!--专利信息-->
      <!--<el-tab-pane :label="patentMessage" name="4">
        <div class="block patent">
          <el-table
            :data="patentData"
            stripe
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="专利名称"
              width="280">
            </el-table-column>
            <el-table-column
              prop="publishNubmer"
              label="申请公布号"
              min-width="110"
              >
            </el-table-column>
            <el-table-column
              prop="publishdate"
              label="申请公布日"
              min-width="100"
            >
            </el-table-column>
            <el-table-column
              prop="applyNumber"
              label="申请号"
              min-width="120"
            >
            </el-table-column>
            <el-table-column
              prop="classify"
              label="分类号"
              min-width="145"
              >
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ["comid"],
    data () {
      return {
        bussinessName: '1',
        trademarkMessage:'商标信息',
        patentMessage:'专利信息(12)',
        patentData:[{
          name:"用于培训驾驶技术的自动化实现方法、装置和系统",
          publishNubmer:"CN105741643A",
          publishdate:"2016-04-20",
          applyNumber:"201610248895X",
          classify:"G09B19/16(2006.01)I"

        }],
        business:{
          //工商信息
          company: {
            com_id: 4,
            company_name: "杭州投着乐网络科技有限公司",//公司名称
            company_type: "有限责任公司（自然人投资或控股）",//企业类型
            company_registered_capital: "1000万",//注册资本
            company_Operating_state: "开业",//经营状态
            company_business_number: "110108015068911",//工商注册号
            company_legal_representative: "程川",//法定代表人
            company_address: "浙江省杭州市西湖区文三路90号东部软件园一楼之韵社",//公司地址
            company_empirical_range: "我们重点解决的是行中问题，同时兼顾行前和行后。 1.行前：定制个性化的用户攻略 发现旅行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。 内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。",//经营范围
            company_register_date: "2014-03-23",//成立日期
            company_organization_code: "1112121212",//统一社会信用代码
            company_contact: "0571-86427664",//联系方式
            company_email: "HR@weitianshi.cn",//邮箱地址
            company_unified_code: "111",//统一社会信用代码
            company_register_office: "海淀分局",//登记机关
            team_now_size: "500-2000人",//团队规模
            company_business_term: "2012-07-10 至 2032-07-09",//营业期限
          },
          //商标信息
          brand: [{
            com_id: 4,
            company_brand_type: "20",
            company_brand_registration_number: "17680971A",
            company_brand_status: "已注册",
            company_brand_name: "杭州投着乐网络科技邮箱公司",
            company_brand_time: "2016-05-04"
          }],
          //工商变更
          company_change: [{
            com_id: 4,
            company_change_time: "",//2015-08-17
            company_change_matter: "",//认缴的出资额、认缴的出资方式、认缴的出资时间、实缴的出资额、实缴的出资方式、实缴的出资时间、投资人
            company_change_before: "",//技术开发、技术咨询、技术服务、技术推广；基础软件服务；应用软件服务。（未取得行政许可的项目除外）
            company_change_after: ""//技术开发、技术咨询、技术服务、
          }]
        }
      }
    },
    methods: {
      getCrawlerBrand(){
        this.$http.post(this.URL.getCrawlerBrand, {
          user_id: localStorage.user_id,
          com_id: this.comid
        })
          .then(res => {
            let data=res.data.data;
            this.business=data;
            console.log(this.business);
            this.trademarkMessage="商标信息"+"("+data.brand.length+")"
          })
          .catch(err => {
            this.$tool.console(err);
          })
      }//获取商标信息
    },
    created(){
      this.getCrawlerBrand();
    },
    watch : {
      comid : function(e){
        this.com_id=e;
        this.getCrawlerBrand();
        this.$tool.console(e);
      }//获取公司id
    }
  }
</script>

<style lang="less">
  .mark{
    position: absolute;
    left: 191px;
    top: -14px;
    width: 8px;
    height: 8px;
    z-index: 1000;
    img{
      width: 100%;
    }
  }
  .change{
    .cell{
      margin:16px 0 19px;
      vertical-align: super;
    }
    .is-leaf{
      .cell{
        margin:0px;
      }
    }
  }
  .patent{
    .cell{
      font-size:12px;
      color:#1f2d3d;
    }
  }


</style>
