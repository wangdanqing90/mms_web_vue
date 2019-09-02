<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>审核管理</el-breadcrumb-item>
      <el-breadcrumb-item>组织提成审核</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="wrap-white mb30 pb30">
      <p class="el-titleText">查找条件</p>
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
          <div class="pb10">组织名称:</div>
          <el-input
            placeholder="请输入组织名称"
            v-model="orgName"
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
      <p class="padding-top-20">
        <el-button type="primary" icon="el-icon-search" @click="royaltySearch()">搜索</el-button>
      </p>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="code"
        label="组织编号"
        align="center"
        width="100">
      </el-table-column>

      <el-table-column
        prop="name"
        label="组织名称"
        align="center"
        min-width="100">
      </el-table-column>
    <!-- </el-table> -->
    <!-- <el-table :data='subList' lazy
    :load="load" style="width: 100%">-->
      <el-table-column
        label="提成比例"
        align="center"
        prop="profitRate"
        min-width="300"
      >
     <template slot-scope="scope">
          {{scope.row.profitRate}}‰
        </template>

      </el-table-column>

      <el-table-column
        prop="createByName"
        min-width="150"
        align="center"
        label="创建人">
      </el-table-column>
      <el-table-column
        align="center"
        prop="state"
        min-width="80"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        min-width="200"
        label="创建日期">
      </el-table-column>
    <!-- </el-table> -->
    <!-- <el-table :data="tableData"> -->
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


  </div>
</template>

<script>
  import {
    getOrgList,
    getActivityAudits
  } from '../../api/api'
import state from '../../store/state';

  export default {
    data() {
      return {
        pickerOptions: {},
        tableData: [],
        subList: [],
        total: 0,
        pageCurrent: 1,
        pageSize: 10,
        status: '',
        createTimeStartStr: '',
        createTimeEndStr: '',
        createName: '',
        type: 'ACTIVE',
        orgName:'',
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
	      	orgName: this.orgName
        }
//        getOrgList(params).then(res => {
//          this.total = res.data.itemCount;
//          this.pageCount = res.data.pageCount;
//          var tempState = '';
//          this.tableData = res.data.list.map(
//            i => {
//
//              this.subList = i.orgRates.map(
//                i => {
//
//                  if(i.state == 'ONCHECK'){
//                    tempState = '待审'
//                  } else if(i.state == 'PASS'){
//                    tempState = '通过'
//                  } else if(i.state == 'REFUSED'){
//                    tempState = '驳回'
//                  } else if(i.state == 'INVALID'){
//                    tempState = '废弃'
//                  }
//                    return Object.assign({},i,{
//                      id: i.id,
//                      profitRate: i.profitRate,
//                      createByName: i.createByName,
//                      state: tempState,
//                      createTime: i.createTime
//                    })
//                }
//              )
//              return Object.assign({}, i, {
//                code: i.code,
//                name: i.name
//              })
//
//            }
//          )
//
//
//        },(reason) => {})
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

