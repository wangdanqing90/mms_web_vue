<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>销售订单管理列表</el-breadcrumb-item>
      <el-breadcrumb-item>理财订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="wrap-white mb30">
      <el-row  class="padding-top-20 padding-bottom-20 title">
        <div class="title-left" >查找条件</div>
        <div class="title-right" @click="hideOrShow()"  v-html='selectHtml'></div>
      </el-row>

      <el-row v-show="titleShow">
       <el-row :gutter="20" class="padding-top-20">
          <el-col :span="12">
          <div class="pb10">订单时间:</div>
          <el-date-picker
            v-model="orderDateTime"
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
          <div class="pb10">起息日:</div>
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
       </el-row>

      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">产品名称:</div>
          <el-input
            placeholder="请输入产品名称"
            v-model="productName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="pb10">兑付日:</div>
          <el-date-picker
            v-model="repayDateTime"
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
          <div class="pb10">来源方式:</div>
          <el-select v-model="isManual" style="width: 100%">
            <el-option value="" label="全部"></el-option>
            <el-option value="true" label="补录"></el-option>
            <el-option value="false" label="非补录"></el-option>
          </el-select>
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
          <div class="pb10">客户姓名:</div>
          <el-input
            placeholder="请输入客户姓名"
            v-model="customerName"
            clearable>
          </el-input>
        </el-col>
         <el-col :span="12">
          <div class="pb10">注册手机号码:</div>
          <el-input
            placeholder="请输入注册手机号码"
            v-model="accountPhone"
            clearable>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">证件号码:</div>
          <el-input
            placeholder="请输入证件号码"
            v-model="identityNo"
            clearable>
          </el-input>
        </el-col>
         <el-col :span="12">
          <div class="pb10">绑卡手机号码:</div>
          <el-input
            placeholder="请输入绑卡手机号码"
            v-model="phone"
            clearable>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">客户经理姓名:</div>
          <el-input
            placeholder="请输入客户经理姓名"
            v-model="salesName"
            clearable>
          </el-input>
        </el-col>
         <el-col :span="12">
          <div class="pb10">客户经理编号:</div>
          <el-input
            placeholder="请输入客户经理编号"
            v-model="salesNo"
            clearable>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="padding-top-20">
        <el-col :span="12">
          <div class="pb10">订单状态:</div>
          <el-select v-model="orderStatus" style="width: 100%">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in orderStatusList"
              :key="item.code"
              :label="item.desc"
              :value="item.code">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <p class="padding-top-20  pb30">
        <el-button type="primary" icon="el-icon-search" @click="orderListSearch()">搜索</el-button>
      </p>
      </el-row>
    </div>


    <el-table :data="tableData" style="width: 100%">
       <el-table-column
        label="订单编号"   prop="outerId"
        align="center"
        min-width="350" >
      </el-table-column> 
      <el-table-column
        prop="orderTime"
        label="订单时间"
        align="center"
        min-width="170">
      </el-table-column>
      <el-table-column
        prop="customerName"
        label="客户姓名"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
         prop='phone'
        label="手机号码"
        align="center"
        min-width="130">
      </el-table-column>
      <el-table-column
        prop="identityNo"
        min-width="130"
        align="center"
        label="证件号码">
      </el-table-column>
      <el-table-column
        label="绑卡银行"  prop="bankName"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="银行卡号"  prop="bankCardNo"
        align="center"
        min-width="150">
      </el-table-column>
       <el-table-column
        label="订单金额（元）"  prop="orderAmount"
        align="center"
        min-width="120">
      </el-table-column>
       <el-table-column
        label="订单渠道"  prop="outerSystem"
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="productCode"
        min-width="120"
        align="center"
        label="产品编号">
      </el-table-column>
      <el-table-column
        prop="productName"
        min-width="250"
        align="center"
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="durationDays"
        min-width="100"
        align="center"
        label="存续期（天）">
      </el-table-column>
      <el-table-column
        prop="interestRate"
        min-width="80"
        align="center"
        label="年利率">
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
        prop="expectReturn"
        min-width="120"
        align="center"
        label="预计收益（元）">
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
        label="来源方式"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          {{scope.row.isManual?'补录':'非补录'}}
        </template>
      </el-table-column>

      <el-table-column
        prop="salesName"
        min-width="120"
        align="center"
        label="客户经理">
      </el-table-column>

       <el-table-column
        prop="salesNo"
        min-width="100"
        align="center"
        label="客户经理号">
      </el-table-column>
       
      <el-table-column
        prop="status"
        min-width="150"
        align="center"
        label="订单状态">
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
    orderSearch,
    getOrderList ,
    orderGetEnums
  } from '../../api/api'

  export default {
    data() {
      return {
        pickerOptions: {},
        tableData: [],
        total: 0,
        pageCurrent: 1,
        pageSize: 10,     
        valueDateTime: '',
        titleShow:true,
        selectHtml:"收起  <i class='el-icon-arrow-down'></i>",
        orderStatusList: [],
        orderStatus:'',
        outerSystemList:[],
        outerSystem:'',
        isManual: '',
        orderDateTime:'',
        salesNo:'',
        salesName:'',
        phone:'',
        identityNo:'',
        accountPhone:'',
        customerName:'',
        repayDateTime:'',
        productName: ''
      }
    },
    methods: {
      //翻页
      handleCurrentChange(val) {
        this.pageCurrent = val
        this.orderListSearch()
      },
      //下拉框
      searchTypeOptions() {       
        orderGetEnums().then((res) => {         
          this.outerSystemList = res.data.outerSystemList;//销售渠道
          this.orderStatusList = res.data.orderStatusList;//订单状态         
        },(reason) => {})      
      },
      //默认初始化table
      orderListInit() {
         let params = {
		      pageSize: this.pageSize,
		      pageCurrent: this.pageCurrent
        }
        getOrderList(params).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.itemCount;
          this.pageCount = res.data.pageCount;
        },(reason) => {})
      },
      //搜索 
      orderListSearch() {
        let orderStartTime = this.orderDateTime?this.orderDateTime[0]:'';
        let orderEndTime=this.orderDateTime?this.orderDateTime[1]:'';
        let valueStartDate = this.valueDateTime?this.valueDateTime[0]:'';
        let valueEndDate=this.valueDateTime?this.valueDateTime[1]:'';
        let repayStartDate=this.repayDateTime?this.repayDateTime[0]:'';
        let repayEndDate=this.repayDateTime?this.repayDateTime[1]:''

        var daysorder = this.common.DateDiff(orderStartTime,orderEndTime); 
        var daysvalue = this.common.DateDiff(valueStartDate,valueEndDate);	
        var daysrepay = this.common.DateDiff(repayStartDate,repayEndDate);
        if(daysorder>60||daysvalue>180||daysrepay>180){
          this.$alert('订单时间间隔不得大于60天，起息日间隔不得大于180天，兑付日间隔不得大于180天。', '提示', {
          confirmButtonText: '确定',
          showClose: false        
         });
	      return;		
      	}


        let params = {
		      pageSize: this.pageSize,
		      pageCurrent: this.pageCurrent,
		      orderStartTime: orderStartTime,
		      orderEndTime: orderEndTime,
		      productName: this.productName,
		      isManual: this.isManual,
		      outerSystem: this.outerSystem,
		      valueStartDate:valueStartDate,
		      valueEndDate:valueEndDate,
		      repayStartDate: repayStartDate,
		      repayEndDate: repayEndDate,
		      customerName: this.customerName,
		      phone: this.phone,
		      accountPhone: this.accountPhone,
		      identityNo: this.identityNo,
		      salesName: this.salesName,
		      salesNo: this.salesNo,
		      status:this.orderStatus
        }
  
        orderSearch(params).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.itemCount;
          this.pageCount = res.data.pageCount;
        },(reason) => {})
      },
      //初始化创建日期
      initOrderDate(){
        var now = new Date();
        var startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()-7)).toISOString().slice(0, 10);
        var endDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10);
        this.orderDateTime=[];
        this.orderDateTime.push(startDate);
        this.orderDateTime.push(endDate);
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
      this.initOrderDate();
      this.searchTypeOptions();
      this.orderListInit(); 
    }
  }
</script>


<style scope>
.money-input{width: 45%;}
.money-line{display:inline-block; width: 8%; text-align: center;}
.title-left{float:left;font-size: 20px;color: black;}
.title-right{float:right;padding: 5px;cursor: pointer;}
</style>

