<template>
  <div style="height:calc(100% - 180px)">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>组织与人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>组织结构</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-show="show == 'first'?true:false" class="wrap-white mb10 firstModule">
      <el-scrollbar class="scrollbar-self">
            <el-tree
              :props="props"
              :load="loadNode"
              lazy
              :default-expand-all="false"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
              highlight-current>
            </el-tree>
      </el-scrollbar>
    </div>

    <div  v-show="show == 'seconed'?true:false" class="wrap-white mb10 firstModule">
      <el-scrollbar class="scrollbar-self">
        <div class="title">
          <span class="title-name">{{this.title}}</span>
          <span class="modifyOrg" @click="orgainizeBtn()">修改组织</span>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
      
          :gutter="24">
          <el-table-column
            label="组织/人员"
            >
            <template slot-scope="scope">
              {{scope.row.name}} ( {{ scope.row.code }} )
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-col v-if="scope.row.type == 'ORG'" >
                <el-button  
                  :disabled="scope.row.onCheck || scope.row.status!='OPENED'"
                  @click.native.prevent="forbiddenOrg(scope.row.id,scope.row.name, tableData)"
                  type="text"
                  size="small">
                  禁用
                </el-button>
                <el-button 
                  :disabled="scope.row.onCheck || scope.row.status=='OPENED'"
                  @click.native.prevent="openOrg(scope.row.id, scope.row.name, tableData)"
                  type="text"
                  size="small">
                  启用
                </el-button>
              </el-col>
              <el-col v-else>
                <el-button 
                :disabled="scope.row.onCheck"  v-if="!scope.row.admin"
                  @click.native.prevent="authorizeSourse(scope.row.id, tableData)"
                  type="text"
                  size="small">
                  负责人
                </el-button>
                <el-button 
                  v-else 
                  :disabled="scope.row.onCheck"
                  @click.native.prevent="unAuthorizeSourse(scope.row.id, tableData)"
                  type="text"
                  size="small">
                  取消负责人
                </el-button>
                <el-button
                :disabled="scope.row.onCheck"
                  @click.native.prevent="deleteSourse(scope.row.id, scope.row.name, tableData)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
       <!-- <el-button  @click="goBack()" class="goBack">返回</el-button> -->
    </div>
    <div  v-show="show == 'three'?true:false" class="wrap-white mb10 firstModule">
      <el-scrollbar class="scrollbar-self" style="overflow-x:hidden;">
        <el-row :gutter='24'>
          <el-col :span="24">
            <div class="pb8 padding-top-10">*组织名称</div>
            <el-input
              placeholder="例子：上海分公司 或 第六团队"
              v-model="editInfo.name"
              :readonly="ifRead"
              >
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter='24'>
          <el-col :span="24">
            <div class="pb8 padding-top-10">组织编码</div>
            <el-input
              placeholder="系统自动分配"
              v-model="editInfo.code"
              :readonly="true"
              >
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter='24'>
          <el-col :span="24">
            <div class="pb8 padding-top-10">组织描述</div>
            <el-input
              v-model="editInfo.remark"
              type="textarea"
              >
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter='24'>
          <el-col :span="24">
            <div class="pb8 padding-top-10">组织地址</div>
            <el-input
              placeholder=""
              v-model="editInfo.address"
              >
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter='24'>
          <el-col :span="24">
            <div class="pb8 padding-top-10">联系方式</div>
            <el-input
              placeholder=""
              v-model="editInfo.phone"
              >
            </el-input>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
    <div  v-show="show == 'four'?true:false" class="wrap-white">
      <el-scrollbar class="scrollbar-self" style="overflow-x:hidden;">
        <el-table
          :data="transferData"
          style="width: 100%; background:#FAFBFC;"
          @selection-change="changeFun"
        >
          <el-table-column
            type="selection"
            label="全选"
            width="50"
            align="center">
          </el-table-column>
          <el-table-column
            prop="salesName"
            label="人员"
            min-width="125"
            align="center">
          </el-table-column>

          <el-table-column
            prop="salesNo"
            label="销售订单"
            min-width="110"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
            align="center">
            <template slot-scope="scope">
              <el-button class="delete" type="text" @click.native.prevent="deleteRow(scope.$index, transferData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
    <div v-show="show == 'four'" class="wrap-white chooseOrgBg">
      <div class="searchContent" >
        <h5>组织选择</h5>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-select v-model="valueOrg" filterable placeholder="请选择">
              <el-option
                v-for="(item, index) in optionsOrg"
                :key="index"
                :label="item.label"
                :value="item.value"
               >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20"  class="transferOption" type="flex" justify="end">
          <el-col :offset="10" :span="4">
            <el-button type="primary" class="transferBtn" @click="transferSubmit">转移</el-button>
          </el-col>
          <el-col :span='4'>
             <el-button  @click="goBackSec()" class="transferBack">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-show="show == 'five'" class="wrap-white addPerson">
      <div class="searchContent" >
        <h5>人员</h5>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-select v-model="valuePerson" filterable placeholder="支持：人员姓名和手机号" @change="changeSelect(valuePerson)">
              <el-option
                v-for="(item, index) in optionsPerson"
                :key="index"
                :label="item.label"
                :value="item.label"
               >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <div class="li-cointer">
              <ul id="create-person-li" v-show="showLi">
                <li v-for="(item, index) of personList" :key="index"> 
                  <el-checkbox  class="createCheckBox" >{{item}}</el-checkbox>
                  <el-button type="text" class="createDelBtn" size="mini" @click="deleteLi(item)">删除</el-button>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20"  class="transferOption" type="flex" justify="end">
          <el-col :offset="10" :span="4">
            <el-button type="primary" class="transferBtn" @click="addBtn">加入</el-button>
          </el-col>
          <el-col :span='4'>
             <el-button  @click="goBackSec()" class="cancel">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="footer mb10">
      <el-row :gutter="24" v-if="show == 'first'" style=" margin-left:0px" type="flex" justify="end">
        <el-col :offset="6" class="footer-col" >
          <el-button type="" class="footer_btn leftBtn" @click="uploadFile('one')"> 组织结构模板下载</el-button>
        </el-col>
        <el-col  class="footer-col" >
          <el-button type="" class="footer_btn leftBtn grid-content" @click="importFile('one')">组织结构批量导入</el-button>
        </el-col>
         <el-col  class="footer-col">
          <el-button type="primary" class="footer_btn grid-content"  @click="uploadFile('two')">人员归属模板下载</el-button>
        </el-col>
        <el-col class="footer-col">
          <el-button type="primary" class="footer_btn grid-content" @click="importFile('two')">人员归属批量导入</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="24" v-if="show == 'seconed'" style=" margin-left:0px" type="flex" justify="end">
        <el-col :offset="6" class="footer-col" >
          <el-button type="" class="footer_btn leftBtn" @click="goBackFour()"> 人员转移</el-button>
        </el-col>
        <el-col  class="footer-col" >
          <el-button type="" class="footer_btn leftBtn grid-content" @click="goBackFive()">加入人员</el-button>
        </el-col>
         <el-col  class="footer-col">
          <el-button type="primary" class="footer_btn grid-content" @click="goBackThree()">新建组织</el-button>
        </el-col>
        <el-col class="footer-col">
          <el-button type="primary" class="footer_btn grid-content" @click="goBackFirst()">返回</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="24" v-if="show == 'three'" style=" margin-left:0px;margin-right:0px;" type="flex" justify="end">
        <!-- <el-col :offset="12" :span="4" class="footer-col" >
           <el-button  type="primary" @click="_checkName()" class="addOrgRoyalty">修改</el-button>
        </el-col>
        <el-col  :span="4" class="footer-col" >
           <el-button  @click="goBackSec()" class="goBack">返回</el-button>
        </el-col> -->
        <el-button  type="primary" v-if="ifRead" @click="_checkName()" class="addOrgRoyalty">修改</el-button>
        <el-button  type="primary" v-if="!ifRead" @click="addNewSubmit()" class="addOrgRoyalty">添加</el-button>
        <el-button  @click="goBackSec()" class="goBack">返回</el-button>
      </el-row>
    </div>
    <!--导入弹框-->
    <el-dialog
        title="选择文件"
        :modal-append-to-body="false"
        :visible.sync="dialogVisible"
        width="45%"
      >
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="action"
          multiple
          :limit="1"
          :headers="importHeaders"
          :on-exceed="handleExceed"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :auto-upload="false" >
          <el-button size="small" type="primary"  slot="trigger">点击上传</el-button>
        </el-upload>

        <span slot="footer" class="dialog-footer">
          <el-button @click="clearFiles">返回</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  import { treeList, childList, deletePerson, cancelAdmin, updateToAdmin, invalid, open, editInfo, checkName, edit,
  transferChildSales, getOrgs, transferSales, addGetSales,
  addNew, addRef} from '../../api/api'
