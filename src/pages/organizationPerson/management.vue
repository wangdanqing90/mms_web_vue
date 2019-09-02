<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>组织与人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrap-white margin-bottom-10 pb30">
      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">人员姓名:</div>
          <el-input
            placeholder="请输入人员姓名"
            v-model="salesName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="pb10">系统编号:</div>
          <el-input
            placeholder="请输入系统编号"
            v-model="salesCode"
            type="number"
            clearable>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">联系方式:</div>
          <el-input
            placeholder="请输入联系方式"
            v-model="phoneNo"
            type="number"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="pb10">组织名称:</div>
          <el-input
            placeholder="请输入名称"
            v-model="salesOrgName"
            clearable>
          </el-input>
        </el-col>
      </el-row>
      <p class="padding-top-20">
        <el-button type="primary" icon="el-icon-search" v-on:click="tableDataList">搜索</el-button>
      </p>
    </div>
      <el-table
        :data="tableData"
        style="width: 100%" header-align="center">
        <el-table-column
          prop="salesCode"
          label="系统编号"
          min-width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="salesName"
          label="人员姓名"
          min-width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="salesNum"
          label="员工编号"
          min-width="160"
          align="center">
        </el-table-column>

        <el-table-column
          prop="phoneNo"
          label="联系方式	"
          min-width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="salesOrgName"
          label="所属组织"
          min-width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="customCount"
          label="客户数"
          min-width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="80"
          align="center">
          <template slot-scope="scope">
            <div> {{ scope.row.status=='Z'? '在职':'离职' }}</div>
          </template>

        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="160"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="detail(scope.$index, scope.row)"
              type="text" >详情
            </el-button>
            <el-button
              size="mini"
              @click="edit(scope.$index, scope.row)"
              type="text" >修改
            </el-button>
            <el-button
              size="mini"
              v-if="scope.row.status=='Z'"
              @click="dimissionChange(scope.$index, scope.row)"
              type="text" >离职
            </el-button>
            <el-button
              size="mini"
              v-else
              type="text"
              disabled
            >离职
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="toolbar">
        <el-pagination
          background
          layout="prev, pager, next" @current-change="handleCurrentChange" :total="total">
        </el-pagination>
        <div class="center padding-top-35">
          <el-row   type="flex" class="row-bg" justify="space-around">
            <el-col :span="8"> <el-button type="primary"  @click="add">新增人员</el-button></el-col>
            <el-col :span="8"><el-button plain type="primary" @click="importFile">人员批量导入</el-button></el-col>
            <el-col :span="8"><el-button plain type="primary" @click="uploadFile">模板下载</el-button></el-col>
          </el-row></div>
      </div>


    <!--弹层-->
    <el-dialog title="职位状态" custom-class="handleMoreWrap" :visible.sync="dimissionVisible" :append-to-body="true"
               width="200">
      <p>确认更改在职状态?</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dimissionStatus">确定</el-button>
        <el-button @click="dimissionVisible = false">返回</el-button>
      </div>
    </el-dialog>

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
        action="/api/sales/import"
        multiple
        :limit="1"
        :headers="importHeaders"
        :on-exceed="handleExceed"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        name='salesFile'
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

<style>

</style>

<script>
  import {managementList ,  managementLeave} from '../../api/api'
  export default {
    data() {
      return {
        importHeaders:   {
        access_id: this.$store.state.userId,
        access_token: this.$store.state.token
       },
        salesOrgName:'',
        phoneNo:'',
        salesCode:'',
        salesName:'',
        salesNum:'',
        tableData: [],
        total: 0,
        pageCurrent: 1,
        pageSize: '10',
        dimissionVisible:false,
        rowId:'',
         dialogVisible: false,
      }
    },
    methods:{
      detail(index,row) {
        this.$router.push({path: '/listDetail', query: {type:1,id:row.salesId,}})
      },
      edit(index,row) {
        this.$router.push({path: '/listDetail', query: {type:2,id:row.salesId,}})
      },
      add() {
        this.$router.push({path: '/listDetail' })
      },
      tableDataList() {
        let param = {
          salesOrgName: this.salesOrgName,
          phoneNo: this.phoneNo,
          salesCode: this.salesCode,
          salesName: this.salesName,
          pageCurrent: this.pageCurrent,
          pageSize: this.pageSize,
        }
        managementList(param).then(data => {
          let res = data.data
          this.total = res.itemCount
          this.tableData = res.list
        })
      },
      handleCurrentChange(val) {
        this.pageCurrent = val
        this.tableDataList()
      },
      dimissionStatus() {
        let param ={
          salesId:this.rowId,
          status:'L'
        }
        managementLeave(param).then(data =>{
          if(data.statusCode === 200) {
            this.tableDataList()
            this.dimissionVisible=false
          } else {
            this.$message.error(data.message);
          }
        }, (reason) => {
        })
      },
      dimissionChange(index, row) {
        this.dimissionVisible=true
        this.rowId= row.salesId
      },
      importFile(){
        this.dialogVisible =true;
      },
      clearFiles(){
        this.dialogVisible = false;
        this.$refs.upload.clearFiles();
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
      //下载
      uploadFile(num) {
        window.open("/api/sales/export?access_token="+this.$store.state.token+"&access_id="+this.$store.state.userId );
      },
    },

    mounted(){
      this.tableDataList()
    }
  }
</script>
