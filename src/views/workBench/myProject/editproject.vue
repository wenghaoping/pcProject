<template>
  <div id="editproject" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div id="wid" class="contain-center edit-page">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box">
        <div class="left-wrap" ref="left" style="margin-top:24px;">
          <!--=================================项目文件=================================-->
          <div class="d_jump"></div>
          <div class="item-block" style="margin-top:0;">
            <div class="block-tt-line">
              <span class="b-title">项目文件</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('fileShow')" v-show="fileShow">收起</span>
              <span class="b-hander" @click="openDiv('fileShow')" v-show="!fileShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="fileShow">
                <div class="block-info block-cc-file">
                  <span class="f-title fl">商业计划书</span>
                  <span style="margin-left: 20px;" class="fl">
                    <el-upload class="planUpload"
                               action="api/v/project/projectUpload"
                               :on-preview="planPreview"
                               :on-change="planChange"
                               :on-success="planuploadsuccess"
                               :on-error="planuploaderror"
                               :on-remove="planRemove"
                               :before-upload="beforeUpload"
                               :file-list="planList"
                               accept=".doc, .ppt, .pdf, .zip, .rar, .docx, .pptx"
                               :data="uploadDate">
                      <el-button slot="trigger" type="primary" v-show="planButton"><i
                        class="el-icon-plus"></i>计划书上传</el-button>
                    </el-upload>
                  </span>

                </div>
                <div class="block-info block-cc-pro" style="margin-top:15px;">
                  <span class="f-title fl">项目文件</span>
                  <span style="margin-left: 34px;" class="fl">
                      <el-upload
                        class="upload"
                        ref="upload"
                        action="api/v/project/uploadFile"
                        :on-change="handleChange"
                        :on-success="uploadsuccess"
                        :on-error="uploaderror"
                        :before-upload="beforeUpload1"
                        :file-list="fileList"
                        :data="fileuploadDate"
                        :show-file-list="showList"
                        accept=".doc, .ppt, .pdf, .zip, .rar, .png, .docx, .jpg, .pptx, .jpeg"
                        multiple>
                        <el-button slot="trigger" type="primary"><i class="el-icon-plus"></i>批量上传</el-button>
                      </el-upload>
                  </span>
                  <span class="f-tips fl" style="margin-left: 8px;">（仅自己可见）</span>
                </div>
                <div class="block-info block-cc-other" style="margin-bottom: 15px;"
                     v-for="(list, index) in uploadShow2.lists"
                     :key="list.index">
                  <span class="f-title">{{list.bp_type}} : </span>
                  <span class="f-name" @click.prevent="download(list)"
                        style="cursor: pointer">{{list.file_title}}</span>
                  <span class="del-btn" @click.prevent="removeList(list)"><img src="../../../assets/images/delete.png"></span>
                  <span class="solt-btn" @click.prevent="toGroup(list)">分组设置</span>
                </div>
              </div>
            </el-collapse-transition>
          </div>
          <!--=================================项目介绍=================================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">项目介绍</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('ProjectShow')" v-show="ProjectShow">收起</span>
              <span class="b-hander" @click="openDiv('ProjectShow')" v-show="!ProjectShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="ProjectShow">
                <el-form :model="project" ref="project" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <span class="justIlook">(仅自己可见)</span>
                      <el-form-item
                        label="项目名称"
                        prop="name"
                        :rules="[{min: 1, max:30,message: '最大30个字符',trigger: 'blur'}]">
                        <el-input v-model="project.pro_name" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <span class="justIlook2">(仅自己可见)</span>
                      <el-form-item
                        label="公司名称"
                        prop="company">
                        <el-autocomplete v-model="project.pro_company_name"
                                         :fetch-suggestions="querySearchAsync"
                                         placeholder="请输入内容"
                                         @select="handleSelect"
                                         class="width360">
                        </el-autocomplete>
                      </el-form-item>
                    </el-col>
                    <span class="ques">
                        <el-tooltip placement="bottom-end">
                            <div slot="content">
                              <div class="tips-txt">1、一键同步公司信息，快速创建项目</div>
                              <div class="tips-txt" style="margin-top:5px;">2、可在项目详情查看尽调报告</div>
                            </div>
                            <img src="../../../assets/images/question.png" alt=""/>
                        </el-tooltip>
                      </span>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="项目介绍"
                        prop="pro_intro"
                        :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'},{min: 1, max:40,message: '最大40个字符'}]">
                        <el-input v-model="project.pro_intro" placeholder="一句话介绍，如帮助FA成交的项目管理工具"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" >
                      <el-form-item
                        label="所属省级"
                        prop="pro_area.pid"
                        :rules="[{required: true, message: '所属省级不能为空', trigger: 'change',type: 'number'}]" style="width: 170px;">
                        <el-select v-model="project.pro_area.pid" placeholder="请选择" @change="area1Change2">
                          <el-option
                            v-for="item in area"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" >
                      <el-form-item label="所属市级"
                                    prop="pro_area.area_id"
                                    :rules="[{required: true, message: '所属市级不能为空', trigger: 'change',type: 'number'}]" style="width: 160px;">
                        <el-select v-model="project.pro_area.area_id" placeholder="请选择">
                          <el-option
                            v-for="item in area2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="项目轮次"
                        prop="pro_stage.stage_id"
                        :rules="[{type:'number',required: true, message: '项目轮次不能为空', trigger: 'change'}]">
                        <el-select v-model="project.pro_stage.stage_id" placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in stage"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目领域"
                        prop="pro_industry"
                        :rules="[{type: 'array',required: true, message: '项目领域不能为空', trigger: 'change'}]">
                        <el-select
                          v-model="project.pro_industry"
                          multiple
                          :multiple-limit="multiplelimit"
                          placeholder="请添加(最多5个)" class="width360">
                          <el-option
                            v-for="item in industry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item
                        label="运营状态"
                        prop="pro_status">
                        <el-radio-group v-model="project.pro_status" @change="radiochange">
                          <el-radio v-for="companystate in company_status" class="radio"
                                    :label="companystate.label"
                                    :key="companystate.value"
                          >{{companystate.value}}
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="公司规模"
                        prop="pro_company_scale.comp_scale_id">
                        <el-select v-model="project.pro_company_scale.comp_scale_id" placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in company_scale"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="产品链接"
                        prop="pro_website">
                        <el-input v-model="project.pro_website" placeholder="请输入项目主页地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="6">
                      <el-form-item
                        label="项目联系人"
                        prop="contact.user_name">
                        <el-input v-model="project.contact.user_name" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="手机号">
                        <el-input v-model="project.contact.user_mobile" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目来源"
                        prop="pro_source">
                        <el-select v-model="project.pro_source"
                                   multiple
                                   placeholder="请选择项目来源"
                                   class="width360"
                                   filterable
                                   allow-create
                                   default-first-option
                                   @change="addChangesource"
                                   :multiple-limit="multiplelimit">
                          <el-option
                            v-for="item in tags_source"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>

                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="私密设置"
                        prop="open_status">
                        <el-select v-model="project.open_status" placeholder="请选择" class="width360">
                          <el-option label="私密项目（仅自己／团队成员可查看编辑）" value="0"></el-option>
                          <el-option label="公开项目（投放到交易易市场参与融资匹配，投资人可以申请查看bp，每日
