<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>审核管理</el-breadcrumb-item>
      <el-breadcrumb-item>组织审核</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrap-white margin-bottom-10 pb30">
      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">提交人:</div>
          <el-input
            placeholder="请输入姓名"
            v-model="operator"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="pb10">创建时间:</div>
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%">
          </el-date-picker>
        </el-col>

      </el-row>
      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">业务类型:</div>
          <el-select v-model="type" style="width: 100%">
            <el-option value="" label="全部类型"></el-option>
            <el-option
              v-for="item in checkTypeList"
              :key="item.code"
              :label="item.desc"
              :value="item.code">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <div class="pb10">状态:</div>
          <el-select v-model="code" style="width: 100%">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in statusList"
              :key="item.code"
              :label="item.desc"
              :value="item.code">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <p class="padding-top-20">
        <el-button type="primary" icon="el-icon-search" @click="organizCheckSearch()">搜索</el-button>
      </p>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="operatorName"
        label="提交人"
        align="center"
        min-width="130">
      </el-table-column>
      <el-table-column
        prop="operatorCode"
        label="人员编号"
        align="center"
        min-width="130">
      </el-table-column>
      <el-table-column
        prop="type"
        :formatter="common.organizType"
        label="业务类型"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="status"
        :formatter="common.convertStatus"
        label="状态"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        width="80"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text" @click="handleMore(scope.$index, scope.row)">详情
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
    <!--弹层详情-->
    <el-dialog title="审核信息详情" custom-class="handleMoreWrap" :visible.sync="moreVisible" :append-to-body="true"
               width="70%">
      <div class="handleMoreHeight">
        <el-table
          :data="tableDataMore"
          style="width: 100%; ">
          <el-table-column
            prop="createTime"
            label="申请日期"
            align="center"
            min-width="160">
          </el-table-column>
          <el-table-column
            prop="operatorName"
            label="申请人"
            align="center"
            min-width="120">
          </el-table-column>
          <el-table-column
            label="组织原状态"
            align="center"
            min-width="220">
            <template slot-scope="scope">
              {{scope.row.orgName}} | {{scope.row.originalOrgStatus}}
            </template>
          </el-table-column>
          <el-table-column
            prop="currentOrgStatus"
            align="center"
            label="组织新状态"
            min-width="220">
            <template slot-scope="scope">
              {{scope.row.orgName}} | {{scope.row.currentOrgStatus}}
            </template>
          </el-table-column>

          <el-table-column
            prop="originalOrgStatus"
            :formatter="common.convertStatus"
            label="状态"
            align="center"
            fixed="right"
            width="90">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resolve" v-show="isShow">审核通过</el-button>
        <el-button @click="moreVisible = false">返回</el-button>
        <el-button type="danger" @click="reject" v-show="isShow">驳回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    organizCheckSelect,
    organizCheckSearch,
    organizCheckDetails,
    orgCheckCheckPass,
    orgCheckCheckRefuse
  } from '../../api/api'

  export default {
    data() {
      return {
        code: '',
        tableData: [],
        total: 0,
        pageCurrent: 1,
        pageSize: 10,
        operator: null,
        startTime: null,
        endTime: null,
        status: null,
        statusList: '',
        tableDataMore: [],
        moreVisible: false,
        rowId: null,
        isShow: true,
        isreject: true,
        checkTypeList: null,
        type: '',
        checkType: null,
        dateTime: null
      }
    },
    methods: {
      async searchTypeOptions() {
        const data = await organizCheckSelect()
        const res = data.data
        this.common.errorHandle(data, () => {

          this.statusList = res.statusList
          this.checkTypeList = res.checkTypeList
          this.checkType = res.checkTypeList.code
        })
      },
      async organizCheckSearch() {
        let params = {
          pageCurrent: this.pageCurrent,
          pageSize: this.pageSize,
          operator: this.operator,
          startTime: this.dateTime ? this.dateTime[0] : '',
          endTime: this.dateTime ? this.dateTime[1] : '',
          status: this.code,
          checkType: this.type
        }
        const data = await organizCheckSearch(params)
        const res = data.data
        this.common.errorHandle(data, () => {
          this.total = res.itemCount
          this.tableData = res.list
        })
      },
      handleCurrentChange(val) {
        this.pageCurrent = val
        this.organizCheckSearch()
      },
      async handleMore(index, row) {
        this.moreVisible = true
        this.rowId = row
        if (row.status == 'PASS' || row.status == 'REFUSED') {
          this.isShow = false
        } else {
          this.isShow = true
        }
        const data = await organizCheckDetails(row.id)
        this.common.errorHandle(data, () => {
          this.tableDataMore = data.data
        })
      },
      resolve() {
        this.$confirm('确认审核通过?', '提示', {
          type: 'success'
        }).then(() => {
          let rowId = this.rowId.id
          orgCheckCheckPass(rowId).then((data) => {
            let res = data.data
            this.moreVisible = false
            //NProgress.done();
            this.$message({
              message: '审核通过成功',
              type: 'success'
            });
            this.organizCheckSearch();
          });
        }).catch(() => {
          console.log("审核通过的错误信息返回")
        })
      },
      reject() {
        this.$confirm('确认驳回吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let rowId = this.rowId.id
          orgCheckCheckRefuse(rowId).then((data) => {
            let res = data.data
            this.moreVisible = false
            this.$message({
              message: '驳回成功',
              type: 'warning'
            });
            this.organizCheckSearch();
          });
        }).catch(() => {
          console.log("审核驳回的错误信息返回")
        })
      },
    },
    mounted() {
      this.searchTypeOptions()
      this.organizCheckSearch()
    }
  }
</script>
