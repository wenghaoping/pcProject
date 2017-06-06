<template>
  <div id="research">
    <!--===========================================一键尽调弹窗=============================================-->
    <el-dialog :visible="dialogVisible" custom-class="dialog" :before-close="handleClose" close-on-press-escape close-on-click-modal >
      <div class="contain-grid">
        <div class="contain-position">
          <p>您要尽调的公司：<span>杭州投着乐网络科技有限公司</span><el-button type="primary" class="fr button">主要按钮</el-button></p>
        </div>
        <div class="contain-inner">
          <div class="item-lists">
            <div class="item2">
              <div class="title">项目信息</div>
              <div class="portrait fl"><img src="../../../assets/images/researchheader.png"></div>
              <div class="portrait-right fl ">
                <div class="block">
                  <span class="block-title fl">微天使乐投平台</span>
                  <span class="line fl"> | </span>
                  <span class="block-company fl">杭州投着乐网络科技有限公司</span>
                  <span class="block-tag fl"><el-tag type="primary">以上线</el-tag><el-tag type="success">初创</el-tag></span>
                </div>
                <div class="block">
                  <span class="doc fl">这里是这个项目的一句话介绍，字数在40字以内，要全部显示这里是这个项目的一句话介。</span>
                </div>
                <div class="block">
                  <span class="mid-tag">教育培训</span>
                  <span class="mid-tag">社交通讯</span>
                  <span class="mid-tag">大数据</span>
                  <span class="mid-tag">sass</span>
                  <span class="big-tag" style="margin-left: 200px;">100-300万</span><span class="split">｜</span>
                  <span class="big-tag">杭州</span><span class="split">｜</span>
                  <span class="big-tag">天使轮</span>
                </div>
              </div>
              <div class="tag clearfix">
                <span class="tag-bottom" style="margin-right: 11px;"><img src="../../../assets/images/tag2.png"></span>
                <span class="tag-bottom">融资</span>
                <span class="tag-bottom">创业</span>
                <span class="tag-bottom">大数据</span>
                <span class="tag-bottom">人工智能</span>
                <span class="url"><img src="../../../assets/images/tag3.png">www.weitianshi.cn</span>
              </div>
              <div class="linewidth"></div>
              <div class="file">
                这里是项目的详情，重点解决的是行中问题，同时兼顾行前和行后。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。
              </div>
              <div class="picture">
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item v-for="item in 3" :key="item">
                    <img src="../../../assets/images/blockimg.png">
                  </el-carousel-item>
                </el-carousel>
              </div>

            </div>

            <div class="item">
              <company-message></company-message>
            </div>
            <div class="item">
              <business style="position: relative"></business>
            </div>

          </div>
        </div>
      </div>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTo">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleTo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import companyMessage from './companyMessage.vue'
import business from './business.vue'
export default {
  props: ["dialogVisible"],
  data () {
    return {
      conmanyName: '3',
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
      }]

    }
  },
  methods: {
    dialogVisibleTo() {
      this.$emit('changeall',false)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.dialogVisibleTo()
        })
        .catch(_ => {});
    },
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
    }
  },
  computed: {

  },
  components: {
    companyMessage,
    business
  },
}
</script>

<style lang="less">
  @import '../../../assets/css/onekeyresearch';
  .el-carousel__item img {
    width: 100%;
  }
  #research{


    .el-tabs__item{
      font-size:18px;
      color:#8492a6;
      line-height:20px;
    }
    .el-tabs__item.is-active{
      color:#1f2d3d;
    }
    .el-tabs__header{
      border:none;
    }
    .el-tabs__active-bar{
      background-color:#ffffff;
    }
  }
</style>
