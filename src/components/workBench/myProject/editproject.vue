<template>
  <div id="editproject">
    <div class="contain-center edit-page">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box">
        <div class="left-wrap">
<!--=================================项目文件=================================-->
          <div class="d_jump"></div>
          <div class="item-block" style="margin-top:0;">
            <div class="block-tt-line">
              <span class="b-title">项目文件</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('fileShow')" v-show="fileShow">收起</span>
              <span class="b-hander" @click="openDiv('fileShow')" v-show="!fileShow">展开</span>
            </div>
            <div class="block-info block-cc-file">
              <span class="f-title fl">商业计划书</span>
              <!--<span class="f-name">微天使商业计划书</span>
              <span class="del-btn"><i class="el-icon-delete"></i></span>-->
              <span style="margin-left: 20px;" class="fl">
                <el-upload class="planUpload"
                           action="/api/upload"
                           :on-change="planChange"
                           :on-success="planuploadsuccess"
                           :on-remove="planRemove"
                           :file-list="planList"
                           >
                  <el-button slot="trigger" type="primary" v-show="planButton"><i class="el-icon-plus"></i>计划书上传</el-button>
                </el-upload>
              </span>

            </div>
            <div class="block-info block-cc-pro">
              <span class="f-title fl">项目文件</span>
              <span style="margin-left: 34px;" class="fl">
                  <el-upload
                    class="upload"
                    ref="upload"
                    action="/api/upload"
                    :on-preview="handlePreview"
                    :on-change="handleChange"
                    :on-success="uploadsuccess"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false"
                    :data="uploadDate"
                    multiple>
                    <el-button slot="trigger" type="primary"><i class="el-icon-plus"></i>批量上传</el-button>
                  </el-upload>
              </span>
              <span class="f-tips fl" style="margin-left: 8px;" >（仅自己可见）</span>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <el-collapse-transition>
              <div v-show="fileShow">
                <div class="block-info block-cc-other" style="margin-bottom: 15px;"
                     v-for="(list, index) in uploadShow.lists"
                     :key="list.index">
                  <span class="f-title">{{list.type}} : </span>
                  <span class="f-name">{{list.name}}</span>
                  <span class="del-btn" @click.prevent="removeList(list)"><i class="el-icon-delete"></i></span>
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
                        prop="name">
                        <el-input v-model="project.name" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <span class="justIlook2">(仅自己可见)</span>
                      <el-form-item
                        label="公司名称"
                        prop="company">
                        <el-select :span="12" v-model="project.company" filterable="" remote placeholder="公司名称" :remote-method="remoteMethod"
                                   :loading="loading" loading-text="正在加载" class="width360" allow-create>
                          <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <span class="ques">
                        <el-tooltip placement="bottom-end">
                            <div slot="content">
                              <div class="tips-txt">1、一键同步公司信息，快速创建项目</div>
                              <div class="tips-txt" style="margin-top:5px;">2、可在项目详情查看尽调报告</div>
                            </div>
                            <img src="../../../assets/images/question.png" alt="" />
                        </el-tooltip>
                      </span>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="项目介绍"
                        prop="introduce"
                        :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'}]">
                        <el-input v-model="project.introduce" placeholder="一句话介绍，如帮助FA成交的项目管理工具"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="所属省级"
                        prop="district1"
                        :rules="[{required: true, message: '所属地区不能为空', trigger: 'change'}]">
                        <el-select v-model="project.district1" placeholder="请选择">
                          <el-option-group v-for="group in city" :key="group.label" :label="group.label">
                            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-option-group>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="所属市级"
                        prop="district2"
                        :rules="[{required: true, message: '所属地区不能为空', trigger: 'change'}]">
                        <el-select v-model="project.district2" placeholder="请选择">
                         <el-option
                           v-for="item in city2"
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
                        prop="frequency"
                        :rules="[{required: true, message: '项目轮次不能为空', trigger: 'change'}]">
                        <el-select v-model="project.frequency" placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in projectFrequency"
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
                        prop="field"
                        :rules="[{type: 'array',required: true, message: '项目领域不能为空', trigger: 'change'}]">
                        <el-select
                          v-model="project.field"
                          multiple
                          filterable
                          allow-create
                          :multiple-limit="multiplelimit"
                          placeholder="请添加(最多5个)" class="width360" >
                          <el-option
                            v-for="item in projectfield"
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
                        prop="companystate">
                        <el-radio-group v-model="project.companystate" @change="radiochange">
                          <el-radio v-for="companystate in companystates" class="radio"
                                    :label="companystate.label"
                                    :key="companystate.value"
                                    >{{companystate.value}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="公司规模"
                        prop="companySize">
                        <el-select v-model="project.companySize" placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in companySize"
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
                        prop="url">
                        <el-input v-model="project.url" placeholder="请输入项目主页地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="6">
                      <el-form-item
                        label="项目联系人"
                        prop="name">
                        <el-input v-model="project.contacts" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="手机号">
                        <el-input v-model="project.phone" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="项目来源">
                        <el-input v-model="project.source" placeholder="请输入项目来源，如：来源机构、来源人"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="私密设置"
                        prop="private">
                        <el-select v-model="project.private" placeholder="请选择" class="width360">
                          <el-option label="私密项目（仅自己／团队成员可查看编辑）" value="私密项目（仅自己／团队成员可查看编辑）"></el-option>
                          <el-option label="公开" value="公开"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目标签"
                        prop="tag">
                        <el-select v-model="project.tag" multiple placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in projectTag"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>

                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
<!--                <el-button type="primary" @click="submitForm('project')">提交</el-button>-->
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
                        prop="teamTag">
                        <el-select
                          v-model="team.teamTag"
                          multiple
                          filterable
                          allow-create
                          placeholder="请添加（最多5个)" class="width360">
                          <el-option
                            v-for="item in teamTag"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="4">
                      <el-form-item
                        label="成员姓名"
                        :prop="'members.' + index + '.name'"
                        v-for="(member, index) in team.members"
                        :key="member.index"
                        :rules="[{required: true, message: '成员姓名不能为空', trigger: 'blur'}]">
                        <el-input v-model="member.name" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="成员职位"
                        :prop="'members.' + index + '.position'"
                        v-for="(member, index) in team.members"
                        :key="member.index">
                        <el-input v-model="member.position" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="股权比例"
                        :prop="'members.' + index + '.shares'"
                        v-for="(member, index) in team.members"
                        :key="member.index">
                        <el-input v-model.number="member.shares" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item
                        label="成员介绍"
                        :prop="'members.' + index + '.introduce'"
                        v-for="(member, index) in team.members"
                        :key="member.index">
                        <el-input v-model.number="member.introduce" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1" >
                      <el-form-item label="　　"　v-for="(member, index) in team.members" :key="member.index">
                        <span class="imgdele" @click.prevent="removeMember(member)"><img src="../../../assets/images/delete.png"></span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <br>
                <el-button type="text" @click="addMember" class="addMember"><i class="el-icon-plus"></i> 新增成员</el-button>
<!--                <el-button type="primary" @click="submitForm('team')">提交</el-button>-->
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
                        prop="except"
                        :rules="[{required: true, message: '期望融资不能为空', trigger: 'change'}]">
                        <el-select v-model="financing.except" placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in exceptedFinancing"
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
                        prop="purpose">
                        <el-input v-model="financing.purpose" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="投后股份( % )"
                        prop="shares"
                        :rules="[{ type: 'number', message: '比例必须为数字值'}]">
                        <el-input v-model.number="financing.shares" placeholder="请输入具体数值，如：10"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目估值( 万 )"
                        prop="valuation"
                        :rules="[{ type: 'number', message: '估值必须为数字值'}]">
                        <el-input v-model.number="financing.valuation" placeholder="请输入具体数值，如：1000"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="4">
                      <el-form-item
                        label="历史融资时间"
                        :prop="'historys.' + index + '.time'"
                        v-for="(history, index) in financing.historys"
                        :key="history.index"
                        :rules="[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]">
                        <el-date-picker
                          v-model="history.time"
                          type="date"
                          placeholder="选择日期" style="width: 125px;">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="历史融资轮次"
                        :prop="'historys.' + index + '.round'"
                        v-for="(history, index) in financing.historys"
                        :key="history.index"
                        :rules="[{required: true, message: '融资轮次不能为空', trigger: 'change'}]">
                        <el-select v-model="history.round" placeholder="请选择">
                          <el-option
                            v-for="item in projectFrequency"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label="融资金额(万)"
                        :prop="'historys.' + index + '.money'"
                        v-for="(history, index) in financing.historys"
                        :key="history.index"
                        :rules="[{ type: 'number', message: '金额必须为数字值'}]">
                        <el-input v-model.number="history.money" placeholder="输入金额"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item
                        label="历史投资方"
                        :prop="'historys.' + index + '.investors'"
                        v-for="(history, index) in financing.historys"
                        :key="history.index"
                        :rules="[{required: true, message: '投资方不能为空', trigger: 'blur'}]">
                        <el-input v-model="history.investors" placeholder="请添加"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1" >
                      <el-form-item label="　　" v-for="(history, index) in financing.historys" :key="history.index">
                        <span class="imgdele" @click.prevent="removeHistory(history)"><img src="../../../assets/images/delete.png"></span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <br>
                <el-button type="text" @click="addHistory" class="addMember"><i class="el-icon-plus"></i> 添加历史融资</el-button>
<!--                <el-button type="primary" @click="submitForm('financing')">提交</el-button>-->
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
                        label="历史融资时间"
                        :prop="'milePostSomeThings.' + index + '.time'"
                        v-for="(milePostSomeThing, index) in milepost.milePostSomeThings"
                        :key="milePostSomeThing.index"
                        :rules="[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]">
                        <el-date-picker
                          v-model="milePostSomeThing.time"
                          type="date"
                          placeholder="选择日期" class="width360">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item
                        label="事件"
                        :prop="'milePostSomeThings.' + index + '.something'"
                        v-for="(milePostSomeThing, index) in milepost.milePostSomeThings"
                        :key="milePostSomeThing.index"
                        :rules="[{required: true, message: '请输入事件', trigger: 'blur'}]">
                        <el-input v-model="milePostSomeThing.something" placeholder="请添加"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1" >
                      <el-form-item label="　　" v-for="(milePostSomeThing, index) in milepost.milePostSomeThings" :key="milePostSomeThing.index">
                        <span class="imgdele" @click.prevent="removemilePost(milePostSomeThing)"><img src="../../../assets/images/delete.png"></span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <br>
                <el-button type="text" @click="addmilePost" class="addMember"><i class="el-icon-plus"></i> 添加里程碑</el-button>
<!--                <el-button type="primary" @click="submitForm('milepost')">提交</el-button>-->
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
                <el-form :model="sign" ref="sign" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item
                        label="运营状态"
                        prop="exclusive">
                        <el-radio class="radio" v-model="sign.exclusive" label="1">非独家FA签约</el-radio>
                        <el-radio class="radio" v-model="sign.exclusive" label="2">独家FA签约</el-radio>
                        <el-radio class="radio" v-model="sign.exclusive" label="3">其他</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="签约佣金（%）"
                        prop="commission"
                        :rules="[{ type: 'number', message: '比例必须为数字值'}]">
                        <el-input v-model.number="sign.commission" placeholder="请输入具体数值，如：10"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="股权赠与（%）"
                        prop="shares"
                        :rules="[{ type: 'number', message: '估值必须为数字值'}]">
                        <el-input v-model.number="sign.shares" placeholder="请输入具体数值，如：10"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="其他权益（%）"
                        prop="other"
                        :rules="[{ type: 'number', message: '比例必须为数字值'}]">
                        <el-input v-model.number="sign.other" placeholder="请输入具体数值，如：10"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="跟投权（%）"
                        prop="follow"
                        :rules="[{ type: 'number', message: '估值必须为数字值'}]">
                        <el-input v-model.number="sign.follow" placeholder="请输入具体数值，如：10"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>
            <el-button type="primary" size="large" style="margin: 0px auto; display: block;" @click="allSave">保存</el-button>
          <div style="height: 50px;"></div>
        </div>
        <div class="right-wrap">
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
          <div class="check-block" v-bind:class="{'checked':node1}" @click="setNode('1')" >
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
    <el-dialog title="添加运营状态" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="运营状态" :label-width="formLabelWidth">
          <el-input v-model="form.state" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addState">确 定</el-button>
      </div>
    </el-dialog>
    <!--文件分组的弹窗-->
    <el-dialog title="文件分组设置" :visible.sync="dialogFileVisible">
      <el-form :model="groups"  ref="groups" >
        <el-form-item label="分组名称" label-width="80px" prop="input" :rules="[{required: true, message: '分组不能为空', trigger: 'blur'}]">
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
                    :label="group.label"
                    :key="group.value"
                    style="width: 90px;"
          >{{group.value}}</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFileVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveGroupChange">保　存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data(){
    return {
      planList:[],//商业计划书上传列表
      fileList:[],//批量上传文件列表
      planButton:true,//控制上传按钮的显示
      uploadShow:{//上传文件展示列表,就是老夫操作的列表
        lists:[]
      },
      uploadDate:{},//上传所带的额外的参数
      groups:{
        input:"",
        group:[{type:"其他",label:'其他',value:'其他'},{type:"尽职调查",label:'尽职调查',value:'尽职调查'}],
        type:"其他",
        index:""
      },//分组用的所有参数
      name:"",
      show:"detail",
      fileShow:true,
      ProjectShow:true,
      teamShow:true,
      financingShow:true,
      milepostShow:true,
      SignShow:true,
      multiplelimit:5,
      project: {
        name : '',//项目名称
        company : '',//公司名称
        introduce : '',//项目介绍
        district1:'',//所属地区1省级单位
        district2:'',//所属地区2市级单位
        frequency:'',//项目轮次
        field:[],//项目领域
        companystate:"概念",//运营状态
        companySize:[],//公司规模
        url:'',//产品链接
        contacts:'',//项目联系人
        phone:'',//手机号
        source:'',//项目来源
        private:'',//私密设置
        tag:''//项目标签
      },//项目介绍
      team:{
        teamTag:[],//团队标签
        members: [{
          name : '',//姓名
          position : '',//职位
          shares : '',//股权比例
          introduce:''//成员介绍
        }],
      },//核心团队
      financing:{
        except:'',//期望融资
        purpose:'',//资金用途
        shares:'',//投后股份
        valuation:'',//项目估值
        historys:[{
          time:'',//历史融资时间
          round:'',//历史融资轮次
          money:'',//历史融资金额
          investors:''//历史投资方
        }]
      },//融资信息
      milepost:{
        milePostSomeThings:[{
          time:'',//里程碑时间
          something:''//事件
        }]
      },//里程碑
      sign:{
        exclusive:'1',//是否独家
        commission:'',//佣金%
        shares:'',//股权赠与%
        other:'',//其他权益%
        follow:''//跟投权%

      },//FA签约协议
      companyList: [],//公司搜索的数据
      list: [],
      loading: false,
      /*公司远程搜索*/
      states: ["阿里","百度","投着乐网络科技有限公司"],
      /*所属地区1省级选项*/
      city: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }],
      /*所属地区2市级选项*/
      city2: [{
        value: '杭州',
        label: '杭州'
      }, {
        value: '温州',
        label: '温州'
      }, {
        value: '宁波',
        label: '宁波'
      }],
      /*项目轮次选项*/
      projectFrequency: [{
        value: 'A轮',
        label: 'A轮'
      }, {
        value: 'B轮',
        label: 'B轮'
      },{
        value: '天使轮',
        label: '天使轮'
      }],
      /*项目领域默认选项*/
      projectfield: [{
        value: '人工智能',
        label: '人工智能'
      }, {
        value: '教育培训',
        label: '教育培训'
      }, {
        value: 'IT',
        label: 'IT'
      }],
      /*运营状态默认值*/
      companystates:[{
        label:'概念',
        value:'概念',
      },{
        label:'研发',
        value:'研发',
      },{
        label:'上线',
        value:'上线',
      },{
        label:'盈利',
        value:'盈利',
      },{
        label:'自定义添加',
        value:'自定义添加',
      }],
      /*公司规模*/
      companySize:[{
        value: '1-20人',
        label: '1-20人'
      },{
        value: '20-50人',
        label: '20-50人'
      },{
        value: '50-100人',
        label: '50-100人'
      }],
      /*项目标签*/
      projectTag:[{
        label:'阿里系',
        value:'阿里系',
      },{
        label:'百度系',
        value:'百度系',
      },{
        label:'淘宝系',
        value:'淘宝系',
      },],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogFileVisible:false,
      /*运营状态*/
      form: {
          state:''
      },

      /*==================团队标签=====================*/
      teamTag:[],
      /*==================融资范围=====================*/
      exceptedFinancing:[
        {label:'10万-100万',value:'10万-100万'},
        {label:'100万-1000万',value:'100万-1000万'}
      ],
      node0:true,
      node1:false,
      node2:false,
      node3:false,
      node4:false,
      node5:false,
      /*判断项目完整度*/
      filePerfect:false,
      projectPerfect:false,
      teamPerfect:false,
      financingPerfect:false,
      milepostPerfect:false,
      signPerfect:false,
      /*判断必填项是否填写*/
      fileMust:false,
      projectMust:false,
      teamMust:false,
      financingMust:false,
      milepostMust:false,
    }
  },
  computed:{
    /*项目完整度判断*/
    proportion(){
        let number=0;//所有的空值数
        let fileValue=this.planList
        let projectValue=this.project
        let teamValue=this.team
        let financingValue=this.financing
        let milepostValue=this.milepost
        let signValue=this.sign
        let sum=Object.keys(projectValue).length+//所有数据的总长度
          Object.keys(teamValue).length+
          Object.keys(financingValue).length+
          Object.keys(milepostValue).length+
          Object.keys(signValue).length+6
      //判断所有为空的数值,包括数组内的第一组
        function forFor(value){
          let inner=0;//每一次调用的空值
          if(isArray(value)){
            if(value.length===0) {number++;inner++};
          }else{
            for(let key in value){
              if(isArray(value[key])){
                if(value[key].length==0){
                  number++;
                  inner++
                }else{
                  for(let key2 in  value[key][0]){
                    if(value[key][0][key2]==""){
                      number++;
                      inner++
                    }
                  }
                }
              }else if(value[key]==""){
                number++;
                inner++
              }
            }
          }

          return inner
        }
      //是否为数组
        function isArray(o){
          return Object.prototype.toString.call(o)=='[object Array]';
        }
      if(forFor(fileValue)==0)this.filePerfect=true;
      else this.filePerfect=false;

      if(forFor(projectValue)==0)this.projectPerfect=true;
      else this.signPerfect=false;

      if(forFor(teamValue)==0) this.teamPerfect=true;
      else this.teamPerfect=false;

      if(forFor(financingValue)==0) this.financingPerfect=true;
      else this.financingPerfect=false;

      if(forFor(milepostValue)==0) this.milepostPerfect=true;
      else this.milepostPerfect=false;

      if(forFor(signValue)==0)this.signPerfect=true;
        else this.signPerfect=false;

/*      console.log(parseInt(((sum-number)/sum)*100))
      console.log(parseInt(number/sum))*/

      return parseInt(((sum-number)/sum)*100)
    },


  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods:{
      /*商业计划书上传*/
    planChange(file, fileList){
//      console.log(fileList)
      this.planButton=false;
    },
    planuploadsuccess(response, file, fileList){
      this.planList = fileList
    },
    planRemove(file, fileList) {
      this.planList = fileList.slice(1,1);
      if (fileList.length == 0) this.planButton = true;
      else this.planButton = true;

    },
    /*批量上传*/
    //2号当添加文件时,添加入上传列表
    handleChange(file, fileList){
      if(file.status=="ready"){
        this.addDomain("其他",file.name)
      }
      console.log(fileList)
      console.log(this.fileList)
      console.log(this.uploadShow)

    },
    uploadsuccess(response, file, fileList){
//        this.success=false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file){},
    //删除当前上传文件
    removeList(item) {
      console.log(this.fileList)
      var index = this.uploadShow.lists.indexOf(item)
      if (index !== -1) {
        this.uploadShow.lists.splice(index, 1)
        this.fileList.splice(index, 1)
      }
    },
    //添加上传文件时,加入显示列表
    addDomain(type,name) {
      let object ={};
      object.type=type;
      object.name=name;
      this.uploadShow.lists.push(object);
    },
    //点击分组设置中的单选框
    groupchange(label){
      console.log(label)
    },
    //添加分组设置的分组
    addGroup(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let newObj={}
          newObj.type=this.groups.input
          newObj.label=this.groups.input
          newObj.value=this.groups.input
          this.groups.type=this.groups.input
          this.groups.group.push(newObj)
          this.groups.input=''

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    saveGroupChange(){
      let type=this.groups.type;
      let index=this.groups.index;
      if (index !== -1) {
        this.uploadShow.lists[index].type=type;
        this.dialogFileVisible=false
      }
    },
    toGroup(item){
      var index = this.uploadShow.lists.indexOf(item)
      this.groups.index=index;
      this.dialogFileVisible=true;
    },

    openDiv(v){
      this[v] = true ;
    },
    closeDiv(v){
      this[v] = false ;
    },
    goBack(){//返回上一层
      this.$router.go(-1);
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.companyList = this.list.filter(item => {
            return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 1000);
      } else {
        this.companyList = [];
      }
    },
    radiochange(label){/*控制添加radio*/
      if(label=="自定义添加"){
        this.dialogFormVisible=true;
      }
    },
    /*添加运营状态*/
    addState(){
      let newState={};
      newState.label=this.form.state
      newState.value=this.form.state
      this.project.companystate=this.form.state
      this.companystates.splice(length-1,0,newState)
      this.dialogFormVisible = false
    },

    /*添加团队成员*/
    removeMember(item) {
      var index = this.team.members.indexOf(item)
      if (index !== -1) {
        this.team.members.splice(index, 1)
      }
    },
    addMember() {
      this.team.members.push({
        name : '',
        position : '',
        shares : '',
        introduce:''
      });
    },
    /*添加历史融资信息*/
    removeHistory(item) {
      var index = this.financing.historys.indexOf(item)
      if (index !== -1) {
        this.financing.historys.splice(index, 1)
      }
    },
    addHistory() {
      this.financing.historys.push({
        time:'',
        round:'',
        money:'',
        investors:''
      });
    },
    /*添加里程碑*/
    removemilePost(item) {
      var index = this.milepost.milePostSomeThings.indexOf(item)
      if (index !== -1) {
        this.milepost.milePostSomeThings.splice(index, 1)
      }
    },
    addmilePost() {
      this.milepost.milePostSomeThings.push({
        time:'',
        something:''
      });
    },
    /*检查所有必填项目以及获取所有数据*/
    submitForm(formName) {
      let check=true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return
        } else {
//          this.open()
          check=false;
        }
      });
      return check;
    },
    /*全部保存按钮*/
    allSave(){
      if(this.planList.length===0) this.fileMust=true
      else this.fileMust=false

      console.log(this.fileMust)
      console.log(this.planList.length)
      this.projectMust=!this.submitForm('project')
      this.teamMust=!this.submitForm('team')
      this.financingMust=!this.submitForm('financing')
      this.milepostMust=!this.submitForm('milepost')
//      let check = new Object;
//      check.project=this.submitForm('project')
//      check.team=this.submitForm('team')
//      check.financing=this.submitForm('financing')
//      check.milepost=this.submitForm('milepost')
/*      let projectCheck=true;
      for(var key in check){
          if(check[key]==false){
            projectCheck=false;
            return;
          }
      }*/
      /*if(this.submitForm('project') || this.submitForm('team') || this.submitForm('financing') || this.submitForm('milepost')){
        let value=new Object;
        value.project=this.$tool.getToObject(this.project)
        value.team=this.$tool.getToObject(this.team)
        value.financing=this.$tool.getToObject(this.financing)
        value.milepost=this.$tool.getToObject(this.milepost)
        value.sign=this.$tool.getToObject(this.sign)
        console.log(value)
      }else{
        this.open()
      }*/
    },
    /*警告弹窗*/
    open() {
      this.$notify.error({
        message: '必填项不能为空',
        offset: 300
      });
    },
    /*跳转*/
    setNode(v){
      this.node0 = false ;
      this.node1 = false ;
      this.node2 = false ;
      this.node3 = false ;
      this.node4 = false ;
      this.node5 = false ;
      this['node' + v] = true ;
      switch (v){
        case "0":
          this.fileShow=true
          break;
        case "1":
          this.ProjectShow=true
          break;
        case "2":
          this.teamShow=true
          break;
        case "3":
          this.financingShow=true
          break;
        case "4":
          this.milepostShow=true
          break;
        case "5":
          this.SignShow=true
          break;
        default:
          this.fileShow=true
          break;
      };
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
      function smoothDown () {
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
      function smoothUp () {
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
    }
  },
  //    当dom一创建时
  created(){
    if(this.planList.length!=0) this.planButton=false;
    else this.planButton=true;

  }
}
</script>

<style lang="less">
  @import '../../../assets/css/edit.less';
.planUpload{
  .el-upload{
    display:block;
  }
  .el-upload-list__item{
/*    width: 200px;*/
  }
  .el-upload-list__item-name{
    font-size:14px;
    color:#475669;
    letter-spacing:0;
    text-decoration:underline
  }
}
</style>
