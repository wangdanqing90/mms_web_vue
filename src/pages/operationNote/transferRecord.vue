<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>操作记录</el-breadcrumb-item>
      <el-breadcrumb-item>业绩变更记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      :data="tableData"
      style="width: 100%"
      header-align="center"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        min-width="160"
        label="创建日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="submitName"
        label="申请人"
        min-width="130"
        align="center">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="转移开始时间"
        min-width="160"
        align="center">
      </el-table-column>
      <el-table-column
        prop="endTime"
        min-width="160"
        label="转移结束时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="transferSalesName"
        label="转移人名称"
        min-width="160"
        align="center">
      </el-table-column>
      <el-table-column
        prop="transferOrgName"
        min-width="170"
        label="转移组织名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="receiveSalesName"
        min-width="140"
        label="接受人名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="receiveOrgName"
        min-width="180"
        label="接收组织名称"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        min-width="120"
        prop="checkerName"
        label="审核人姓名"
        align="center">
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="performanceTable" />
  </div>
</template>
<style>
  .text {
    font-size: 12px;
  }
</style>

<script>
  import Pagination from '../../components/Pagination'
  import {getPerformance} from '../../api/api'

  export default {
    components: { Pagination },
    data() {
      return {
        tableData: [],
        total: 0,
        listQuery: {
          page: 1,
          limit: 6
        }
      }
    },
    methods: {
        async performanceTable() {
        let params = {
          pageCurrent: this.listQuery.page,
          pageSize: this.listQuery.limit
        }
        const data = await getPerformance(params)
        let res = data.data
        this.tableData = res.list
          this.total = res.itemCount;
          this.page = res.pageCount
      }
    },
    mounted() {
      this.performanceTable()
    }
  }
</script>
