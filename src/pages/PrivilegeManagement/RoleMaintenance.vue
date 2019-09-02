<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色维护</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrap-white mb30 pb30">
      <p class="el-titleText">查找条件</p>
      <el-row :gutter="20" type="flex" align="bottom">
        <el-col :span="12">
          <div class="pb10">查找角色名</div>
          <el-input placeholder="请输入内容" v-model="searchRoleName" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" v-on:click="getRoleManageList()">搜索</el-button>
        </el-col>
        <el-col :span="8">
          <el-button @click="dialogFormVisible = true">新增角色</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="tableData" style="width: 100%" header-align="center">
      <el-table-column prop="roleId" label="角色ID" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名" width="140" align="center"></el-table-column>
      <el-table-column prop="roleRemark" label="组标识" width="140" align="center"></el-table-column>
      <el-table-column prop="roleDisableTag" label="状态" width="100" align="center"></el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="edit(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col class="toolbar">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total"
      ></el-pagination>
    </el-col>

    <!-- 新增角色对话框 -->
    <el-dialog
      title="角色资源组信息"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :lock-scroll="true"
      @close="resetForm('form')"
    >
      <el-form :model="form" ref="form">
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="*角色" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请填写角色"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="说明" prop="roleRemark">
              <el-input v-model="form.roleRemark" placeholder="请填写说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改对话框 -->
    <div style="width:100%;height:100%;">
      <el-dialog class="dialogTable"
        title="角色资源组信息"
        custom-class="handleMoreWrap"
        :visible.sync="dialogTableVisible"
        :append-to-body="true"
        width="50%"
      >
        <el-row class="dialogTableTopTitle">
          <span>角色</span>
          <span>角色状态</span>
        </el-row>
        <el-row class="dialogTableTopInform">
          <span>{{this.dialogTable.roleName}}</span>
          <span>
            <img :src="this.dialogTable.img" @click="changeRoleDisableTag()">
          </span>

          <span>{{this.dialogTable.roleDisableTag}}</span>
        </el-row>

        <el-table :data="dialogTableData" header-align="center" height="300" class="margin-top-20">
          <el-table-column label="资源组" width="200">
            <template slot-scope="scope">
              <!-- 最后一层 -->
              <el-col v-if="scope.row.childFunc == null"><div><span class="space-span"></span>{{scope.row.funcName}}</div></el-col> 
              <!-- 非最后一层 -->
              <el-col v-else ><div><img src="../../images/wenjianjia.png">{{scope.row.funcName}}</div></el-col> 
            </template>
          </el-table-column>
          <el-table-column property="checked" label="授权状态" width="150"></el-table-column>
          <el-table-column property="options" label="操作" >
            <template slot-scope="scope">
              <el-button type="danger"  plain @click.native.prevent="forbidSourse(scope.row.funcId, tableData)"
                v-if="scope.row.checked =='已授权'">禁止</el-button>
              <el-button type="primary" plain @click.native.prevent="authorizeSourse(scope.row.funcId, tableData)"
                v-else-if="scope.row.checked =='未授权'">授权</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  roleManageList,
  roleManageAddNew,
  roleManageEdit,
  roleManageRoleDisable,roleManageRoleEnable,roleManageCancelAuthority,roleManageAddAuthority
} from "../../api/api";
export default {
  data() {
    return {
      total: 0,
      pageCurrent: 1,
      pageSize: "10",
      searchRoleName: "",
      tableData: [],
      dialogTableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      roleId:"",
      form: {
        roleName: "",
        roleRemark: ""
      },
      dialogTable: {
        roleName: "",
        img: "",
        roleDisableTag: "",
        funcId:""
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.pageCurrent = val;
      this.getRoleManageList();
    },
    //搜索
    getRoleManageList() {
      let params = {
        roleName: this.searchRoleName,
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize
      };
      roleManageList(params).then(
        res => {
          this.total = res.data.pagination.itemCount;
          this.tableData = res.data.pagination.list;
          this.roleName = res.data.pagination.list.roleName;
          this.pageCount = res.data.pagination.pageCount;
        },
        reason => {}
      );
    },
    //新增角色按钮
    addRole() {
      if (this.common.isNullOrBlank(this.form.roleName)) {
        this.$message.error("请填写角色");
      } else {
        let params = {
          roleName: this.form.roleName,
          roleRemark: this.form.roleRemark
        };
        roleManageAddNew(params).then(
          res => {
            location.reload();
          },
          reason => {}
        );
      }
    },
    //清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //table修改，弹框
    edit(index, row) {
      this.dialogTableData = [];
      this.dialogTable.funcId = index;
      this.dialogTable.roleName = row.roleName;
      this.dialogTable.roleDisableTag = row.roleDisableTag;
      this.roleId = row.roleId;
      if (row.roleDisableTag == "禁用") {
        this.dialogTable.img = require("../../images/Slide1.png");
      } else {
        this.dialogTable.img = require("../../images/Slide.png");
      }



      roleManageEdit(row.roleId).then(
        item => {
          this.dialogTableVisible = !this.dialogTableVisible;
          this.eachNavList(item.data.pagination.list);
        },
        reason => {}
      );
    },
    eachNavList(origin) {
      // 数组为空直接跳出循环
      if (origin.length <= 0) {
        return false;
      }
      origin.forEach((item, key)=>{
        if (item.childFunc == null) {
          //最后一层
          this.dialogTableData.push(item);
        } else {
          //非最后一层
          this.dialogTableData.push({funcName:item.funcName,childFunc:1})
          this.eachNavList(item.childFunc);
        }
      });
    },
    // 修改角色状态
    changeRoleDisableTag(){   
        if (this.dialogTable.roleDisableTag == "启用") {
          this.$confirm('确定禁用么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.forbidRole();
        }).catch(() => {                
        });
       }else{
         this.$confirm('确定启用么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.startUsingRole();
        }).catch(() => {                
        });
       }
    },
    //禁用
    forbidRole(){
      debugger
        roleManageRoleDisable(this.roleId).then(
          res => {
             this.getRoleManageList();
              this.dialogTableVisible = false;
          },
          reason => {}
        );
    },
    //启用
    startUsingRole(){
        roleManageRoleEnable(this.roleId).then(
          res => {
            this.getRoleManageList();
             this.dialogTableVisible = false;
          },
          reason => {}
        );
    },
    //禁止
    forbidSourse(funcId, tableData){
      console.log(this.roleId,funcId);
       roleManageCancelAuthority(this.roleId,funcId).then(
          res => {
             this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {
                  this.dialogTableVisible = false;
              }
           });
          },
          reason => {}
        );
    },
     //授权
    authorizeSourse(funcId, tableData){
      console.log(this.roleId,funcId);
       roleManageAddAuthority(this.roleId,funcId).then(
          res => {
             this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {
                  this.dialogTableVisible = false;
              }
           });
          },
          reason => {}
        );
    }
  },
  mounted() {
    window.vue = this;
    this.getRoleManageList();
  }
};
</script>

<style scope>
.dialogTableTopTitle {
  font-size: 12px;
}
.dialogTableTopTitle span,
.dialogTableTopInform span {
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 30px;
}
.dialogTableTopInform {
  font-size: 15px;
}
.dialogTableTopInform img {
  height: 30px;
  vertical-align: middle;
}
.dialogTable table img{
  width: 20px;
  vertical-align: middle;
  padding: 0 10px 6px 0;
}
.el-dialog .cell button{padding: 5px 8px;}
.el-dialog .space-span{display: inline-block;width: 32px;}
</style>

