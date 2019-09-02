<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="wrap-white mb30">
      <el-row  class="padding-top-20 padding-bottom-20 title">
        <div class="title-left" >查找条件</div>
        <div class="title-right" @click="hideOrShow()"  v-html='selectHtml'></div>
      </el-row>

      <el-row v-show="titleShow">
      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">起息范围:</div>
          <el-date-picker
            v-model="valueDateTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions" style="width: 100%">
          </el-date-picker>
        </el-col>

        <el-col :span="12">
          <div class="pb10">创建日期:</div>
          <el-date-picker
            v-model="createDateTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions" style="width: 100%">
          </el-date-picker>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">产品名称:</div>
          <el-input
            placeholder="请输入提成名称"
            v-model="productName"
            clearable>
          </el-input>
        </el-col>

        <el-col :span="12">
          <div class="pb10">利率:</div>
          <el-input
            placeholder="请输入利率"
            v-model="interestRate"
            clearable>
          </el-input>
        </el-col>
      </el-row>

       <el-row :gutter="20" class="padding-top-20">
          <el-col :span="12">
          <div class="pb10">起投金额:</div>
          <el-input class='money-input'
            placeholder=""
            v-model="minInvestAmountLower"
            clearable>
          </el-input>
          <div class="pb10 money-line">-</div>
          <el-input  class='money-input'
            placeholder=""
            v-model="minInvestAmountUpper"
            clearable>
          </el-input>
        </el-col>


          <el-col :span="12">
          <div class="pb10">销售渠道:</div>
          <el-select v-model="outerSystem" style="width: 100%">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in outerSystemList"
              :key="item.code"
              :label="item.desc"
              :value="item.code">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">来源方式:</div>
          <el-select v-model="isManual" style="width: 100%">
            <el-option value="" label="全部"></el-option>
            <el-option value="true" label="补录"></el-option>
            <el-option value="false" label="非补录"></el-option>
          </el-select>
        </el-col>

        <el-col :span="12">
          <div class="pb10">状态:</div>
          <el-select v-model="status" style="width: 100%">
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

      <p class="padding-top-20  pb30">
        <el-button type="primary" icon="el-icon-search" @click="productListSearch()">搜索</el-button>
      </p>
      </el-row>
    </div>


    <el-table @row-click="openDetails"
      :data="tableData"
      style="width: 100%">
       <el-table-column
        label="创建日期"
        align="center"
        min-width="120" >
        <template slot-scope="scope">
          {{scope.row.createDate?scope.row.createDate.substring(0,10):scope.row.createDate}}
        </template>
      </el-table-column>

      <el-table-column
        prop="productCode"
        label="产品编号"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="利率"
        align="center"
        min-width="80"
      >
        <template slot-scope="scope">
          {{scope.row.interestRate}}%
        </template>
      </el-table-column>

      <el-table-column
        prop="totalAmount"
        min-width="150"
        align="center"
        label="发行规模（元）">
      </el-table-column>

      <el-table-column
        label="募集开始日"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          {{scope.row.raiseStartDate?scope.row.raiseStartDate.substring(0,10):scope.row.raiseStartDate}}
        </template>
      </el-table-column>

      <el-table-column
        label="募集结束日"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          {{scope.row.raiseEndDate?scope.row.raiseEndDate.substring(0,10):scope.row.raiseEndDate}}
        </template>
      </el-table-column>

      <el-table-column
        prop="durationDays"
        min-width="100"
        align="center"
        label="存续期（天）">
      </el-table-column>

      <el-table-column
        label="起息日"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          {{scope.row.valueDate?scope.row.valueDate.substring(0,10):scope.row.valueDate}}
        </template>
      </el-table-column>

      <el-table-column
        label="兑付日"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          {{scope.row.repayDate?scope.row.repayDate.substring(0,10):scope.row.repayDate}}
        </template>
      </el-table-column>

      <el-table-column
        prop="minInvestAmount"
        min-width="150"
        align="center"
        label="起投金额（元）">
      </el-table-column>
      <el-table-column
        prop="maxInvestAmount"
        min-width="150"
        align="center"
        label="投资最高份额（元）">
      </el-table-column>
      <el-table-column
        prop="repayMethod"
        min-width="120"
        align="center"
        label="还款方式">
      </el-table-column>
      <el-table-column
        prop="riskType"
        min-width="100"
        align="center"
        label="风险类型">
      </el-table-column>
      <el-table-column
        prop="outerSystem"
        min-width="100"
        align="center"
        label="销售渠道">
      </el-table-column>
       <el-table-column
        label="来源方式"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          {{scope.row.isManual?'补录':'非补录'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        min-width="100"
        align="center"
        label="产品状态">
      </el-table-column>
    </el-table>

    <el-col class="toolbar">
      <el-pagination
        background
        layout="prev, pager, next" @current-change="handleCurrentChange" :total="total">
      </el-pagination>
    </el-col>
  </div>
</template>


<script>
  import {
    productSearch,
    getProductList ,
    orderGetEnums,
    productGetProductEnums
  } from '../../api/api'

  export default {
    data() {
      return {
        pickerOptions: {},
        tableData: [],
        total: 0,
        pageCurrent: 1,
        pageSize: 10,
        activityName:'',
        createName:'',
        dateTime:'',
        multipleSelection: [],
        valueDateTime: '',
        createDateTime: '',
        productName: '',
        outerSystemList: [],
        statusList: [],
        isManual: '',
        status: '',
        outerSystem:'',
        minInvestAmountLower: '',
        minInvestAmountUpper: '',
        interestRate:'',
        titleShow:true,
        selectHtml:"收起  <i class='el-icon-arrow-down'></i>"
      }
    },
    methods: {
      //翻页
      handleCurrentChange(val) {
        this.pageCurrent = val
        this.productListSearch()
      },
      //下拉框
      searchTypeOptions() {
        //销售列表下拉框
        orderGetEnums().then((res) => {
          this.outerSystemList = res.data.outerSystemList
        },(reason) => {})

        //产品状态下拉框
        productGetProductEnums().then((res) => {
          this.statusList = res.data.statusList
        },(reason) => {})

      },

      //默认初始化table
      productListInit() {
         let params = {
		      pageSize: this.pageSize,
		      pageCurrent: this.pageCurrent
        }
        getProductList(params).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.itemCount;
          this.pageCount = res.data.pageCount;
        },(reason) => {})
      },
      productListSearch() {
        let valueStartDate = this.valueDateTime?this.valueDateTime[0]:'';
        let valueEndDate = this.valueDateTime?this.valueDateTime[1]:'';

        let createStartDate = this.createDateTime?this.createDateTime[0]:'';
        let createEndDate = this.createDateTime?this.createDateTime[1]:'';

        let daysvalue = this.common.DateDiff(valueStartDate,valueEndDate);
        let dayscreate = this.common.DateDiff(createStartDate,createEndDate);
        if(daysvalue>180||dayscreate>60){
          this.$alert('起息范围间隔不得大于180天，创建日期间隔不得大于60天。', '提示', {
          confirmButtonText: '确定',
          showClose: false
         });
	      return;
      	}
         let params = {
		      valueStartDate:valueStartDate,
		      valueEndDate:valueEndDate,
		      productName:this.productName,
		      interestRate:this.interestRate,
		      createStartDate:createStartDate,
	      	createEndDate:createEndDate,
		      minInvestAmountLower: this.minInvestAmountLower,
		      minInvestAmountUpper:this.minInvestAmountUpper,
		      outerSystem: this.outerSystem,
		      isManual: this.isManual,
          status: this.status,
		      pageSize: this.pageSize,
		      pageCurrent: this.pageCurrent
        }
        productSearch(params).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.itemCount;
          this.pageCount = res.data.pageCount;
        },(reason) => {})
      },
      //跳转
      openDetails(row, event, column) {
        this.$router.push({path: 'productPatch', query: {id:row.id,type:1}})
      },
      //初始化创建日期
      initCreatDate(){
        var now = new Date();
        var startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()-7)).toISOString().slice(0, 10);
        var endDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10);
        this.createDateTime=[];
        this.createDateTime.push(startDate);
        this.createDateTime.push(endDate);
      },
      //顶部搜索条件隐藏或显示
      hideOrShow(){
        this.titleShow=!this.titleShow;
        if(this.titleShow){
          this.selectHtml="收起  <i class='el-icon-arrow-down'></i>"
        }else{
          this.selectHtml="打开  <i class='el-icon-arrow-up'></i>"
        }
      }
    },
    computed: {
    },
    mounted() {
      window.vue = this;
      this.initCreatDate();
      this.searchTypeOptions();
      this.productListInit();
      this.productListSearch();

    }
  }
</script>


<style scope>
.money-input{width: 45%;}
.money-line{display:inline-block; width: 8%; text-align: center;}
.title-left{float:left;font-size: 20px;color: black;}
.title-right{float:right;padding: 5px;cursor: pointer;}
</style>

