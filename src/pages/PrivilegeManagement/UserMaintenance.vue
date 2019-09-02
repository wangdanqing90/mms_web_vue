<template>
  <div class="margin-bottom-240">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户维护</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrap-white mb30 pb30">
      <p class="el-titleText">查找条件</p>
      <el-row :gutter="20" type="flex" align="bottom">
        <el-col :span="8">
          <div class="pb10">账户名:</div>
          <el-input
            placeholder="请输入账户名"
            v-model="salesName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="pb10">手机号:</div>
          <el-input
            placeholder="请输入手机号"
            v-model="phoneNo"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="getTableData()">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;"
    >
      <el-table-column
        prop="salesCode"
        label="账户ID"
        width="110"
      >
      </el-table-column>
      <el-table-column
        prop="salesName"
        label="账户名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="phoneNo"
        label="手机号"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="zubiaoshi"
        label="组标识"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="130"
      >
        <template slot-scope="scope">
          <font v-if="scope.row.status === '在职'">在职</font>
          <font v-else color='#7F8FA4'>已离职</font>
        </template>
      </el-table-column>
      <!-- fixed="right" -->
      <el-table-column
        label="操作"
        prop='status'
        width="130"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="modify(scope.$index, tableData)"
            type="text"
            size="small"
            width="130">
            修改
          </el-button>
          <el-button
            @click.native.prevent="reserPassword(scope.$index, tableData)"
            type="text"
            size="small"
            width="130"
            v-if="scope.row.status === '在职'">
            重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col class="toolbar">
      <el-pagination
        background
        layout="prev, pager, next" @current-change="handleCurrentChange" :total="total">
      </el-pagination>
    </el-col>
    <!-- 对话框 -->
    <div style="width:100%;height:100%;">
      <el-dialog title="账户信息" custom-class="handleMoreWrap" :visible.sync="dialogTableVisible"  :append-to-body="true" width="70%">
      <h5>账户名：<span>test110</span></h5>
      <el-table :data="gridData">
        <el-table-column property="roleName" label="权限组" width="150"></el-table-column>
        <el-table-column property="userRefStatus" label="授权状态" width="200"></el-table-column>
        <el-table-column property="options" label="操作">
           <template slot-scope="scope">
              <el-button
                type= "primary"
                size="mini"
                width="130"
                @click.native.prevent="authorizeSourse(scope.row.roleId, tableData)"
                v-if="scope.row.options != '1'"
                >
                授权
              </el-button>
               <el-button
                type= "primary"
                size="mini"
                width="130"
               v-else
               disabled="disabled"
                >
                授权
              </el-button>
              <el-button
                type="primary"
                size="mini"
                width="130"
                 @click.native.prevent="forbidSourse(scope.row.roleId, tableData)"
                 v-if="scope.row.options == '1'"
                >
                禁止
              </el-button>
              <el-button
                type="primary"
                size="mini"
                width="130"
                v-else
                disabled="disabled"
                >
                禁止
              </el-button>
            </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    </div>
    <!-- 提示框 -->

  </div>
</template>
<script>
 import { mapMutations } from 'vuex'

  // 引入接口
  import {userQuerySales, userQueryRoles, roleAdd, roleCancel,resetPassword   } from '../../api/api'
  export default {
    created () {
      this.getTableData();
    },
    data () {
      return {
        // msg: '用户维护',
        tableData: [],
        loading: true,
        total: 0,
        pageCurrent: 1,
        pageSize: '10',
        salesName: '',
        phoneNo: '',
        salesCode: '',
        status: '',
        gridData: [],
        dialogTableVisible: false,
        salesIdCurrent:'' // 点击修改时的id
      }
    },
    methods: {
      getTableData () {
        const param = {
          'salesName': this.salesName,
          'phoneNo': this.phoneNo,
          'salesCode': this.salesCode,
          'status': this.status,
          'pageSize': this.pageSize,
          'pageCurrent': this.pageCurrent
        }
        userQuerySales(param).then(
          res => {
            this.total = res.data.itemCount
            // console.log(res,101010)
            this.tableData = res.data.list.map(
              i => {
                var status = '';
                if(i.status == 'Z'){
                    status = '在职'
                }else {
                  status = '已离职';
                }
                var zubiaoshiArr = [];
                i.roles.forEach(item => {
                  zubiaoshiArr.push(item.roleName)
                });
                return Object.assign({}, i, {
                  salesCode: i.salesCode,
                  salesName: i.salesName,
                  phoneNo: i.phoneNo,
                  zubiaoshi: zubiaoshiArr.join(','),
                  status: status,
                  roleId: i.roleId
                  
                })
              }
            )
          },
          err => {
            console.log(err);
          }
        )
      },
      handleCurrentChange(val) {
        this.pageCurrent = val
        this.getTableData()
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      // 修改
      modify(index, tableData) {
       this.salesIdCurrent = tableData[index].salesId
        const param = {
          'salesId': tableData[index].salesId
        }
        userQueryRoles(param).then(
          res => {
            this.dialogTableVisible = !this.dialogTableVisible;
            this.gridData = res.data.data.map(
            i => {
              var userRef = '';
              if(i.userRefStatus == '1'){
                userRef = '已授权';
              }else{
                userRef = '未授权'
              }
              return Object.assign({}, i, {
                roleName: i.roleName,
                userRefStatus: userRef,
                options: i.userRefStatus,
                roleId: i.roleId
              })
            }
          ) 
          },
            
          err => {
            this.$message({
                message: '此人已离职',
                type: 'error'
              });
          }
        )
      },
      // 授权
      authorizeSourse(roleId, tableData) {
         const param = {
          'salesId':this.salesIdCurrent,
          'roleId': roleId
        }

        roleAdd(param.roleId, param.salesId).then(
          res => {
            if(res.data.result == true){
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.dialogTableVisible = false
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      // 禁止授权
      forbidSourse(roleId, tableData){
        // alert(1)
        const param = {
          'salesId':this.salesIdCurrent,
          'roleId': roleId
        }
        roleCancel(param.roleId, param.salesId).then(
          res => {
            if(res.data.result == true){
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.dialogTableVisible = false
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      // 重置密码
      reserPassword(index, tableData){
        this.salesIdCurrent = tableData[index].salesId
        this.$confirm('确定重置密码吗?', '提示', {
          type: ''
        }).then(() => {
            const param = {
              'salesId': tableData[index].salesId
            }
          resetPassword(param).then(
            res => {
            //NProgress.done();
              this.$message({
                message: '密码重置成功',
                type: 'success'
              });
          });
        }).catch(() => {
          console.log("重置失败")
        })
      }
      //  ...mapMutations(['SET_TOKEN_0', 'SET_USER_ID_0'])
    },
    components: {
    }
  };
</script>
<style>
  .el-table .cell{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .el-table__body-wrapper{
    max-height:380px;
    overflow: auto;
  }
</style>