限公开一次)" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目标签"
                        prop="tags_pro">
                        <el-select v-model="project.tags_pro" multiple placeholder="请选择" class="width360" :multiple-limit="multiplelimit" filterable
                                   allow-create default-first-option @change="addChangepro">
                          <el-option
                            v-for="item in tags_pro"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>

                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item label="项目亮点"
                                    prop="pro_goodness"
                                    :rules="[{min: 3, message: '最少2个字符',required: true, message: '项目亮点不能为空', trigger: 'blur'}]">
                        <el-input type="textarea"
                                  v-model="project.pro_goodness"
                                  :autosize="{ minRows: 4, maxRows: 7}"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>
          <!--=================================核心团队=================================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">核心团队</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('teamShow')" v-show="teamShow">收起</span>
              <span class="b-hander" @click="openDiv('teamShow')" v-show="!teamShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="teamShow">
                <el-form :model="team" ref="team" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="团队标签"
                        prop="tags_team">
                        <el-select
                          v-model="team.tags_team"
                          multiple
                          filterable
                          allow-create
                          placeholder="请添加（最多5个)" class="width360"
                          default-first-option
                          :multiple-limit="multiplelimit"
                          @change="addChangeTeam">
                          <el-option
                            v-for="item in tags_team"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="10">
                    <el-col :span="4">
                      <el-form-item
                        label="成员姓名"
                        :prop="'core_users.' + index + '.ct_member_name'"
                        v-for="(member, index) in team.core_users"
                        :key="member.index"
                        :rules="[{min: 2, message: '最少2个字符',required: true, message: '成员姓名不能为空', trigger: 'blur'}]">
                        <el-input v-model="member.ct_member_name" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="成员职位"
                        :prop="'core_users.' + index + '.ct_member_career'"
                        v-for="(member, index) in team.core_users"
                        :key="member.index">
                        <el-input v-model="member.ct_member_career" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="股权比例"
                        :prop="'core_users.' + index + '.stock_scale'"
                        v-for="(member, index) in team.core_users"
                        :key="member.index">
                        <el-input v-model.number="member.stock_scale" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item
                        label="成员介绍"
                        :prop="'core_users.' + index + '.ct_member_intro'"
                        v-for="(member, index) in team.core_users"
                        :key="member.index">
                        <el-input v-model.number="member.ct_member_intro" placeholder="请输入" class="width360"> </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <el-form-item label="　　" v-for="(member, index) in team.core_users" :key="member.index">
                        <span class="imgdele" @click.prevent="removeMember(member)" style="margin-left: 22px"><img
                          src="../../../assets/images/delete.png"></span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-button type="text" @click="addMember" class="addMember"><i class="el-icon-plus"></i> 新增成员
                </el-button>
              </div>
            </el-collapse-transition>
          </div>
          <!--=================================融资信息=================================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">融资信息</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('financingShow')" v-show="financingShow">收起</span>
              <span class="b-hander" @click="openDiv('financingShow')" v-show="!financingShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="financingShow">
                <el-form :model="financing" ref="financing" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="期望融资"
                        prop="pro_finance_scale"
                        :rules="[{type: 'number',required: true, message: '期望融资不能为空', trigger: 'change'}]">
                        <el-select v-model="financing.pro_finance_scale" placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in scale"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="资金用途"
                        prop="pro_finance_use">
                        <el-input v-model="financing.pro_finance_use" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="投后股份( % )"
                        prop="pro_finance_stock_after"
                        :rules="finance">
                        <el-input v-model="financing.pro_finance_stock_after" placeholder="请输入具体数值，如：10"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目估值( 万 )"
                        prop="pro_finance_value">
                        <el-input v-model="financing.pro_finance_value" placeholder="请输入具体数值，如：1000"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="4">
                      <el-form-item
                        label="历史融资时间"
                        :prop="'pro_history_finance.' + index + '.finance_time'"
                        v-for="(history, index) in financing.pro_history_finance"
                        :key="history.index"
                        :rules="[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]">
                        <el-date-picker
                          v-model="history.finance_time"
                          type="date"
                          placeholder="选择日期" style="width: 125px;">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="历史融资轮次"
                        :prop="'pro_history_finance.' + index + '.pro_finance_stage'"
                        v-for="(history, index) in financing.pro_history_finance"
                        :key="history.index"
                        :rules="[{type:'number',required: true, message: '融资轮次不能为空', trigger: 'change'}]">
                        <el-select v-model="history.pro_finance_stage" placeholder="请选择">
                          <el-option
                            v-for="item in stage"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="融资金额"
                        :prop="'pro_history_finance.' + index + '.pro_finance_scale'"
                        v-for="(history, index) in financing.pro_history_finance"
                        :key="history.index"
                        :rules="[{required: true, message: '融资金额不能为空', trigger: 'change'}]">
                        <el-input v-model="history.pro_finance_scale" placeholder="输入金额"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item
                        label="历史投资方"
                        :prop="'pro_history_finance.' + index + '.pro_finance_investor'"
                        v-for="(history, index) in financing.pro_history_finance"
                        :key="history.index"
                        :rules="[{required: true, message: '投资方不能为空', trigger: 'blur'}]" class="width360">
                        <el-input v-model="history.pro_finance_investor" placeholder="请添加"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <el-form-item label="　　" v-for="(history, index) in financing.pro_history_finance"
                                    :key="history.index" style="padding-left: 13px;">
                        <span class="imgdele" @click.prevent="removeHistory(history)"><img
                          src="../../../assets/images/delete.png"></span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-button type="text" @click="addHistory" class="addMember"><i class="el-icon-plus"></i> 添加历史融资
                </el-button>
              </div>
            </el-collapse-transition>
          </div>
          <!--=================================里程碑=================================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">里程碑</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('milepostShow')" v-show="milepostShow">收起</span>
              <span class="b-hander" @click="openDiv('milepostShow')" v-show="!milepostShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="milepostShow">
                <el-form :model="milepost" ref="milepost" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="时间"
                        :prop="'pro_develop.' + index + '.dh_start_time'"
                        v-for="(milePostSomeThing, index) in milepost.pro_develop"
                        :key="milePostSomeThing.index"
                        :rules="[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]">
                        <el-date-picker
                          v-model="milePostSomeThing.dh_start_time"
                          type="date"

                          style="width: 360px;"
                          placeholder="选择日期" class="width360">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item
                        label="事件"
                        :prop="'pro_develop.' + index + '.dh_event'"
                        v-for="(milePostSomeThing, index) in milepost.pro_develop"
                        :key="milePostSomeThing.index"
                        :rules="[{min: 3, message: '最少2个字符',required: true, message: '请输入事件', trigger: 'blur'}]" class="width360">
                        <el-input v-model="milePostSomeThing.dh_event" placeholder="请添加"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <el-form-item label="　　" v-for="(milePostSomeThing, index) in milepost.pro_develop"
                                    :key="milePostSomeThing.index" style="padding-left: 13px;">
                        <span class="imgdele" @click.prevent="removemilePost(milePostSomeThing)"><img
                          src="../../../assets/images/delete.png"></span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-button type="text" @click="addmilePost" class="addMember"><i class="el-icon-plus"></i> 添加里程碑
                </el-button>
              </div>
            </el-collapse-transition>

          </div>
          <!--=================================FA签约协议===============================-->
          <div class="d_jump"></div>
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">FA签约协议</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('SignShow')" v-show="SignShow">收起</span>
              <span class="b-hander" @click="openDiv('SignShow')" v-show="!SignShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="SignShow">
                <el-form :model="pro_FA" ref="pro_FA" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item
                        label="是否独家"
                        prop="is_exclusive">
                        <el-radio v-model="is_exclusive" :label=2 style="margin-right: 12px;">非独家FA签约</el-radio>
                        <el-radio v-model="is_exclusive" :label=1>独家FA签约</el-radio>
                        <el-radio v-model="is_exclusive" :label=0>其他</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="签约佣金（%）"
                        prop="commission"
                        :rules="[{message: '比例必须为数字值'}]">
                        <el-input v-model="pro_FA.commission" placeholder="请输入具体数值，如：10"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="股权赠与（%）"
                        prop="stock_right"
                        :rules="[{message: '估值必须为数字值'}]">
                        <el-input v-model="pro_FA.stock_right" placeholder="请输入具体数值，如：10"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="其他权益（%）"
                        prop="stock_other"
                        :rules="[{message: '比例必须为数字值'}]">
                        <el-input v-model="pro_FA.stock_other" placeholder="请输入具体数值，如：10"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="跟投权（%）"
                        prop="stock_follow"
                        :rules="[{message: '估值必须为数字值'}]">
                        <el-input v-model="pro_FA.stock_follow" placeholder="请输入具体数值，如：10"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>
          <el-button type="primary" size="large" style="margin-top:32px;float: right;display: block;" @click="allSave">保存
          </el-button>
          <div style="height: 50px;"></div>
        </div>
        <div class="right-wrap" ref="right">
          <div class="command-box">
            <div class="command-title">
              项目完整度：<span class="command-val">{{proportion}}%</span>
            </div>
            <div class="command-title-sec">
              完整度超过60%的项目更容易被投资人关注
            </div>
            <div class="command-progress">
              <div class="progress-bg"></div>
              <div class="progress-fg" :style="{ width: proportion+'%'}"></div>
            </div>
          </div>

          <div class="check-block" v-bind:class="{'checked':node0}" @click="setNode('0')" style="margin-top:12px;">
              <span class="block-icon">
                <img src="../../../assets/images/arts.png" alt="">
              </span>
            <span class="block-tlt">项目文件
                <span class="tlt-tips" v-show="fileMust">请添加商业计划书</span>
              </span>
            <span class="check-flag">
                <img v-if="filePerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
          </div>
          <div class="check-block" v-bind:class="{'checked':node1}" @click="setNode('1')">
              <span class="block-icon">
                <img src="../../../assets/images/arts.png" alt="">
              </span>
            <span class="block-tlt">项目介绍
                <span class="tlt-tips" v-show="projectMust">必填项不能为空</span>
              </span>
            <span class="check-flag">
                <img v-if="projectPerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
          </div>

          <div class="check-block" v-bind:class="{'checked':node2}" @click="setNode('2')">
              <span class="block-icon">
                <img src="../../../assets/images/group.png" alt="">
              </span>
            <span class="block-tlt">核心团队
                <span class="tlt-tips" v-show="teamMust">必填项不能为空</span>
              </span>
            <span class="check-flag">
                <img v-if="teamPerfect" src="../../../assets/images/gou.png" alt="">
              <span v-else class="flag-txt">待完善</span>
              </span>
          </div>

          <div class="check-block" v-bind:class="{'checked':node3}" @click="setNode('3')">
              <span class="block-icon">
                <img src="../../../assets/images/money.png" alt="">
              </span>
            <span class="block-tlt">融资信息
                <span class="tlt-tips" v-show="financingMust">必填项不能为空</span>
              </span>
            <span class="check-flag">
                 <img v-if="financingPerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
          </div>

          <div class="check-block" v-bind:class="{'checked':node4}" @click="setNode('4')">
              <span class="block-icon">
                <img src="../../../assets/images/time.png" alt="">
              </span>
            <span class="block-tlt">里程碑
                <span class="tlt-tips" v-show="milepostMust">必填项不能为空</span>
              </span>
            <span class="check-flag">
                 <img v-if="milepostPerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
          </div>

          <div class="check-block" v-bind:class="{'checked':node5}" @click="setNode('5')">
              <span class="block-icon">
                <img src="../../../assets/images/doc.png" alt="">
              </span>
            <span class="block-tlt">FA签约协议</span>
            <span class="check-flag">
                 <img v-if="signPerfect" src="../../../assets/images/gou.png" alt="">
                <span v-else class="flag-txt">待完善</span>
              </span>
          </div>
          <div class="bot-btn">
            <el-button type="primary" size="large" @click="allSave">保存项目</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--添加运营状态的弹窗-->
    <el-dialog title="添加运营状态" :visible.sync="dialogFormVisible" :show-close="showList">
      <el-form :model="form">
        <el-form-item label="运营状态" :label-width="formLabelWidth">
          <el-input v-model="form.state" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelGroupChange">取 消</el-button>
        <el-button type="primary" @click="addState">确 定</el-button>
      </div>
    </el-dialog>
    <!--文件分组的弹窗-->
    <el-dialog title="文件分组设置" :visible.sync="dialogFileVisible" :show-close="showList">
      <el-form :model="groups" ref="groups">
        <el-form-item label="分组名称" label-width="80px" prop="input"
                      :rules="[{min: 2, message: '最少2个字符',required: true, message: '分组不能为空', trigger: 'blur'}]">
          <el-row :span="24" :gutter="32">
            <el-col :span="18">
              <el-input v-model="groups.input" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('groups')">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div class="radio">
        <el-radio-group v-model="groups.type" @change="groupchange">
          <el-radio v-for="group in groups.group" class="radio"
                    :label="group.value"
                    :key="group.value"
          >{{group.label}}
          </el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFileVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveGroupChange">保　存</el-button>
      </div>
    </el-dialog>
    <!--搜索同步的弹窗-->
    <el-dialog
      :title="companyTitle"
      :visible.sync="dialogVisible"
      size="tiny"
      :show-close="close">
      <span>微天使为您找到相似公司，是否一键同步</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sync">一键同步</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        screenWidth: document.body.clientWidth,  // 屏幕大小变动
        num:0,//一次上传最多选5个
        project_id: "",//项目Id全局保存
        planList: [],//商业计划书上传列表
        fileList: [],//批量上传文件列表
        planButton: true,//控制上传按钮的显示
        uploadShow: {//计划书上传列表,需要存数据啦

        },
        uploadShow2: {//上传文件展示列表,就是老夫操作的列表
          lists: []
        },
        uploadDate: {user_id: localStorage.user_id},//商业计划书上传所带的额外的参数
        fileuploadDate: {user_id: localStorage.user_id},//项目文件上传带的参数
        groups: {
          input: "",
          group: [{type: "其他", label: '其他', value: '其他'}],
          type: "",
          name:""
        },//分组用的所有参数
        name: "",
        show: "detail",
        fileShow: true,
        ProjectShow: true,
        teamShow: true,
        financingShow: true,
        milepostShow: true,
        SignShow: true,
        multiplelimit: 5,
        tags:{
          changepro:[],//项目标签新增
          changeTeam:[],//团队标签
          changesource:[],//项目来源
        },
        project: {
          pro_name: 'HoopEASY商业计划PPT+for+pitch',//项目名称
          pro_company_name: '',//公司名称
          pro_intro: '',//项目介绍
          pro_area: {
            area_id: 2,
            area_title: "北京市",//市级
            pid: 1//省级
          },//所属地区1省级单位
          pro_stage: {
            "stage_id": 1,
            "stage_name": "",
            "sort": 2,
            "created_at": null,
            "updated_at": null
          },//轮次
          pro_industry: [],//领域标签
          pro_status: 2,
          pro_scale: {
            "scale_id": 1,
            "scale_money": "100W以下",
            "created_at": null,
            "updated_at": null
          },//规模多少钱
          pro_company_scale: {
            comp_scale_id: 1,
            comp_scale_value: "1-20"
          },//规模多少人
          pro_website: '',//产品链接
          contact: {
            user_name: "",
            user_mobile: ""
          },//项目联系人
          pro_source: [],//项目来源
          open_status: '1',//私密设置
          tags_pro: [],//项目标签
          //项目亮点
          pro_goodness: "专注于篮球项目的移动端社交平台"//项目介绍
        },

        team: {
          tags_team: [],//团队标签
          core_users: [
            {
              project_ct_id: 30,
              ct_index: "9bd0c8d7d615832340340aab0c0625b7",
              project_id: 37,
              project_index: "275fa4f135eecf08e5660d23e294e6cd",
              ct_member_name: "赵工佐",
              ct_member_career: "创始人兼首席执行官",
              ct_member_intro: "前高中和大学校队主力球员，"
            }],
        },//核心团队

        financing: {
          pro_finance_scale: 1,//期望融资
          pro_finance_use: '买东西',//资金用途
          pro_finance_stock_after: '10',//投后股份
          pro_finance_value: '10',//项目估值
          /*//历史融资信息*/
          pro_history_finance: [{
            project_id: 37,
            pro_finance_stage: 10,//轮次
            pro_finance_scale: "",//金额
            pro_finance_investor: "",//投资人
            created_at: "2017-06-20",
            updated_time: null
          }],
        },//融资信息
        milepost: {
          pro_develop: [
            {
              project_dh_id: 6,
              dh_index: "24c2886c937e9a3eea25c7d0ffe7f713",
              project_id: 37,
              project_index: "275fa4f135eecf08e5660d23e294e6cd",
              dh_start_time: "2017-06-20 17:39:25",//时间
              dh_end_time: "1443542400",
              dh_event: "组建团队和设立办公室",//事件
              created_at: null,
              updated_at: null
            }]
        },//里程碑

        pro_FA: {
          project_id: 37,
          commission: "",//签约佣金
          stock_right: "",//股权赠与
          stock_follow: "",//跟投权
          stock_other: "",//其他权益
          created_at: null,
          updeted_at: null,

        },//FA签约协议
        is_exclusive: 1,//0其他 1独家 2非独家
        companyList: [],//公司搜索的数据
        list: [],
        /*公司远程搜索*/
        states: ["阿里", "百度", "投着乐网络科技有限公司"],
        /*所属地区1省级选项*/
        area: [],
        /*所属地区2市级选项*/
        area2: [],
        /*项目轮次选项*/
        stage: [],
        /*项目领域默认选项*/
        industry: [],
        /*运营状态默认值*/
        company_status: [],
        /*公司规模*/
        company_scale: [],
        /*项目标签*/
        tags_pro: [],
        tags_source:[],//项目来源
        formLabelWidth: '120px',
        dialogFormVisible: false,
        dialogFileVisible: false,
        /*运营状态*/
        form: {
          state: ''
        },

        /*==================团队标签=====================*/
        tags_team: [],
        /*==================融资范围=====================*/
        scale: [],
        node0: true,
        node1: false,
        node2: false,
        node3: false,
        node4: false,
        node5: false,
        /*判断项目完整度*/
        filePerfect: false,
        projectPerfect: false,
        teamPerfect: false,
        financingPerfect: false,
        milepostPerfect: false,
        signPerfect: false,
        /*判断必填项是否填写*/
        fileMust: false,
        projectMust: false,
        teamMust: false,
        financingMust: false,
        milepostMust: false,
        dialogVisible: false,//是否同步弹窗
        close: false,
        restaurants: [],//数据存放
        loading: false,//加载
        add_pro: [],//添加个人标签暂存
        companyTitle: "微天使",
        queryData: {},
        timeout: null,
        showList: false,
        loadingcheck:false,
        statusLast:0,
        finance:[
          { validator: checkFinance, trigger: 'blur' }
        ],
        one:false//第一次进来的时候



      };
      var checkFinance = (rule, value, callback) => {
          this.$tool.console(value);
         if (!value) {
          return callback(new Error('不能为空'));
         }
         /*setTimeout(() => {
           if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
           } else {
             if (value < 18) {
              callback(new Error('必须年满18岁'));
             } else {
              callback();
             }
           }
         }, 1000);*/
       };
    },
    computed: {
      /*项目完整度判断*/
      proportion(){
        let number = 0;//所有的空值数
        let fileValue = this.planList;
        let projectValue = this.project;
        let teamValue = this.team;
        let financingValue = this.financing;
        let milepostValue = this.milepost;
        let signValue = this.pro_FA;
        let sum = Object.keys(projectValue).length +//所有数据的总长度
          Object.keys(teamValue).length +
          Object.keys(financingValue).length +
          Object.keys(milepostValue).length +
          Object.keys(signValue).length + 6;
        //判断所有为空的数值,包括数组内的第一组
        function forFor(value) {
          let inner = 0;//每一次调用的空值
          if (isArray(value)) {
            if (value.length === 0) {
              number++;
              inner++
            };
          } else {
            for (let key in value) {
              if (isArray(value[key])) {
                if (value[key].length === 0) {
                  number++;
                  inner++
                }
                /*else {
                  for (let key2 in value[key][0]) {
                    if (value[key][0][key2] == "") {
                      number++;
                      inner++;
                    }
                  }
                }*/
              } else if (value[key] == "") {
                number++;
                inner++
              }
            }
          }
          return inner
        }

        //是否为数组
        function isArray(o) {
          return Object.prototype.toString.call(o) == '[object Array]';
        }

        //判断是否为空对象
        function isOwnEmpty(obj) {
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              return false;//返回false，不为空对象
            }
          }
          return true;//返回true，为空对象
        };

        if (forFor(fileValue) == 0) this.filePerfect = true;
        else this.filePerfect = false;

        if (forFor(projectValue) == 0) this.projectPerfect = true;
        else this.signPerfect = false;

        if (forFor(teamValue) == 0) this.teamPerfect = true;
        else this.teamPerfect = false;

        if (forFor(financingValue) == 0) this.financingPerfect = true;
        else this.financingPerfect = false;

        if (forFor(milepostValue) == 0) this.milepostPerfect = true;
        else this.milepostPerfect = false;

        if (forFor(signValue) == 0) this.signPerfect = true;
        else this.signPerfect = false;


