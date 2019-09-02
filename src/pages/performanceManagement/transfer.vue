<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="margin-bottom-10">
      <el-breadcrumb-item>业绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>业绩转移</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="10" class="grid-content bg-white transfer-left">
        <div class="headerTitle">业绩转移</div>
        <label class='chooseWay'>查询方式</label>
        <!-- <div class="chooseItem">

        </div> -->
        <div>
          <label class="radioLabel" style="line-height: 24px;">
            <input type="radio" v-model="radio" name="searchRadio" value="1" id="radio-orgnize"/> 根据组织查询
          </label>
          <label class="radioLabel" style="line-height: 24px;">
            <input type="radio" v-model="radio" name="searchRadio" value="2" id="radio-persion"/> 根据人员查询
          </label>
        </div>
        <el-row class="chooseInput" :gutter="24" v-if="radio === '1'">
          <el-col :span='12'>
            <el-select v-model="orgName"
                       @change="selectGetOrg(orgName)"
                       filterable
                       remote
                       reserve-keyword
                       placeholder="组织选择"
                       :remote-method="remoteMethod"
                       :loading="loading">
              <el-option
                v-for="item in options"
                :key="item.value"
                :code="item.code"
                :value="item.value"
                :id="item.id">
              </el-option>

            </el-select>
          </el-col>
          <el-col :span='12'>
            <el-select v-model="children"
                       @change="selectGetChild(children)"
                       filterable
                       remote
                       reserve-keyword
                       placeholder="人员选择"
                       :remote-method="remoteChilds"
                       :loading="loading">
              <el-option
                v-for="(item,index) in childSales"
                :key="index"
                :salesName="item.salesName"
                :value="item.salesName"
                :id="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="chooseInput" :gutter="2" v-else>
          <el-col :span='19'>
          <el-input v-model="state" placeholder="请输入内容" clearable>
            </el-input>
            <div style="position: relative;  clear: both">
              <ul class="userList" v-show="show">
                <li v-for="item in loadAll" :data-id="item.id" @click="handleSelect($event)" >
                  {{ item.salesName}}({{ item.orgName}})
                </li>
              </ul>
              <p v-show="noData" style="text-align: center; padding: 10px 0">暂无数据</p>
            </div>

          </el-col>
          <el-col :span='5'>
            <el-button type="primary" @click="SearchSales">搜索</el-button>
          </el-col>
        </el-row>
        <el-row :gutter='20' class="buttonItem">
          <el-col :span='12' class="center">
            <el-button type="warning" @click='addTransfer()' :disabled="btndisabled">添加转移人</el-button>
          </el-col>
          <el-col :span='12' class="center">
            <el-button type="primary" @click="addSave()" :disabled="btndisabled">添加接收人</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="14" class="transfer-right">
        <el-row>
          <el-col>
            <div class="grid-content bg-purple-light transferPerson">业绩转移人</div>
            <el-table
              :data="transferInfo" @selection-change="changeFun"
              style="width: 100%; background:#FAFBFC;"
            >
              <el-table-column
                type="selection"
                label="全选"
                width="50"
                align="center">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="50"
                align="center">
              </el-table-column>
              <el-table-column
                prop="salesName"
                label="员工姓名"
                min-width="125"
                align="center">
              </el-table-column>

              <el-table-column
                prop="salesMobile"
                label="手机号码"
                min-width="110"
                align="center">
              </el-table-column>
              <el-table-column
                prop="orgName"
                label="所在组织"
                min-width="130"
                align="center">
              </el-table-column>
              <el-table-column
                label="操作"
                width="80"
                align="center">
                <template slot-scope="scope">
                  <el-button class="delete" @click.native.prevent="deleteRow(scope.$index, transferInfo)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row class="margin-top-20">
          <el-col>
            <div class="grid-content bg-purple-light resivePerson">业绩接收人</div>
            <el-table
              :data="saveInfo"
              style="width: 100%; background:#FAFBFC;"
            >
              <el-table-column
                prop="salesName"
                label="员工姓名"
                min-width="125"
                align="center">
              </el-table-column>
              <el-table-column
                prop="salesMobile"
                label="手机号码"
                min-width="110"
                align="center">
              </el-table-column>
              <el-table-column
                prop="orgName"
                label="所在组织"
                min-width="130"
                align="center">
              </el-table-column>
              <el-table-column
                label="操作"
                width="80"
                align="center">
                <template slot-scope="scope">
                  <el-button class="delete" @click.native.prevent="deleteSave(scope.$index, saveInfo)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row class="margin-top-20" :gutter='24'>
          <el-col :span='24'>
            <div class="transfer-option margin-bottom-5"> 交接方式： <span>根据指定时段转移客户业绩</span></div>
            <el-date-picker
              v-model="dateTime"
              type="daterange"
              align="right"
              unlink-panels
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions" style="width: 100%">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row class="margin-top-20" :gutter='24'>
          <el-col :span='24'>
            <div class="transfer-option"> 订单类型： </div>
            <el-checkbox-group v-model="checkedType">
              <el-checkbox v-for="item in orderList" :label="item.code" :key="item.code">{{item.desc}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row :gutter='24' class="margin-top-20 center">
          <el-col class=" margin-bottom-10 " :span='8' :offset="4">
            <el-button type="primary" class="submit" @click="submit()">提交</el-button>
          </el-col>
          <el-col class=" margin-bottom-10 " :span='10'>
            <el-button class="float-right reset" @click="reset()">重置</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import {
    searchOrg,
    childSales,
    getTransferInfo,
    getOrderTypes,
    submitTransfer,
    transferSearchSales
  } from '../../api/api'
  import Qs from 'qs';

  export default {
    data() {
      return {
        msg: '业绩管理',
        radio: '1',
        orderList: [],
        options: [],
        childSales: [],
        value: '',
        orgName: '',
        children: '',
        btndisabled: true,
        checkedType: [],
        orgId: [],
        id: '',
        list: [],
        listChilds: [],
        loading: false,
        statess: [],
        statessChilds: [],
        // tableData: ['1','2'],
        operateStartDate: '',
        operateEndDate: '',
        pickerOptions: {},
        transferInfo: [], //转移人列表
        transferTemp: {},
        chooseTransfer: [], //选择的转移人数组，
        saveInfo: [], //接受人列表
        dateTime: '',
        state: '',
        loadAll: [],
        show:false,
        noData:false,
        userId:'',
      }
    },
    watch:{
      radio(val,oldVal){
          if(val !=oldVal){
            this.transferTemp.id=''
            this.state= ''
            this.loadAll= []
            this.orgName=''
            this.children=''
            this.reset()
            this.btndisabled = true
          }

      }
    },
    mounted() {
      this.searchOrg();
      this.getTypes();
    },

    methods: {
      SearchSales() {
        let params = {
          search: this.state
        }
        transferSearchSales(params).then(res => {
          this.loadAll = res.data
          this.show= true
          if (res.data.length == 0) {
            this.show= false
            this.noData= true
          }
        })
      },

      handleSelect(e) {
        console.log(e.srcElement.dataset.id, '999')
        this.state = e.target.innerHTML.trim().replace(/&nbsp;/g, '')
        this.btndisabled=false
        this.userId= e.srcElement.dataset.id
      },

      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      deleteSave(index, rows) {
        rows.splice(index, 1);
        console.log(this.saveInfo, '222')
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.value.indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
      remoteChilds(query) {
        //  this.loading = false;
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.childSales = this.listChilds.filter(item => {
              return item.salesName.indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.childSales = [];
        }
      },
      // 组织搜索数据
      searchOrg() {
        var param = {
          orgName: this.orgName
        }
        searchOrg(param).then(
          res => {
            this.statess = res.data;
            this.list = this.statess.map(item => {
              return {value: item.name, code: item.code, id: item.id};
            });
            this.options = this.list
          },
          err => {
            console.log(err)
          }
        )
      },
      // 组织查询 > 人员
      selectGetOrg(val) {
        let obj = {};
        console.log(val, 'val1')
        obj = this.options.find((item) => {//this.ruleForm
          return item.value === val;//筛选出匹配数据
        })
        this.children = ''
        // 查询当前组织下的所有人员
        childSales(obj.id).then(res => {
            this.statessChilds = res.data;
            this.listChilds = this.statessChilds.map(item => {
//          	console.log({obj,...item},'item')
              return {...item}
            });
            this.childSales = this.listChilds //最后的数据需要是查询之后的具体数据

          },
          err => {
            console.log(err);
          }
        )
      },
      selectGetChild(val) {
        let tempObj = {};
        tempObj = this.childSales.find((item) => {
          return item.salesName === val
        })
        this.btndisabled = false
        this.transferTemp = tempObj;
        console.log(tempObj, '1654645648')
      },
      // 添加转移人
      addTransfer() {
        if(this.radio ==1){
          var tempId = this.transferTemp.id
        } else{
          var tempId = this.userId
        }
        var flag = this.transferInfo.some((item) => {
          return item.id == tempId
        })
        if (!flag) {
          getTransferInfo(tempId).then(
            res => {
              this.transferTemp = res.data
              this.transferInfo.push(this.transferTemp)
              this.btndisabled = true
              this.children = ''
              this.orgName = ''
              this.state=''
              this.loadAll=[]
              this.show= false

            },
            err => {
              console.log(err)
            }
          )

        } else {
          this.$message({
            message: '业绩转移人已存在',
            type: 'error'
          });
        }
      },
      // 添加接收人
      addSave() {
        if(this.radio ==1){
          var tempId = this.transferTemp.id
        } else{
          var tempId = this.userId
        }
        if (this.saveInfo.length == 0) {
          getTransferInfo(tempId).then(
            res => {
              this.transferTemp = res.data
              this.saveInfo.push(this.transferTemp)
              this.id = tempId
              this.btndisabled = true
              this.children = ''
              this.orgName = ''
              this.state=''
              this.loadAll=[]
            },
            err => {
              console.log(err)
            }
          )

        } else {
          this.$message({
            message: '业绩接收人必须唯一！',
            type: 'error'
          });
        }
      },
      getTypes() {
        getOrderTypes().then(
          res => {
            console.log(res, '4545')
            this.orderList = res.data
          },
          err => {
            console.log(err);
          }
        )
      },
      changeFun(val) {
        this.chooseTransfer = val // 返回的是选中的列的数组集合
        let ids = []
        this.chooseTransfer.map(item => {
          ids.push(item.id)
          this.orgId = ids
        })

      },
      // 提交
      submit() {
        let params = {
          sourceOrgIds: this.orgId.join(','),
          receivedOrgId: this.id.toString(),
          startTime: this.dateTime ? this.dateTime[0] : '',
          endTime: this.dateTime ? this.dateTime[1] : '',
          orderType: this.checkedType.toString()
        }
        if (this.orgId.indexOf(this.id) > -1) {
          this.$message.warning(`业绩接收人和业绩转移人不能为同一人！`);
          return false
        }
        if (this.checkedType.length < 1) {
          this.$message.warning(`请选择订单类型`);
          return false
        }
        if (this.dateTime == '' || this.dateTime == 'undefined') {
          this.$message.warning(`请选择业绩转移时间段`);
          return false
        }
        if (this.transferInfo == '' || this.chooseTransfer.length < 1) {
          this.$message.warning(`请选择业绩转移人`);
          return false
        }
        submitTransfer(params).then(data => {
          if (data.statusCode == 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.transferInfo = []
            this.saveInfo = []
            this.dateTime = ''
            this.checkedType = []
          } else {
            this.$message.error(data.message);
            return false
          }
        })
      },
      // 重置
      reset() {
        this.transferInfo = []
        this.saveInfo = []
        this.dateTime = ''
        this.checkedType = []
      }
    }
  }
</script>

<style lang="scss">
  .inputText input[type="text"]{
    text-align: left;
  }
  .userList {

    max-height: 120px;
    font-size: 12px;
    overflow-y: auto;
    position: absolute;
    top: 0;
    border: 1px solid #E6EAEE;
    width: 100%;
    padding: 2px 0;
  }

  .userList li {
    white-space: nowrap;
    font-size: 12px;
    padding: 10px 10px;
    border-bottom: 1px solid #E6EAEE;

  }
  .userList li:last-child{
    border-bottom: 0;
  }
  .userList li:hover {
    background: #f1f1f1;
  }

  .transfer-left {
    background: white;
    height: 500px;
    padding: 32px 24px 0 24px;
    border-radius: 5px;
    border: 1px solid #E6EAEE;
  }

  .headerTitle {
    font-size: 20px;
    color: #000000;
    margin-bottom: 10px;
  }

  .chooseWay {
    margin: 22px 0 10px 0;
    display: block;
  }

  .transfer-right {
    background: #FAFBFC;
    // height:500px;
    padding: 10px;
    border: 1px solid #E6EAEE;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 32px 24px 0 24px;
  }

  input[name='searchRadio'] {
    width: 18px;
    height: 18px;
    border-radius: 9px;
    margin-right: 5px;
    background-color: #fff;
    -webkit-appearance: none;
    background: url("../../images/Radiobutton_No.png") no-repeat center;
    background-size: 18px 18px;
    border: 0 !important;
    box-shadow: none !important;
  }

  input[name='searchRadio']:checked {
    border-radius: 9px;
    margin-right: 5px;
    background: url("../../images/Radiobutton_Yes.png") no-repeat center;
    background-size: 18px 18px;
    outline: none;
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    background-color: #fff;
    -webkit-appearance: none;
    background: url("../../images/unsel.png") no-repeat center;
    background-size: 18px 18px;
    border: 0 !important;
    box-shadow: none !important;
  }

  input[type=checkbox]:checked {
    background: url("../../images/sel.png") no-repeat center;
    background-size: 18px 18px;
    outline: none;
  }

  .radioLabel {
    display: inline-flex !important;
    width: 48%;
    box-sizing: border-box;
  }

  .chooseInput {
    margin-top: 10px;
  }

  /*input[type="text"], input[type="number"] {*/
    /*text-align: left;*/
    /*padding: 0 15px !important;*/
  /*}*/

  .buttonItem {
    position: relative;
    bottom: -260px;
  }

  .el-input__suffix {
    display: none;
  }

  .el-select-dropdown__wrap {
    max-height: 225px;
  }

  .el-table thead, .el-table tr {
    background-color: #FAFBFC;
  }

  .transferPerson, .resivePerson {
    font-family: PingFangSC-Regular;
    font-size: 17px;
    color: #354052;
    font-weight: normal;
  }

  .transfer-option, .transfer-option > span {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #7F8FA4;
    line-height: 17px;
  }

  .orderStyle {
    overflow: hidden;
    li {
      float: left;
      line-height: 24px;
      height: 24px;
      vertical-align: middle;
      display: inline-block;
      padding: 5px;
      input {
        width: 18px;
        height: 18px;
        display: inline-block;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        line-height: 24px;
        vertical-align: middle;
      }
    }
  }

  .submit, .reset {
    min-width: 110px;
  }

  .delete {
    width: 42px;
    height: 32px;
    background: url("../../images/Delete_button.png") no-repeat center;
    background-size: 42px 32px;
    border: none;
    display: inline-block;
  }
</style>