import { func } from '../../store/getters';
import {MessageBox} from 'element-ui'
  export default {
    data() {
      return {
        action:'',
        importHeaders:   {
          access_id: this.$store.state.userId,
          access_token: this.$store.state.token
        },
        title: '',
        ifRead: true,
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf',
          disabled: false
        },
        show: 'first',
        projectId: '130',
        fileList: [],
        dialogVisible: false,
        orgInfo: {
          code: '',
          name: '',
          rate: '',
          id: ''
        },
        editInfo:{
          id: '',
          code: '',
          name: '',
          remark: '',
          address: '',
          phone: ''
        },
        tableData: [],
        transferData: [],
        chooseTransfer: [], //业绩转移人数组
        transferIdArr: [],
        optionsOrg: [],
        optionsPerson: [],
        valueOrg: '',
        valuePerson: '',
        personList: [], //已选人员  'add10(156****3625)', 'shitou08(187****0008)', 'shitou00(187****0000)'
        checkedLi: '',
        showLi: false,
        salesIds: []
        
      }
    },
    methods: {
      clearFiles(){
        this.dialogVisible = false;
        this.$refs.upload.clearFiles();
      },
      importFile(type){
        this.dialogVisible =true;
        if(type == 'one'){
           this.action="/api/salesOrg/importOrgs"
        }else{
          this.action="/api/salesOrg/importOrgSalesRef"
        }
      },
       handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择1个文件`);
      },
      handleAvatarSuccess(res, file){        
        this.clearFiles();
        this.$alert(res.message, '提示', {
          confirmButtonText: '确定'
        });
      },
      beforeAvatarUpload(file) {
      },
      submitUpload() {
        if(this.$refs.upload.$children[0].fileList.length==1){
          this.$refs.upload.submit();
        } else {
          this.$message.error('不能为空,请选择文件!');
        }
      },
      uploadFile(str){
        console.log(1)
        if(str == 'one'){
          window.open('/api/salesOrg/export')
        }else{
          window.open('/api/salesOrg/salesOrgRefTemplateDownload')
        }
        
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '中民投',id: '130', parentId: '-1',level: 0,code: '000047', disabled: false}]);
        }
        if (node.level > 7) return resolve([]);
        
         treeList(node.data.id).then(
          res => {
            let data = JSON.parse(JSON.stringify(res.data))
            .map(
              i => {
                if(i.type == 'ORG'){
                  return Object.assign({}, i, {disabled: false})
                }else {
                  return Object.assign({}, i, {name:i.salesName,id:i.salesId,code:i.salesNo,level: i.level, disabled: true,leaf: true })
                }
              }
            )
            resolve(data);
          }
        )
      },
      handleNodeClick(data, node, vuecompent){
          // console.log(data, node, vuecompent, '3333333')
          if(data.disabled){
            return false
          }else{
            this.show = 'seconed'
            this.projectId = data.id;
            // this.orgInfo.code = data.code;
            this.orgInfo.id = data.id;
            this.orgInfo.name = data.name
            this.getChildList(this.orgInfo.id, this.orgInfo.name);
          }
         
      },
      // 添加提成
      goBackSec(){
        this.show = 'seconed';
      },
      goBackFirst(){
        this.show = 'first'
      },
      goBackFour(){
        this.show = 'four'
        this.getTransferChildSales()
        this.getOrg()
      },
      goBackFive(){
        this.show = 'five'
        this.addGetSales();
      },
      // 查看组织详情
      getChildList(id, name){
        childList(id).then(
          res => {
            console.log(res)
            if(res.statusCode == '200'){
              // this.tableData = res.data
              this.title = name;
              this.tableData = res.data.map(
                i => {
                  if(i.type == 'ORG'){
                    return Object.assign({}, i, {
                      id: i.id,
                      code: i.code,
                      name: i.name,
                      status: i.status,
                      updateTime: i.updateTime,
                      type: i.type,
                      createTime: i.createTime,
                      onCheck: i.onCheck,
                      admin: i.admin
                    })
                  }else{
                    return Object.assign({}, i, {
                      id: i.id,
                      code: i.code,
                      name: i.salesName,
                      code: i.salesNo,
                      status: i.status,
                      updateTime: i.updateTime,
                      type: i.type,
                      createTime: i.createTime,
                      onCheck: i.onCheck,
                      admin: i.admin
                    })
                  }
                }
              )
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      //人员删除按钮
      deleteSourse(id, name){
        this.$msgbox({
          title: '营销管理平台',
          message: '确定删除'+ name +'吗？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              deletePerson(id).then(
                res => {
                  console.log(res, '11')
                  if(res.statusCode == '200'){
                    this.$message({
                      type: 'success',
                      message: '操作成功！'
                    });
                     done();
                  }else{
                    this.$message({
                      type: 'err',
                      message: '操作失败！'
                    });
                     done();
                  }
                },
                err => {
                  console.log(err)
                }
              )
            } else {
              done();
            }
          }
        })
        .then(
          action => {
            this.getChildList(this.orgInfo.id)
          }
        )
        .catch(() => {})
      },
      // 负责人按钮
      authorizeSourse(id){
         updateToAdmin(id).then(
           res => {
              if(res.statusCode == '200'){
                this.$message({
                  type: 'success',
                  message: '操作成功！'
                }, this.getChildList(this.orgInfo.id))
              }else{
                this.$message({
                  type: 'error',
                  message: '操作失败！'
                });
              }
           },
           err => {
             console.log(err)
           }
         )
      },
      // 取消负责人按钮
      unAuthorizeSourse(id){
        console.log(id,'取消负责人')
        cancelAdmin(id).then(
          res => {
            if(res.statusCode == '200'){
              this.$message({
                type: 'success',
                message: '操作成功！'
              }, this.getChildList(this.orgInfo.id))
            }else{
              this.$message({
                type: 'error',
                message: '操作失败！'
              });
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      // 组织禁用按钮
      forbiddenOrg(id, name){
         this.$msgbox({
            title: '营销管理平台',
            message: '确定禁用'+ name +'吗？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                invalid(id).then(
                  res => {
                    console.log(res, '11')
                    if(res.statusCode == '200'){
                      this.$message({
                        type: 'success',
                        message: '操作成功！'
                      }, this.getChildList(this.orgInfo.id));
                      done();
                    }else{
                      this.$message({
                        type: 'error',
                        message: '操作失败！'
                      });
                      done();
                    }
                  },
                  err => {
                    console.log(err)
                  }
                )
                done();
              } else {
                done();
              }
            }
          })
          .catch(() => {
          })
      },
      // 组织启用
      openOrg(id, name){
         this.$msgbox({
            title: '营销管理平台',
            message: '确定禁用'+ name +'吗？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                open(id).then(
                  res => {
                    console.log(res, '11')
                    if(res.statusCode == '200'){
                      this.$message({
                        type: 'success',
                        message: '操作成功！'
                      }, this.getChildList(this.orgInfo.id));
                      done();
                    }else{
                      this.$message({
                        type: 'error',
                        message: '操作失败！'
                      });
                      done();
                    }
                  },
                  err => {
                    console.log(err)
                  }
                )
                done();
              } else {
                done();
              }
            }
          })
          .catch(() => {
          })
      },
      // 修改组织
      orgainizeBtn(){
        this.show = 'three'
        this.ifRead = true;
        console.log(this.orgInfo.id,this.orgInfo.name)
        editInfo(this.orgInfo.id).then(
          res => {
            // this.editInfo = {};
            // this.editInfo = JSON.parse(JSON.stringify(res.data));
            // this.checkName(this.editInfo.id, this.editInfo.name)
            this.editInfo.id = res.data.id;
            this.editInfo.code = res.data.code;
            this.editInfo.name = res.data.name;
            this.editInfo.remark = res.data.remark;
            this.editInfo.phone = res.data.phone;
            this.editInfo.address = res.data.address;
          },
          err => {
            console.log(err)
          }
        )
      },
      // 检测信息
      _checkName(){
        var params = {
          name: this.editInfo.name,
          id: this.editInfo.id
        }
        checkName(params).then(
          res => {
            if(res.statusCode == '200' || res.data){
              this.edit();
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      // 提交修改信息
      edit(){
        var params = {
          name: this.editInfo.name,
          remark: this.editInfo.remark,
          address: this.editInfo.address,
          phone: this.editInfo.phone,
          id: this.editInfo.id
        }
        console.log(params, 'params')
        edit(params).then(
          res => {
            if(res.statusCode == '200'){
              MessageBox.alert(res.message, '营销管理系统', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                  this.show = 'first'
                }
              });
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      changeFun(val) {
        this.chooseTransfer = val // 返回的是选中的列的数组集合
        let ids = []
        this.chooseTransfer.map(item => {
          ids.push(item.id)
        })
        this.transferIdArr = ids;
        console.log(this.chooseTransfer, this.transferIdArr,  '000000')
      },
      getTransferChildSales(){
        transferChildSales(this.orgInfo.id).then(
          res => {
            console.log(res)
            this.transferData = res.data
          },
          err => {
            console.log(err)
          }
        )
      },
      // 搜索组织
      getOrg(){
        var params = {
          search: ''
        }
        getOrgs(this.orgInfo.id, params).then(
          res => {
            this.optionsOrg = res.data.map((item,index) => {
              return Object.assign({}, item, {
                value: '选项' + index,
                label: item.name + '(' + item.code + ')',
                id: item.id
              })
            })

          },
          err => {
            console.log(err)
          }
        )
      },
      // 点击转移按钮
      transferSubmit(){
        if(this.transferIdArr.length > 0){
          var params = {
            ids: (this.transferIdArr).join(','),
            targetOrgId: this.orgInfo.id
          }
          transferSales(params).then(
            res => {
                console.log(res,'090')
            },
            err => {
              console.log(err)
            }
          )
        }else {
           MessageBox.alert('请选择人员！', '营销管理系统', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {
               
              }
            });
        }
        
      },
      // 加入人员
      addGetSales(){
        var params = {
          search: ''
        }
        addGetSales(this.orgInfo.id, params).then(
          res => {
            this.optionsPerson = res.data.map((item, index) => {
              return Object.assign({}, item, {
                value: '选项' + parseInt(parseInt(index) + 1),
                label: item.name + '(' + item.mobile + ')',
                id: item.salesId
              })
            })
          },
          err => {
            console.log(err)
          }
        )
      },
      addBtn(){
        // 获取所有选择的人员
        let tempChecked = [];
        $(".createCheckBox").each(function(){
            if($(this).is('.is-checked')){
              tempChecked.push($(this).text())
            }  
        });  
        console.log(tempChecked, 'shuzu ')
        var tempLen = tempChecked.length;
        var tempSalesIds = [];
        this.optionsPerson.map(
          i => {
            for(var k=0; k< tempLen; k ++){
              if(tempChecked[k] == i.label){
                tempSalesIds.push(i.id)
              }
            }
          }
        )
        this.salesIds = tempSalesIds;
        var params = {
          salesIds: this.salesIds.join(','),
          parentOrgId: this.orgInfo.id
        }
        addRef(params).then(
          res => {
            if(res.statusCode == 200){
              MessageBox.alert(res.message, '营销管理系统', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                  this.show = 'first'
                }
              });
            }
          }
        )
      },
      // 新建组织
      goBackThree(){
        this.show = 'three'
        this.ifRead = false;
        this.editInfo.name = '';
        this.editInfo.code = '';
        this.editInfo.remark = '';
        this.editInfo.address = '';
        this.editInfo.phone = '';
      },
      addNewSubmit(){
        var params = {
          name: this.editInfo.name,
          remark: this.editInfo.remark,
          address: this.editInfo.address,
          phone: this.editInfo.phone,
          parentId: this.orgInfo.id
        }
        addNew(params).then(res=> {
          console.log(res, '01')
          if(res.statusCode == '200'){
            MessageBox.alert(res.message, '营销管理系统', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {
                this.show = 'seconed'
              }
            });
          }else{

          }
        },
        err => {
          console.log(err)
        })
      },
      changeSelect(value){
        // console.log(value, 'value')
        this.personList.push(value);
        // this.showLi()
        if(this.personList.length == 0){
          this.showLi = false;
        }else{
          this.showLi = true;
        }
      },
      deleteLi(value){
        var index = this.personList.indexOf(value);
        this.personList.splice(index, 1);
        if(this.personList.length == 0){
          this.showLi = false;
        }else{
          this.showLi = true;
        }
      }
      
      

    }
  }
</script>
<style>
   .el-tree-node__content{
      cursor: default;
    }
    .el-tree{
      padding: 24px 10px
    }
    .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover{
      background: #ffffff!important;
    }
    .el-tree-node__content{
      height: 42px;
      margin-bottom: 10px;
    }
    .el-tree-node__label{
      font-size: 14px;
      line-height: 40px;
      color: #7F8FA4;
      border: 1px solid #E6EAEE;
      min-width: 150px;
      text-align: center;
      border-radius: 4px;
    }

    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      content: "\e722";
      font-size: 20px;
    }
    .el-icon-caret-right:before{
      content: "\e723";
      font-size: 20px;
    }
    .el-tree-node__expand-icon.expanded {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    .el-scrollbar__wrap{
      height: 100%;
      overflow-y: scroll;
    }
    .el-scrollbar__bar.is-horizontal{
      height: 0px;
    }
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color:white;
    }
    .fileImport{
      float: right;
      margin-top: 10px;
    }
    input[type="text"], input[type="number"]{
      text-align: left; 
      font-size: 14px;
    }
    .option{
      text-align: right;
      padding-top: 20px;
    }
      /* .addOrgRoyalty, */
  .addOrgRoyalty, .goBack{
      width:16%;
    }
  .is-leaf + .el-tree-node__label {
  background-color: #F4F6F8
  }
  .modifyOrg{
    font-size: 12px;
    color: #469DF8;
    margin-left: 15px;
  }
  .title-name{
    font-size: 20px;
    color: black;
    height: 64px;
    line-height: 64px;
    font-weight: bold;
  }
  .pb8{
    padding-bottom: 8px;
  }
  .mb10{
    margin-top: 10px;
  }
  .content-wrapper{
    /* height: calc(100% - 200px) */
    height: 100%;
    /* overflow: hidden; */
  }
  .content-wrapper .content{
    height: 100%;
  }
  .firstModule{
    height: 100%;
  }
  .el-scrollbar{
    height:100%;
  }
  .el-scrollbar__wrap{
    height:100%;
  }
  .footer_btn{
    width: 100%;
    /* box-sizing: border-box; */
  }
  .leftBtn{
    color: #0294FF;
  }
  .chooseOrgBg{
    margin-top: 20px;
    min-height: 500px;
    position: relative;
  }
  .searchContent{
    height:100%;
    position: relative;
  }
  .el-select{
    width: 100%;
  }
  .searchOrg{
    width:100%;
  }
  .transferOption{
    /* position:  */
    position:absolute;
    width: 100%;
    bottom: 35px;
    margin-left:0px;
    margin-right:0px;
  }
  /* .transferOption {
    position: relative;
    top: 220px;
  } */
  .el-select-dropdown{
    height: 280px;
  }
  .transferBtn, .transferBack{
    width: 100%;
  }
  .addPerson{
    height: 100%;
    position: relative;
  }
  .li-cointer{
    width: 100%;
  }
  #create-person-li{
    width: 100%;
    overflow-y: auto;
    border:1px solid #d8dce5;
    border-bottom: 0px;
    max-height: 320px;

  }
  #create-person-li::-webkit-scrollbar { width: 0 !important }
  #create-person-li li{
    position: relative;
    line-height: 40px;
    font-size: 14px;
    color:#5a5e66;
    padding-left:15px;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
  }
  .createDelBtn{
    display: inline-block;
    position: absolute;
    right:15px;
    height:100%;
  }
  .el-button{
    /* width: 100%; */
  }
</style>
