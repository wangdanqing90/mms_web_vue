<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>审核管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动提成审核</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="wrap-white mb30 pb30">
      <el-row :gutter="20" class="padding-top-20">
       
        <el-col :span="12">
          <div class="pb10">创建时间:</div>
          <el-date-picker
            v-model="dateTime"
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
          <div class="pb10">提成名称:</div>
          <el-input
            placeholder="请输入提成名称"
            v-model="activityName"
            clearable>
          </el-input>
        </el-col>
      </el-row>


      <el-row :gutter="20" class="padding-top-20">  
        <el-col :span="12">
          <div class="pb10">创建人:</div>
          <el-input
            placeholder="请输入创建人"
            v-model="createName"
            clearable>
          </el-input>
        </el-col>


        <el-col :span="12">
          <div class="pb10">状态:</div>
          <el-select v-model="status" style="width: 100%">
            <el-option value="" label="全部"></el-option>
            <el-option value="ONCHECK" label="待审"></el-option>
            <el-option value="PASS" label="通过"></el-option>
            <el-option value="REFUSED" label="驳回"></el-option>
            <el-option value="INVALID" label="废弃"></el-option>          
          </el-select>
        </el-col>
      </el-row>

       <el-row :gutter="20" class="padding-top-20">       
        <el-col :span="12">
          <div class="pb10">类型:</div>
          <el-select v-model="type" style="width: 100%">       
            <el-option value="ACTIVE" label="活动类"></el-option>
            <el-option value="PRODUCT_COMMISSION" label="产品类"></el-option>
          </el-select>
        </el-col>
      </el-row>
      
      <p class="padding-top-20">
        <el-button type="primary" icon="el-icon-search" @click="royaltySearch()">搜索</el-button>
      </p>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%" @selection-change="changeFun">
       <el-table-column
      type="selection"
      width="55">
    </el-table-column>

      <el-table-column
        prop="activityName"
        label="提成名称"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column       
        label="提成比例"
        align="center"
        min-width="90"
      >
       <template slot-scope="scope">
          {{scope.row.profitRate}}%
        </template>

      </el-table-column>
      <el-table-column
        prop="createUser.salesName"  
        min-width="150"
        align="center"
        label="创建人">
      </el-table-column>
      <el-table-column
        :formatter="common.convertStatus"
        align="center"
        min-width="80"
        label="状态">
      </el-table-column>
      <el-table-column
        align="center"
        min-width="80"
        :formatter="common.convertActOrPro"
        label="类型">
      </el-table-column>
      
      <el-table-column
        prop="createTime"
        align="center"
        min-width="200"
        label="创建日期">
      </el-table-column>

      <el-table-column
        align="center"
        fixed="right"
        width="160"
        label="操作">
        <template slot-scope="scope" >
          <div v-if="scope.row.status=='PASS'||scope.row.status=='REFUSED'">
          <el-button 
            size="mini"
            type="text" @click="detail(scope.$index, scope.row)">详情
          </el-button>
           <el-button
            size="mini" disabled
            type="text" @click="review(scope.$index, scope.row)">复核
          </el-button>
           <el-button
            size="mini"
            type="text" @click="discard(scope.$index, scope.row)">废弃
          </el-button>
          </div>

           <div v-else-if="scope.row.status=='INVALID'">
          <el-button 
            size="mini"
            type="text" @click="detail(scope.$index, scope.row)">详情
          </el-button>
           <el-button
            size="mini" disabled
            type="text" @click="review(scope.$index, scope.row)">复核
          </el-button>
           <el-button
            size="mini" disabled
            type="text" @click="discard(scope.$index, scope.row)">废弃
          </el-button>
          </div>

           <div v-else>
          <el-button 
            size="mini"
            type="text" @click="detail(scope.$index, scope.row)">详情
          </el-button>
           <el-button
            size="mini"
            type="text" @click="review(scope.$index, scope.row)">复核
          </el-button>
           <el-button
            size="mini"
            type="text" @click="discard(scope.$index, scope.row)">废弃
          </el-button>
          </div>
        </template>
       
      </el-table-column>
    </el-table>


    <el-col class="toolbar">
      <el-pagination
        background
        layout="prev, pager, next" @current-change="handleCurrentChange" :total="total">
      </el-pagination>
    </el-col>

    <div class="wrap-white  pb30">
       <p class="padding-top-30" align="center" >
        <el-button type="primary"  @click="BatchAuditBtn()">批量审核</el-button>
      </p>
    </div>

  </div>
</template>

<style>

</style>

<script>
  import {
    getActivityList,
    getActivityAudits
  } from '../../api/api'

  export default {
    data() {
      return {
        pickerOptions: {},
        tableData: [],
        total: 0,
        pageCurrent: 1,
        pageSize: 10,
        startTime: '',
        endTime: '',
        status: '',
        type: 'ACTIVE',
        activityName:'',
        createName:'',
        dateTime:'',
        multipleSelection: []
      }
    },
    methods: {
      //翻页 
      handleCurrentChange(val) {
        this.pageCurrent = val
        this.royaltySearch()
      },  
      //搜索 
      royaltySearch() {
        let params = {
          pageCurrent: this.pageCurrent,
          pageSize: this.pageSize,
          createTimeStart: this.dateTime?this.dateTime[0]:'',
          createTimeEnd: this.dateTime?this.dateTime[1]:'',
          status: this.status,
          type: this.type,
	      	activityName: this.activityName,
	      	createName: this.createName
        }
        getActivityList(params).then(res => {
          this.tableData = res.data.list
          this.total = res.data.itemCount;
          this.pageCount = res.data.pageCount
        },(reason) => {})
      },
      //详情
      detail(index, row) {
        this.$router.push({path: '../performanceManagement/addActCommission', query: {type:1,id:row.id,status:row.status,selectType:this.type}})
      },
      //复核
      review(index, row) {
         this.$router.push({path: '../performanceManagement/addActCommission', query: {type:3,id:row.id,status:row.status,selectType:this.type}})
      },
      //废弃
      discard(index, row) {
         this.$router.push({path: '../performanceManagement/addActCommission', query: {type:4,id:row.id,status:row.status,selectType:this.type}})
      },
      //批量审核
      BatchAuditBtn(){     
        console.log(this.multipleSelection)
        if(this.multipleSelection.length==0){
            this.$message.error('请先勾选列表');
        }
        else{
         let ids='';
         this.multipleSelection.forEach(function(item,key) { 
            if(ids!=""){
		         	ids+=","
		         }
            ids+=item.id; 
          });

        let params = {
         ids: ids,
		     status:"PASS"
        }
        getActivityAudits(params).then(
          res => { 
          this.$alert('批量审核成功', '提示', {
          confirmButtonText: '确定',
          showClose: false,
          callback: action => {
             this.royaltySearch();  
          }
        });
        },(reason) => {}
        )
        }
      },
      changeFun (val) {
         this.multipleSelection = val // 返回的是选中的列的数组集合
      }

    },
    computed: {   
    },
    mounted() {
      window.vue = this;
      this.royaltySearch(); 
    }
  }
</script>

