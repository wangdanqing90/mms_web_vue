<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>操作记录</el-breadcrumb-item>
      <el-breadcrumb-item>系统操作记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrap-white mb30 pb30">
      <p class="el-titleText">查找条件</p>

      <el-row :gutter="20">
        <el-col :span="12">
          <div class="pb10">操作人:</div>
          <el-input
            placeholder="请输入姓名或编号"
            v-model="operator"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="pb10">事件id:</div>
          <el-input
            placeholder="请输入事件id"
            v-model="eventId"
            clearable>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="pb10 padding-top-20">业务类型:</div>
          <el-select v-model="code" style="width: 100%">
            <el-option value="" label="全部类型"></el-option>
            <el-option
              v-for="item in type"
              :key="item.code"
              :label="item.desc"
              :value="item.code">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <div class="pb10 padding-top-20">创建时间:</div>
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%">
          </el-date-picker>
        </el-col>
      </el-row>
      <p class="padding-top-20">
        <el-button type="primary" icon="el-icon-search" v-on:click="sysLogSearchTable()">搜索</el-button>
      </p>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%" header-align="center">
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="160"
        align="center">
      </el-table-column>
      <el-table-column
        prop="eventId"
        label="事件id"
        min-width="300"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作人编号 | 操作人姓名"
        min-width="170"
        align="center">
        <template slot-scope="scope">
          {{scope.row.operatorCode}} | {{scope.row.operatorName}}
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="业务类型"
        min-width="190"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作记录"
        width="80"
        fixed="right"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text" @click="handleMore(scope.row.id)">详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="sysLogSearchTable" />

    <!--详情-->
    <el-dialog title="记录详情" custom-class="handleMoreWrap" :visible.sync="moreVisible" :append-to-body="true"
               width="80%">

      <el-row :gutter="20" class="handleMore-title">
        <el-col :span="12">
          <div class="grid-content">原值</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">新值</div>
        </el-col>

      </el-row>
      <div class="handleMoreHeight">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content" style="white-space: pre; line-height: 2;">
              <div style=" white-space: pre-wrap;">{{oldValue}}</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content" style="white-space: pre;line-height: 2; ">
              <div style=" white-space: pre-wrap;">{{newValue}}</div>
            </div>
          </el-col>

        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="moreVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>

</style>

<script>
  import {getSysLogSearch, getSearchEnums, sysLogDetails} from '../../api/api'
  import Pagination from '../../components/Pagination'
  export default {
    components: { Pagination },
    data() {
      return {
        operator: null,
        eventId: null,
        operateStartDate: null,
        operateEndDate: null,
        type: null,
        code: '',
        tableData: [],
        moreVisible: false,
        oldValue: null,
        newValue: null,
        statusList: null,
        dateTime: null,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        }
      }
    },
    methods: {
      //详情弹层
      async handleMore(id) {
        this.moreVisible = true
        let data = await sysLogDetails(id)
        let item = data.data
        this.newValue = item.newValue == "" || (item.newValue == null) ? "" : JSON.stringify(JSON.parse(item.newValue), null, 4)
        this.oldValue = item.oldValue == "" || (item.oldValue == null) ? "" : JSON.stringify(JSON.parse(item.oldValue), null, 4)

      },
      handleCurrentChange(val) {
        this.pageCurrent = val
        this.sysLogSearchTable()
      },
      async sysLogSearchTable() {
        let params = {
          pageCurrent: this.listQuery.page,
          pageSize: this.listQuery.limit,
          operator: this.operator,
          eventId: this.eventId,
          operateStartDate: this.dateTime ? this.dateTime[0] : '',
          operateEndDate: this.dateTime ? this.dateTime[1] : '',
          type: this.code
        }
        let data = await getSysLogSearch(params)
        let res = data.data
        this.tableData = res.list
        this.total = res.itemCount;
        this.page = res.pageCount
      },
      async searchEnumsOptions() {
        let data = await getSearchEnums()
        let res = data.data
        this.type = res.typeList
      }
    },

    mounted() {
      this.searchEnumsOptions()
      this.sysLogSearchTable()
    }
  }
</script>