/*              this.$tool.console(parseInt(((sum-number)/sum)*100))
         this.$tool.console(parseInt(number/sum))*/

        return parseInt(((sum - number) / sum) * 100)
      },
    },
    mounted() {
        let leftWidth=document.getElementById("wid").offsetLeft+936;
      this.$refs.right.style.left = leftWidth +'px';
    },
    methods: {
      /*获取列表各种数据*/
      getCompanyStatus(data){
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.label = data[i].status_id;
          obj.value = data[i].status_name;
          arr.push(obj)
        }
        arr.push({label: '自定义添加', value: '自定义添加'})
        return arr
      },//获取运营状态
      getTags_pro(data){
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.label = data[i].tag_name;
          obj.value = data[i].tag_id;
          arr.push(obj)
        }
        return arr
      },//获取项目标签
      getCompany_scale(data){
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.label = data[i].comp_scale_value;
          obj.value = data[i].comp_scale_id;
          arr.push(obj)
        }
        return arr
      },//获取公司规模几人
      getFileType(data){
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.label = data[i].type_name;
          obj.value = data[i].type_id;
          arr.push(obj)
        }
        return arr;
      },//获取项目分组信息

      setFileType(){
        this.$http.post(this.URL.getFileType, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data.data;
            this.groups.group = this.getFileType(data);
          })
          .catch(err => {
            this.$tool.console(err)
          })
      },//设置文件分组标签
      getWxProjectCategory(){

        let data = this.$global.data.categoryData;
        this.area = this.$global.data.area;//设置城市1列表
        this.scale = this.$global.data.scale;//设置期望融资
        this.stage = this.$global.data.stage;//设置轮次信息
        this.industry = this.$global.data.industry;//设置轮次信息
        this.tags_pro = this.$global.data.tags_pro;//设置项目标签
        this.tags.changepro = this.$global.data.tags_pro;//设置项目标签2另外的
        this.tags_team = this.$global.data.tags_team;//设置团队标签
        this.tags.changeTeam = this.$global.data.tags_team;//设置团队标签
        this.tags_source = this.$global.data.pro_source;//设置项目来源
        this.tags.changesource = this.$global.data.pro_source;//设置项目来源
        this.company_status = this.$global.data.company_status;//设置运营状态
        this.company_scale = this.$global.data.company_scale;//设置公司规模几人


      },//获取所有下拉框的数据
      area1Change(data){
        this.$http.post(this.URL.getArea, {user_id: localStorage.user_id, pid: data})//pid省
          .then(res => {
            let data = res.data.data;
            this.area2 = this.$tool.getCity(data);
          })
          .catch(err => {
            this.$tool.console(err)
          })

      },//设置二级城市下拉列表
      area1Change2(data){
        let newData = data;
        let pid=localStorage.pid;
        this.$http.post(this.URL.getArea, {user_id: localStorage.user_id, pid: data})//pid省
          .then(res => {
            let data = res.data.data;
            this.area2 = this.$tool.getCity(data);
            if(parseInt(newData)===parseInt(pid)){
            }else{
              this.project.pro_area.area_id="";
            }

          })
          .catch(err => {
            this.$tool.console(err)
          })

      },//设置二级城市下拉列表2

      /*获取项目详情*/

      getTag(data, num){
        let tags = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].type == num) {
            tags.push(data[i].tag_id);
          }
        }
        return tags
      },//设置团队/项目标签
      getindustry(data){
        let tags = [];
        for (let i = 0; i < data.length; i++) {
          tags.push(data[i].industry_id);
        }
        return tags
      },//设置领域标签
      setDateTime(data){
        for (let i = 0; i < data.length; i++) {
          data[i].finance_time = new Date(data[i].finance_time*1000);
        }
      },//时间转化接受从时间戳转化为中国标准时间
      setDateTime2(data){
        for (let i = 0; i < data.length; i++) {
          data[i].dh_start_time = new Date(data[i].dh_start_time*1000);
        }
      },//时间转化接受从时间戳转化为中国标准时间
      setDateTime3(data){
        for (let i = 0; i < data.length; i++) {
          data[i].finance_time=Date.parse(data[i].finance_time);
        }
      },//时间转化中国标准时间发送转换回时间戳
      setDateTime4(data){
        for (let i = 0; i < data.length; i++) {
          data[i].dh_start_time1=Date.parse(data[i].dh_start_time);
        }
      },//时间转化中国标准时间发送转换回时间戳
      setDateTime5(data){
        for (let i = 0; i < data.length; i++) {
          data[i].history_financing_time = new Date(data[i].history_financing_time*1000);
        }
      },//时间转化接受从时间戳转化为中国标准时间(同步用)
      setDateTime6(data){
        for (let i = 0; i < data.length; i++) {
          data[i].milestone_time = new Date(data[i].milestone_time*1000);
        }
      },//时间转化接受从时间戳转化为中国标准时间(同步用)
      setUploadShow2(data){
        for (let i = 0; i < data.length; i++) {
          if(data[i].belongs_to_type==null) {
              data[i].belongs_to_type={type_name:"其他"};
          };
          this.addDomain(data[i].belongs_to_type.type_name, data[i].file_title+'.'+data[i].file_ext, data[i].file_id, data[i].belongs_to_type.type_id);
        }
      },//设置批量上传文件显示
      setMemberScale(data){
          for(let i=0; i<data.length; i++){
            if(data[i].stock_scale==0)  data[i].stock_scale="";
          }
      },//核心成员股权比例
      setFinance(data){
        for(let i=0; i<data.length; i++){
          if(data[i].pro_finance_scale==0)  data[i].pro_finance_scale="";
        }
      },//期望融资,融资金额
      getProjectDetail () {
        this.$http.post(this.URL.getProjectDetail, {user_id: localStorage.user_id, project_id: this.project_id})
          .then(res => {

            this.uploadShow2.lists=[];
            let data = res.data.data;
            this.area1Change(data.pro_area.pid);//设置市级
            this.setDateTime(data.pro_history_finance);//时间格式设置
            this.setDateTime2(data.pro_develop);//时间格式设置2

            this.planList = [{name: data.pro_BP.file_title+'.'+data.pro_BP.file_ext, url: data.pro_BP.bp_url}];
            this.uploadShow = {
              file_title: data.pro_BP.file_title,
              pro_intro: data.pro_BP.file_title,
              pro_name: data.pro_BP.file_title,
              project_id: this.project_id,
              file_id: data.pro_BP.file_id
            };//设置计划书上传列表

            if(data.pro_BP.length=="") {
                this.planList=[];
                this.uploadShow={};
            };

            this.setUploadShow2(data.pro_file);
            this.project.pro_name = data.pro_name;
            this.project.pro_company_name = data.pro_company_name;
            this.project.pro_intro = data.pro_intro;

            this.project.pro_area = data.pro_area;
            localStorage.pid=data.pro_area.pid;
            if (data.pro_area == "") {
              this.project.pro_area = {area_id: "", pid: "", area_title: ""}
            };


            this.project.pro_stage = data.pro_stage;

            if (data.pro_stage == "") {
              this.project.pro_stage = {stage_id: ""}
            };

            this.project.pro_industry = this.getindustry(data.pro_industry);//领域标签
            this.project.pro_status = data.pro_status.status_id;//运营状态
            this.statusLast = data.pro_status.status_id;//运营状态多余的
            this.project.pro_scale = data.pro_scale;
            this.project.pro_website = data.pro_website;
            this.project.contact = data.contact;
            this.project.pro_source = data.pro_source;
            this.project.open_status = data.open_status.toString();//运营状态
            this.project.tags_pro = this.getTag(data.tag, 0);//项目标签

            this.project.pro_goodness = data.pro_goodness;
            this.project.pro_source = this.getTag(data.tag, 2);//项目来源标签


            this.project.pro_company_scale = data.pro_company_scale;
            if (data.pro_company_scale == "") {
              this.project.pro_company_scale = {comp_scale_id: 1, comp_scale_value: "1-20"}
            };

            this.team.tags_team = this.getTag(data.tag, 1);//团队标签
            this.setMemberScale(data.core_users);
            this.team.core_users = data.core_users;

            this.financing.pro_finance_scale = data.pro_finance_scale;
            this.financing.pro_finance_use = data.pro_finance_use;
            if(data.pro_finance_stock_after==0) data.pro_finance_stock_after="";
            this.financing.pro_finance_stock_after = data.pro_finance_stock_after;
            if(data.pro_finance_value==0) data.pro_finance_value="";
            this.financing.pro_finance_value = data.pro_finance_value;

            this.setFinance(data.pro_history_finance);
            this.financing.pro_history_finance = data.pro_history_finance;

            if (data.pro_history_finance == "") this.financing.pro_history_finance = [];

            this.milepost.pro_develop = data.pro_develop;

            if (data.core_users == "") this.team.core_users = [];


            this.is_exclusive = data.is_exclusive;//FA运营状态

            if (data.pro_FA == "") data.pro_FA = {commission: "", stock_right: "", stock_follow: "", stock_other: ""};


            if(data.pro_FA.commission==0) data.pro_FA.commission="";
            if(data.pro_FA.stock_right==0) data.pro_FA.stock_right="";
            if(data.pro_FA.stock_follow==0) data.pro_FA.stock_follow="";
            if(data.pro_FA.stock_other==0) data.pro_FA.stock_other="";

            this.pro_FA = data.pro_FA;
            if (this.planList.length != 0) this.planButton = false;
            else this.planButton = true;
            this.loading = false;
            this.tags_pro=this.tags.changepro.slice(0);
            this.tags_team=this.tags.changeTeam.slice(0);
            this.tags_source=this.tags.changesource.slice(0);
          })
          .catch(err => {
            this.loading = false
            this.$tool.console(err, 2)
          })
      },//获取项目详情数据

      /*商业计划书*/
      planChange(file, fileList){
        this.planList = fileList
        if (file.status === "fail") this.planButton = true;
        else this.planButton = false;
      },
      planuploadsuccess(response, file, fileList){
        this.$tool.success("上传成功")
        let data = response.data
        this.addplan(data.bp_title, data.pro_intro, data.pro_name, data.project_id, data.file_id)
      },//上传成功后添加字段
      planuploaderror(err, file, fileList){
        this.$tool.error("上传失败,请联系管理员")
      },//上传失败
      planRemove(file, fileList) {
        const deleteAtUpload = this.URL.deleteAtUpload;
        if (fileList.length == 0) this.planButton = true;
        else this.planButton = true;
        this.$http.post(deleteAtUpload, {user_id: localStorage.user_id, project_id: this.uploadShow.project_id})
          .then(res => {
            if (res.status === 200) {
              this.loading = false;
//              this.success("删除成功")
            }
          })
          .catch(err => {
            this.$tool.console(err)
//            this.alert("删除失败,请联系管理员")
          })

      },//删除文件
      addplan(file_title, pro_intro, pro_name, project_id, file_id) {
        let object = {};
        object.file_title = file_title;
        object.pro_intro = pro_intro;
        object.pro_name = pro_name;
        object.project_id = project_id;
        object.file_id = file_id;
        this.uploadShow = object;
      },//添加上传文件时,保存返回的数据
      planPreview(file){
        const url=this.URL.weitianshi+this.URL.download+"?user_id="+localStorage.user_id+"&file_id="+this.uploadShow.file_id
        window.location.href=url;
      },//点击下载

      /*批量上传*/
      beforeUpload(file){
        this.fileuploadDate.project_id = this.project_id;
        this.uploadDate.project_id = this.project_id;
        let filetypes=[".doc",".docx",".ppt",".pptx",".pdf",".zip",".rar"];
        let name=file.name;
        let fileend=name.substring(name.lastIndexOf("."));
        let isnext = false;
        if(filetypes && filetypes.length>0){
          for(var i =0; i<filetypes.length;i++){
            if(filetypes[i]==fileend){
              isnext = true;
              break;
            }
          }
        }
        this.loading=false;
        if(!isnext){
          this.$tool.error("不支持的文件格式");
          return false;
        }
        if(parseInt(file.size) > parseInt(20971521)){
          this.$tool.error("暂不支持超过20M文件上传哦");
          return false;
        };
      },//上传前的验证
      beforeUpload1(file){
        this.num++;
        this.fileuploadDate.project_id = this.project_id;
        this.uploadDate.project_id = this.project_id;
        let filetypes=[".doc",".ppt",".pdf",".zip",".rar",".pptx",".png",".jpg",".docx",".jpeg"];
        let name=file.name;
        let fileend=name.substring(name.lastIndexOf("."));
        let isnext = false;
        if(filetypes && filetypes.length>0){
          for(var i =0; i<filetypes.length;i++){
            if(filetypes[i]==fileend){
              isnext = true;
              break;
            }
          }
        }
        this.loading=false;
        if(!isnext){
          this.$tool.error("不支持的文件格式");
          return false;
        }
        if(parseInt(file.size) > parseInt(20971521)){
          this.$tool.error("暂不支持超过20m文件上传哦");
          return false;
        };
        if(parseInt(this.num) > parseInt(5)){
          this.$tool.error("一次最多选择5个文件");
          this.num=0;
          return false;
        }
      },//项目文件上传验证
      //当添加文件时,添加入上传列表
      handleChange(file, fileList){
        this.loading=true;
        if(this.loadingcheck){
          this.loading=false;
          this.loadingcheck=false;
        }
      },
      uploadsuccess(response, file, fileList){
        let data = response.data
        this.$tool.success("上传成功")
        this.addDomain(data.type_name, data.file_title, data.file_id, data.type);
        this.loadingcheck=true;
      },
      uploaderror(err, file, fileList){
        this.$tool.error("上传失败,请联系管理员")
        this.loadingcheck=false;
        this.loading=false;
      },//上传失败
      download(item){
        let index = this.uploadShow2.lists.indexOf(item);
         if (index !== -1) {
         let file_id = this.uploadShow2.lists[index].file_id;
         const url=this.URL.weitianshi+this.URL.download+"?user_id="+localStorage.user_id+"&file_id="+file_id;
         window.location.href=url;
         }

      },//点击下载

      removeList(item) {
        var index = this.uploadShow2.lists.indexOf(item)
        if (index !== -1) {
          this.fileList.splice(index, 1)
          const deleteAtFile = this.URL.deleteAtFile;
          this.$http.post(deleteAtFile, {
            user_id: localStorage.user_id,
            project_id: item.project_id,
            file_id: item.file_id
          })
            .then(res => {
              if (res.status === 200) {
                this.loading = false;
                this.uploadShow2.lists.splice(index, 1)
                this.$tool.success("删除成功")
              }
            })
            .catch(err => {
              this.$tool.console(err)
              this.$tool.error("删除失败,请联系管理员")
            })
        }
      },//删除当前上传文件

      addDomain(type_name, file_title, file_id, type)  {
        let object = {};
        object.bp_type = type_name;
        object.file_title = file_title;
        object.file_id = file_id;
        object.type = type;//文件类型
        this.uploadShow2.lists.push(object);

      },//添加上传文件时,加入显示列表

      groupchange(label){
        let index = this.groups.index;
        let data = this.groups.group;
        for(let i=0 ;i<data.length; i++){
          if(data[i].value==label){
              this.groups.name=data[i].label;
              this.uploadShow2.lists[index].type=label;
          }
        }
      },//点击分组设置中的单选框

      addGroup(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.URL.createFileType, {
              user_id: localStorage.user_id,
              type_name: this.groups.input
            })
              .then(res => {
                  let data =res.data;
                  let newObj = {};
                  newObj.type = this.groups.input;
                  newObj.label = this.groups.input;
                  newObj.value = data.type_id;
                  this.groups.type = data.type_id;
                  this.groups.group.push(newObj);
                  this.groups.input = ''
              })
              .catch(err => {
                this.$tool.console(err)
              })
          } else {
            this.$tool.console('error submit!!');
            return false;
          }
        });
      },//添加分组设置的分组选项
      cancelGroupChange(){
        this.dialogFormVisible = false;
        this.project.pro_status = this.statusLast;
      },//取消后
      saveGroupChange(){//file_id type_id user_id
        let type = this.groups.bp_type;
        let index = this.groups.index;
        let type_name = this.groups.name
        this.$http.post(this.URL.setFileType, {
          user_id: localStorage.user_id,
          file_id: this.uploadShow2.lists[index].file_id,
          type: this.uploadShow2.lists[index].type
        })
          .then(res => {
            if (index !== -1) {
              this.uploadShow2.lists[index].bp_type = type_name;
              this.dialogFileVisible = false
            }
          })
          .catch(err => {
            this.$tool.console(err)
          })

      },//发送分组设置请求
      toGroup(item){
        this.groups.type=item.type;
        var index = this.uploadShow2.lists.indexOf(item)
        this.groups.index = index;
        this.dialogFileVisible = true;

      },//获取分组的位置

      openDiv(v){
        this[v] = true;
      },
      closeDiv(v){
        this[v] = false;
      },
      goBack(){//返回上一层
        this.$router.push({name: 'indexmyProject'})//路由传参
      },

      /*获取远程数据模拟*/
      loadData(arr){
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].company_name;
          obj.address = arr[i].com_id;
          newArr.push(obj)
        }
        return newArr;
      },
      /*自动搜索,接口写这里面*/
      querySearchAsync(queryString, cb) {
        this.$http.post(this.URL.selectCompany, {user_id: localStorage.user_id, company_name: queryString})
          .then(res => {
            this.restaurants=[];
            let data=res.data.data;
            this.restaurants=this.loadData(data);
             if(queryString=="") this.restaurants=[];
             let restaurants = this.restaurants;
/*             let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;*/
             clearTimeout(this.timeout);
             this.timeout = setTimeout(() => {
              cb(restaurants);
             }, 300);
          })
          .catch(err => {
//          this.alert("加载失败");
            this.$tool.console(this.restaurants);
          })
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.companyTitle = item.value;
        this.$http.post(this.URL.getOneCompany, {user_id: localStorage.user_id, com_id: item.address})
          .then(res => {
            let data = res.data.data;
            this.$tool.console(this.$tool.getToObject(data))
            this.queryData = data;
          })
          .catch(err => {
            this.$tool.error("获取失败");
            this.$tool.console(err);
          });
        this.dialogVisible = true;
      },//选择了搜索出来的数据后

      radiochange(label){
        if (label == "自定义添加") {
          this.dialogFormVisible = true;
        }
      },//*控制添加radio
      /*添加运营状态*/
      addState(){
        this.$http.post(this.URL.createStatusPro, {user_id: localStorage.user_id, status_name: this.form.state})
          .then(res => {
            let data = res.data;
            let newState = {};
            newState.label = data.status_id;
            newState.value = this.form.state;
            this.project.companystate = this.form.state;
            this.company_status.splice(length - 1, 0, newState);
            this.dialogFormVisible = false;
            this.project.pro_status=data.status_id;;
            this.form.state="";
          })
          .catch(err => {
            this.$tool.error("添加失败");
            this.$tool.console(err);
          })


      },
      addChangepro(e){
        let tagName = this.$tool.checkArr(e, this.tags_pro);

        if (tagName != undefined) {
          this.$http.post(this.URL.createCustomTag, {user_id: localStorage.user_id, type: 0, tag_name: tagName})
            .then(res => {
              let newState = {};
              newState.label = tagName;
              newState.value = res.data.tag_id;
              this.tags.changepro.push(newState);
            })
            .catch(err => {
              this.$tool.error("添加失败");
              this.$tool.console(err);
            })
        }
      },//添加项目标签
      addChangeTeam(e){
        let tagName = this.$tool.checkArr(e, this.tags_team);

        if (tagName != undefined) {
          this.$http.post(this.URL.createCustomTag, {user_id: localStorage.user_id, type: 1, tag_name: tagName})
            .then(res => {
              let newState = {};
              newState.label = tagName;
              newState.value = res.data.tag_id;
//              this.tags_team.push(newState);
              this.tags.changeTeam.push(newState);
              /*this.tags.changeTeam.push(res.data.tag_id);*/
            })
            .catch(err => {
              this.$tool.error("添加失败");
              this.$tool.console(err);
            })
        }
//        else{
//          this.tags.changeTeam=this.team.tags_team.slice(0);
//        }
      },//添加团队标签
      addChangesource(e){
        let tagName = this.$tool.checkArr(e, this.tags_source);

        if (tagName != undefined) {
          this.$http.post(this.URL.createCustomTag, {user_id: localStorage.user_id, type: 2, tag_name: tagName})
            .then(res => {
              let newState = {};
              newState.label = tagName;
              newState.value = res.data.tag_id;
//              this.tags_source.push(newState);
              this.tags.changesource.push(newState);
              /*this.tags.changesource.push(res.data.tag_id);*/
            })
            .catch(err => {
              this.$tool.error("添加失败");
              this.$tool.console(err);
            })
        }
        /*else{
          this.tags.changesource=this.project.pro_source.slice(0);
        }*/
      },//添加项目来源

      /*添加团队成员*/
      removeMember(item) {
        if(item.project_ct_id=="" || item.project_ct_id==null) {
          let index = this.team.core_users.indexOf(item);
          if (index !== -1) {
            this.team.core_users.splice(index, 1)
          }
        }else{
          this.$http.post(this.URL.deleteCoreTeam, {
             user_id: localStorage.user_id,
             project_id: this.project_id,
             project_ct_id: item.project_ct_id
           })
           .then(res => {
             this.$tool.success("删除成功");
             let index = this.team.core_users.indexOf(item);
             if (index !== -1) {
               this.team.core_users.splice(index, 1)
             }
           })
           .catch(err => {
             this.$tool.error("删除失败");
             this.$tool.console(err);
           })
        }
      },
      addMember() {
        this.team.core_users.push({
          ct_member_name: '',
          ct_member_career: '',
          stock_scale: '',
          ct_member_intro: '',
          project_ct_id: '',
        });
      },

      /*添加历史融资信息*/
      removeHistory(item) {
          if(item.history_id=="" || item.history_id==null){
            let index = this.financing.pro_history_finance.indexOf(item)
            if (index !== -1) {
              this.financing.pro_history_finance.splice(index, 1)
            }
          }else{
            this.$http.post(this.URL.deleteFinance, {
              user_id: localStorage.user_id,
              project_id: this.project_id,
              history_id: item.history_id
            })
              .then(res => {
                this.$tool.success("删除成功");
                let index = this.financing.pro_history_finance.indexOf(item);
                if (index !== -1) {
                  this.financing.pro_history_finance.splice(index, 1)
                }
              })
              .catch(err => {
                this.$tool.error("删除失败");
                this.$tool.console(err);
              })
          }

      },
      addHistory() {
        this.financing.pro_history_finance.push({
          finance_time: '',
          pro_finance_stage: '',
          pro_finance_scale: '',
          pro_finance_investor: '',
          history_id:''
        });
      },

      /*添加里程碑*/
      removemilePost(item) {
          if(item.project_dh_id=="" || item.project_dh_id==null){
            let index = this.milepost.pro_develop.indexOf(item)
            if (index !== -1) {
              this.milepost.pro_develop.splice(index, 1)
            }
          }else{
            this.$http.post(this.URL.deleteDevelop, {
              user_id: localStorage.user_id,
              project_id: this.project_id,
              project_dh_id: item.project_dh_id
            })
              .then(res => {
                this.$tool.success("删除成功");
                let index = this.milepost.pro_develop.indexOf(item)
                if (index !== -1) {
                  this.milepost.pro_develop.splice(index, 1)
                }
              })
              .catch(err => {
                this.$tool.error("删除失败");
                this.$tool.console(err);
              })
          }
      },
      addmilePost() {
        this.milepost.pro_develop.push({
          dh_start_time: '',
          dh_event: '',
          history_id: '',
          project_dh_id:''
        });
      },

      /*检查所有必填项目以及获取所有数据*/
      submitForm(formName) {
        let check = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            return
          } else {
            check = false;
          }
        });
        return check;
      },
      takeData(data, obj){
        for (let key in obj) {
          data[key] = obj[key];
        }
      },

      getMemberScale(data){
        for(let i=0; i<data.length; i++){
          if(data[i].stock_scale=="") data[i].stock_scale=0;
        }
      },//核心成员股权比例
      getMemberHunder(data){
        let check=true;
        for(let i=0; i<data.length; i++){
          if(this.$tool.getNull(data[i].stock_scale)){

          }else{
            if(this.$tool.checkNumber(parseFloat(data[i].stock_scale))){
              if(parseFloat(data[i].stock_scale)>100) {
                this.$tool.error("核心团队股权比例不能大于100");
                check=false;
              }
            }else{
              this.$tool.error("核心团队股权比例必须为数字");
              check=false;
            }
          }

        }
        return check;
      },//判断成员股权比例
      getNumberFull(data,title1,title2){
        let check=true;
        if(this.$tool.getNull(data)){

        }else {
          if (this.$tool.checkNumber(parseFloat(data))) {
            if (parseFloat(data) > 100) {
              this.$tool.error(title1);
              check = false;
            }
          } else {
            this.$tool.error(title2);
            check = false;
          }
        }
        return check;
      },//1大于100,2必须为数字
      getFinance(data){
        for(let i=0; i<data.length; i++){
          if(data[i].pro_finance_scale=="")  data[i].pro_finance_scale=0;
        }
      },//期望融资,融资金额
      getNumber(data){
        let check=true;
        if(this.$tool.getNull(data)){

        }else{
          if(this.$tool.checkNumber(parseFloat(data))){
            if(parseInt(data)>99999999) {
              this.$tool.error("项目估值必须小于99999999");
              check=false;
            }
          }else{
            this.$tool.error("项目估值必须为数字");
            check=false;
          }

        }
        return check;
      },//判断是数字小雨99999

  /*全部保存按钮*/
      allSave(){

//        if (this.planList.length === 0) this.fileMust = true;
//        else this.fileMust = false;
        this.projectMust = !this.submitForm('project');
        this.teamMust = !this.submitForm('team');
        this.financingMust = !this.submitForm('financing');
        this.milepostMust = !this.submitForm('milepost');
//        if (this.fileMust) this.alert("请添加商业计划书")
//        else
            if (this.projectMust) this.$tool.error("项目介绍必填项不能为空")
        else if (this.teamMust) this.$tool.error("核心团队必填项不能为空")
        else if (this.financingMust) this.$tool.error("融资信息必填项不能为空")
        else if (this.milepostMust) this.$tool.error("里程碑必填项不能为空")
        else if (!this.getMemberHunder(this.team.core_users)) {}
        else if (!this.getNumberFull(this.financing.pro_finance_stock_after,"投后股份不能大于100","投后股份必须为数字")){this.$tool.console("投后股份没过")}
        else if (!this.getNumberFull(this.pro_FA.commission,"签约佣金不能大于100","签约佣金必须为数字")){this.$tool.console("签约没过")}
        else if (!this.getNumberFull(this.pro_FA.stock_right,"股权赠与不能大于100","股权赠与必须为数字")){this.$tool.console("股权赠与没过")}
        else if (!this.getNumberFull(this.pro_FA.stock_follow,"跟投权不能大于100","跟投权必须为数字")){this.$tool.console("跟投权没过")}
        else if (!this.getNumberFull(this.pro_FA.stock_other,"其他权益不能大于100","其他权益必须为数字")){this.$tool.console("其他权益没过")}
        else if (!this.getNumber(this.financing.pro_finance_value)){this.$tool.console("pro_finance_value没过")}
        else if (this.$tool.getNull(this.project.pro_intro)){this.$tool.error("项目介绍不能为空")}
        else{
          this.loading=true;
          let allData = {};

          this.$tool.setTag(this.project.tags_pro,this.tags.changepro);

          this.$tool.setTag(this.team.tags_team,this.tags.changeTeam);
          this.$tool.setTag(this.project.pro_source,this.tags.changesource);

          this.takeData(allData, this.project);
          this.takeData(allData, this.team);
          this.takeData(allData, this.financing);
          this.takeData(allData, this.milepost);
          this.takeData(allData, this.pro_FA);
          this.setDateTime3(allData.pro_history_finance);
          this.setDateTime4(allData.pro_develop);

          allData.is_exclusive = this.is_exclusive;
          allData.project_id = this.project_id;
          allData.pro_area_province = this.project.pro_area.pid;
          allData.pro_area_city = this.project.pro_area.area_id;

          allData.contact_user_name = this.project.contact.user_name;
          allData.contact_user_mobile = this.project.contact.user_mobile;

          allData.pro_core_team = this.team.core_users;
          allData.pro_finance_stage = this.project.pro_stage.stage_id;
          allData.pro_company_scale = this.project.pro_company_scale.comp_scale_id;
          allData.user_id = localStorage.user_id;
          allData.pro_total_score=this.proportion;
          if(allData.pro_finance_stock_after=="" || allData.pro_finance_stock_after==undefined) allData.pro_finance_stock_after=0;
          if(allData.pro_finance_value=="" || allData.pro_finance_value==undefined) allData.pro_finance_value=0;
          if(allData.commission=="" || allData.commission==undefined) allData.commission=0;
          if(allData.stock_right=="" || allData.stock_right==undefined) allData.stock_right=0;
          if(allData.stock_follow=="" || allData.stock_follow==undefined) allData.stock_follow=0;
          if(allData.stock_other=="" || allData.stock_other==undefined) allData.stock_other=0;

          this.getMemberScale(allData.pro_core_team);
          this.getFinance(allData.pro_history_finance);

          this.$tool.console(allData,2);

          this.$http.post(this.URL.editProject, allData)
            .then(res => {
              this.loading=false;
              this.open2('项目编辑成功', '您当前的项目完整度为' + this.proportion + '%', '查看详情', '继续编辑')
            })
            .catch(err => {
              this.$tool.error("编辑失败");
              this.$tool.console(err);
            })

        }

/*        pro_develop: [
          {
            project_dh_id: 6,
            dh_index: "24c2886c937e9a3eea25c7d0ffe7f713",
            project_id: 37,
            project_index: "275fa4f135eecf08e5660d23e294e6cd",
            dh_start_time: "2017-06-20 17:39:25",//时间
            dh_end_time: "1443542400",
            dh_event: "组建团队和设立办公室",//事件
            created_at: null,
            updated_at: null
          }]*/
      },

      /*编辑成功弹窗*/
      open2(title, main, confirm, cancel) {
        this.$confirm(main, title, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'success'
        }).then(() => {
          this.$router.push({name: 'projectDetails', query: {project_id: this.project_id}})
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '继续编辑'
          });
          this.getProjectDetail();
        });
      },
      /*锚点跳转*/
      setNode(v){
        this.node0 = false;
        this.node1 = false;
        this.node2 = false;
        this.node3 = false;
        this.node4 = false;
        this.node5 = false;
        this['node' + v] = true;
        switch (v) {
          case "0":
            this.fileShow = true
            break;
          case "1":
            this.ProjectShow = true
            break;
          case "2":
            this.teamShow = true
            break;
          case "3":
            this.financingShow = true
            break;
          case "4":
            this.milepostShow = true
            break;
          case "5":
            this.SignShow = true
            break;
          default:
            this.fileShow = true
            break;
        }
        ;
        let jump = document.querySelectorAll('.d_jump')
        // 获取需要滚动的距离
        let total = jump[v].offsetTop
        let distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        // 平滑滚动，时长500ms，每10ms一跳，共50跳
        let step = total / 50
        if (total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total
          step = newTotal / 50
          smoothUp()
        }
        function smoothDown() {
          if (distance < total) {
            distance += step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            window.pageYOffset = distance
            setTimeout(smoothDown, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
            window.pageYOffset = total
          }
        }

        function smoothUp() {
          if (distance > total) {
            distance -= step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            window.pageYOffset = distance
            setTimeout(smoothUp, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
            window.pageYOffset = total
          }
        }
      },
      getTeamSync(data){
        let arr = [];
        for(let i=0; i<data.length; i++){
          let obj=new Object;
          obj.ct_member_name=data[i].team_member_name;
          obj.ct_member_intro=data[i].team_member_introduce;
          obj.ct_member_career=data[i].team_member_position;
          obj.project_ct_id="";
          obj.stock_scale="";
          arr.push(obj);
        }
        return arr;
      },//team同步数据修改
      getFinancingMoney(data){
        let arr = [];
        this.setDateTime5(data);
        for(let i=0; i<data.length; i++){
          let obj=new Object;
          obj.pro_finance_scale=data[i].history_financing_money;
          obj.pro_finance_stage="";
          obj.finance_time=data[i].history_financing_time;
          obj.pro_finance_investor=data[i].history_financing_who;
          obj.history_id="";
          arr.push(obj);
        }
        return arr;
      },//历史融资同步数据修改
      getMilestone(data){
        let arr = [];
        this.setDateTime6(data);
        for(let i=0; i<data.length; i++){
          let obj=new Object;
          obj.dh_event=data[i].milestone_event;

          obj.dh_start_time=data[i].milestone_time;
          obj.project_dh_id="";
          arr.push(obj);
        }
        return arr;
      },//里程碑同步数据修改

      /*一键同步按钮*/
      sync(){
        this.loading=true;
        this.dialogVisible = false;
        if(this.project.pro_intro=="") this.project.pro_intro = this.queryData.project_info.project_introduce;
        if(this.project.pro_website=="") this.project.pro_website = this.queryData.project_info.project_website;
        if(this.team.core_users.length==0) this.team.core_users=this.getTeamSync(this.queryData.team);
        if(this.financing.pro_history_finance.length==0) this.financing.pro_history_finance = this.getFinancingMoney(this.queryData.history_finance);
        if(this.milepost.pro_develop.length==0) this.milepost.pro_develop=this.getMilestone(this.queryData.milestone_list);
        this.loading=false;
      },
      getprojectId(){
        this.project_id = this.$route.query.project_id;
      }
    },
    //    当dom一创建时
    created(){
      this.loading = true;
      this.getprojectId();
      setTimeout(() =>{
        this.getWxProjectCategory();
        this.getProjectDetail();
        this.setFileType();
      },200);
      this.ProjectShow=false;
      this.teamShow=false;
      this.financingShow=false;
      this.milepostShow=false;
      this.SignShow=false;
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "getprojectId"
    }
  }
</script>

<style lang="less">
  @import '../../../assets/css/edit.less';
.el-radio-group{
  line-height: 3!important;
}
  .el-radio{
    margin-left:0px!important;

  }

  .planUpload {
    .el-upload {
      display: block;
    }
    .el-upload-list__item {
      /*    width: 200px;*/
    }
    .el-upload-list__item-name {
      font-size: 14px;
      color: #475669;
      letter-spacing: 0;
      text-decoration: underline
    }
  }

  #editproject {
    .addMember {
      display: block;
      margin: 0 auto;
    }
    .el-radio{
      width:111px
    }
  }
  .edit-page .item-block .block-tt-line{
    margin-bottom:17px !important;
  }

</style>
