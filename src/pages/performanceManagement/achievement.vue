<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>业绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工业绩统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrap-white padding-top-15 padding-bottom-10 margin-bottom-10">
      <el-radio-group v-model="radio1" style="width: 100%" @change="changeRadio" class="achievement">
        <el-radio-button label="理财业绩"></el-radio-button>
        <el-radio-button label="基金业绩"></el-radio-button>
        <el-radio-button label="小贷业绩"></el-radio-button>

      </el-radio-group>
      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">业绩时段范围:</div>
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            unlink-panels
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="~ "
            start-placeholder="开始时间（00:00:00））"
            end-placeholder="结束时间（00:00:00"
            style="width: 100%">
          </el-date-picker>
        </el-col>
        <el-col :span="12">
          <div class="pb10">员工姓名:</div>
          <el-input
            placeholder="员工姓名"
            v-model="salesName"
            clearable>
          </el-input>
        </el-col>


      </el-row>
      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">员工编号:</div>
          <el-input
            placeholder="员工编号"
            v-model="salesCode"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="pb10">手机号:</div>
          <el-input
            placeholder="手机号"
            type="number"
            v-model="phone"
            clearable>
          </el-input>
        </el-col>

      </el-row>
      <p class="padding-top-20">
        <el-button type="primary" icon="el-icon-search" @click="searchBtn(radio1)">搜索</el-button>
      </p>
    </div>
    <el-table
      :data="tableList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="（部门）团队|门店"
        min-width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="salesCode"
        label="人员编号"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="salesName"
        label="姓名"
        min-width="130"
        align="center">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        min-width="130"
        align="center">
      </el-table-column>
      <el-table-column
        prop="totalPerformance"
        label="业绩总量（万元）"
        min-width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="expect"
        label="预期提成（元）"
        min-width="150"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="80"
        align="center">

        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text" @click="handleMore(scope.row.id)">详情
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
    <!--详情-->
    <el-dialog title="详情" custom-class="handleMoreWrap" :visible.sync="moreVisible" :append-to-body="true" width="70%">

    </el-dialog>
  </div>
</template>

<style>
  .el-radio-button__inner {
    width: 100%;
    border-color: #409EFF;
  }

  .el-radio-button:first-child .el-radio-button__inner {
    border-color: #409EFF;

  }
</style>

<script>
  import {getStaffPerformance} from '../../api/api'

  export default {
    data() {
      return {
        radio1: '理财业绩',
        total: 0,
        pageCurrent: 1,
        pageSize: 10,
        dateTime: '',
        phone: '',
        salesCode: '',
        salesName: '',
        startDate: '',
        endDate: '',
        tableList: [],
        moreVisible: false,
      }
    },

    methods: {
      searchBtn(radio1) {
        if (radio1 == '基金业绩') {
          this.fundData()
          console.log('基金业绩')
        } else if (radio1 == '小贷业绩') {
          this.SmalLoans()
          console.log('小贷业绩')
        } else {
          this.tableData()
          console.log('理财业绩')
        }

      },
      tableData() {
        let params = {
          pageCurrent: this.pageCurrent,
          pageSize: 10,
          phone: this.phone,
          salesCode: this.salesCode,
          salesName: this.salesName,
          startDate: this.dateTime ? this.dateTime[0] : '',
          endDate: this.dateTime ? this.dateTime[1] : '',
        }
        getStaffPerformance(params).then(data => {
          let res = data.data
          if (data.statusCode == 200 && res !== undefined) {
            this.tableList = res.list
            this.total = res.itemCount
          }
        }, (reason) => {
        })

      },
      //        基金业绩
      fundData() {
        let params = {
          pageCurrent: this.pageCurrent,
          pageSize: 10,
          phone: this.phone,
          salesCode: this.salesCode,
          salesName: this.salesName,
          startDate: this.dateTime ? this.dateTime[0] : '',
          endDate: this.dateTime ? this.dateTime[1] : '',
        }
        this.tableList = []
        this.total = 10
      },
//      小贷
      SmalLoans() {
        this.tableList = []
        this.total = 10
      },

      changeRadio(val) {
        this.phone = '',
        this.salesCode = '',
        this.salesName = '',
        this.dateTime = ''
        if (val === '基金业绩') {
          this.fundData()
        } else if (val === '小贷业绩') {
          this.SmalLoans()
        } else {
          this.tableData()
        }
      },
      handleCurrentChange(val) {
        this.pageCurrent = val
        this.tableData()
      },
      handleMore(row) {
        this.moreVisible = true
      },
    },

    mounted(id) {
      this.tableData()
    }
  }
</script>
