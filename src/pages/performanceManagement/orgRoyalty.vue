<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item>业绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>组织提成</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-show="show">
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
      <!-- <el-button type="primary" class="fileImport"  @click="importBtn()" >文件提成</el-button> -->
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
            action="/api/salesOrg/importOrgs"
            :headers="importHeaders"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :before-upload="beforeAvatarUpload"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :file-list="fileList"
            :auto-upload="false">
            <el-button size="small" type="primary"  slot="trigger">点击上传</el-button>

          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">返回</el-button>
            <el-button type="primary" @click="submitUpload">确 定</el-button>
          </span>
        </el-dialog>
    </div>
    <div v-show="!show" class="wrap-white mb30 pb30">
      <el-row :gutter='24'>
        <el-col :span="24">
          <div class="pb10 padding-top-20">组织编号</div>
          <el-input
            placeholder="000047"
            v-model="orgInfo.code"
            :readonly="true"
            >
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span="24">
          <div class="pb10 padding-top-20">组织名称</div>
          <el-input
            placeholder="000047"
            v-model="orgInfo.name"
             :readonly="true"
            >
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter='24'>
        <el-col :span="24">
          <div class="pb10 padding-top-20">组织提成（‰ ）</div>
          <el-input
            placeholder=""
            v-model="orgInfo.rate"
            >
          </el-input>
        </el-col>
       </el-row>
      <el-row :span='24' class="option">
        <el-button  type="primary" @click="rateAdd()" class="addOrgRoyalty">添加</el-button>
        <el-button  @click="goBack()" class="goBack">返回</el-button>
      </el-row>
    </div>
    
  </div>
  </template>
<script>
  import { treeList, orgrateAdd } from '../../api/api'
  import {mapMutations} from 'vuex'
  
  export default {
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf',
          disabled: false
        },
        show: true,
        projectId: '130',
        fileList: [],
        // disabled: true,
        dialogVisible: false,
        orgInfo: {
          code: '',
          name: '',
          rate: '',
          id: ''
        },
        importHeaders: ''
      }
    },
    mounted () {
      this.importHeaders= {
        access_id: this.$store.state.userId,
        access_token: this.$store.state.token
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
          console.log(data, node, vuecompent, '3333333')
          if(data.disabled){
            return false
          }else{
            this.show = false
            this.projectId = data.id;
            this.orgInfo.code = data.code;
            this.orgInfo.id = data.id;
            this.orgInfo.name = data.name
          }
         
      },
      // 文件提成
      importBtn() {
        this.fileList = [];
        this.dialogVisible = true;
        // this.$message({
        //   message: '该功能暂未开放',
        //   type: 'warning'
        // });
      },
       handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择1 个文件`);
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
      // 添加提成
      goBack(){
        this.show = !this.show;
      },
      rateAdd() {
        var params = {
          orgId: this.orgInfo.id,
          rate: this.orgInfo.rate
        }
        // console.log(params,'params')
        if(params.rate == ''){
          this.$message({
            message: '请输入正确的通用提成',
            type: 'error'
          });
        }
        var param = JSON.stringify(params)
        orgrateAdd(params).then(
          res => {
            console.log(res,'ree')
            if(res.statusCode == 200){
               this.$message({
                message: '操作成功',
                type: 'success'
              },this.goBack());
            }else{
               this.$message({
                message: '请输入正确的通用提成',
                type: 'error'
              });
            }
          },
          err => {
          this.$message({message:err.message})
          }
        ).catch(
          this.$message({
            message: '请输入正确的通用提成',
            type: 'error'
          }),
          this.orgInfo.rate = ''
        )
      },

     ...mapMutations(['SET_TOKEN_0', 'SET_USER_ID_0'])
    }
  }
</script>

<style >
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
    /* max-height: 480px; */
    height: 100%;
    overflow-y: scroll;
  }
  .el-scrollbar__bar.is-horizontal{
    height: 0px;
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
  .addOrgRoyalty, .goBack{
    width:16%;
  }
  /* .active{
    background-color: #F4F6F8
  } */
.is-leaf + .el-tree-node__label {
background-color: #F4F6F8
}

.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color:white;
}


 

  </style>

