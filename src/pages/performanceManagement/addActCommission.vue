<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>业绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动提成</el-breadcrumb-item>
    </el-breadcrumb>
    <el-radio-group v-model="radio1" style="width: 100%" >
      <el-radio-button label="活动类" :disabled="radiodisabled"></el-radio-button>
      <el-radio-button label="产品类" :disabled='radiodisabled'></el-radio-button>

    </el-radio-group>

    <div class="wrap-white mb30 pb30">

      <p class="el-titleText">提成规则</p>
      <el-form :label-position="labelPosition" :rules="rules"
               ref="formLabelAlign" size="medium " :inline-message="true" :model="formLabelAlign" class="New-elFrom ">

        <p v-if="radio1==='活动类'" class="padding-bottom-5">活动名称(必填)</p>
        <p v-else class="padding-bottom-5">产品名称(必填)</p>
        <el-input
          type="textarea"
          placeholder="50字以内(包括)"
          v-model="formLabelAlign.activityName"
          maxlength="50"
          show-word-limit
          :readonly='isDisable'
        >
        </el-input>
        <el-form-item label="产品选择：（必填）">
          <el-row :gutter='24'>
            <el-col :span="20">
              <ul class="hasChoosed">
                <li class="checkbox" :sapn='4' v-for="(item, index) in formLabelAlign.productIdArr" :key="index">
                  <img class="icon-img" src="../../images/sel@2x.png"/>
                  <span>{{item.product_name}}</span>
                </li>
              </ul>
            </el-col>
            <el-col :span='4'>
              <div class="pb10"></div>
              <el-button type='primary' class="chooseProduct" @click="chooseProduct" :disabled='isDisable'>产品选择
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <p v-if="radio1==='活动类'" class="padding-bottom-5 padding-top-10">起始范围设置</p>
        <p class="padding-bottom-5 padding-top-10" v-else>起始范围设置 可不设置</p>
        <el-date-picker
          :readonly='isDisable'
          v-model="dateTimeStart"
          type="daterange"
          align="right"
          format="yyyy-MM-dd "
          value-format="yyyy-MM-dd"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%">
        </el-date-picker>
        <el-form-item label="不参与组织">
          <el-row :gutter='24'>
            <el-col :span="20">
              <ul class="hasChoosed">
                <li class="checkbox" :sapn='4' v-for="item in formLabelAlign.excludeOrgIdArr">
                  <img class="icon-img" src="../../images/sel@2x.png"/>
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </el-col>
            <el-col :span='4'>
              <div class="pb10"></div>
              <el-button type='primary' class="chooseOrgnize" @click="openOrganize" :disabled='isDisable'>选择组织
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="提成比例（‰）(必填)">
          <el-input
            placeholder=""
            v-model="formLabelAlign.profitRate"
            :readonly='isDisable'
          >
          </el-input>
        </el-form-item>
        <el-form-item label="提成说明">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            :readonly='isDisable'
            v-model="formLabelAlign.remark">
          </el-input>
        </el-form-item>
        <el-form-item style="text-align: right" class="padding-top-20">
          <el-button type="primary" @click="getActivityPass" v-show="typestatus">通过</el-button>
          <el-button type="primary" @click="getActivityRefused" v-show="typestatus">驳回</el-button>
          <el-button type="primary" @click="getActivityDelete" v-show="typesDetele">废弃</el-button>
          <el-button type="primary" @click="getActivityAdd(radio1)" v-show="hideBtn">提交</el-button>
          <el-button @click="getBack">返回</el-button>
          <el-button @click="resetbtn" v-show="hideBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--弹层-->
    <el-dialog title="选择产品" custom-class="handleMoreWrap" :visible.sync="dialogVisible" :append-to-body="true"
               width="60%">

      <p class="pb10">名称</p>
      <el-input v-model="activityDialog.productName"></el-input>
      <el-row :gutter='24' class="padding-top-10">
        <el-col :span='12'>
          <p class="pb10">产品起息日</p>
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            align="right"
            unlink-panels
            :picker-options="pickerOptions"
            range-separator="至"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%">
          </el-date-picker>
        </el-col>
        <el-col :span='12'>
          <p class="pb10">产品兑付日</p>
          <el-date-picker
            v-model="dateCash"
            type="daterange"
            align="right"
            unlink-panels
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter='24' class="padding-top-10">
        <el-col :span='12'>
          <p class="pb10">产品渠道选择：</p>
          <el-select v-model="activityDialog.outerSystem" style="width: 100%">
            <el-option
              v-for="item in outerSystemList"
              :key="item.code"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span='12' class="padding-top-26">
          <el-button type="primary" class="submit" @click="getActivityProductList">搜索</el-button>
        </el-col>
      </el-row>
      <div class="padding-top-20 " style="max-height: 150px; overflow-y: auto;margin: 10px 0;">
        <el-checkbox-group v-model="productOption" @change="productChange">
          <el-checkbox v-for="product in productOptionsList" style="margin-right: 4.8%; width:45%"
                       :label="product.id" :key="product.id">
            {{product.product_name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <el-checkbox :indeterminate="isIndeterminate" v-show="checkedHidden" v-model="checkAll"
                   @change="productAllChange">全选
      </el-checkbox>

      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="productSubmit" >确 定</el-button>
  <el-button @click="reset" >重  置</el-button>
       <el-button @click="dialogVisible = false">返 回</el-button>



  </span>
    </el-dialog>
    <!--不参与组织弹层-->
    <el-dialog title="选择组织" custom-class="handleMoreWrap" :visible.sync="dialogVisibleTeam" :append-to-body="true"
               width="60%">
      <el-row :gutter='24'>
        <el-col :span='18'>
          <el-input v-model="chooseTeam.orgName" placeholder="请输入组织名称"></el-input>
        </el-col>
        <el-col :span='6'>
          <el-button type="primary" @click="getPerformanceSearchOrg">搜 索</el-button>
        </el-col>
      </el-row>
      <div style="max-height: 200px; overflow-y: auto;margin: 10px 0;">
        <el-checkbox-group v-model="organizerProduct" @change="organizeChange">
          <el-checkbox v-for="product in organizeList" :label="product.id" :key="product.id"
                       style="width: 30%;overflow: hidden; margin-right: 3.33333%; ">
            {{product.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <el-checkbox :indeterminate="isIndeterminateTeam" v-show="checkedHiddenTeam" v-model="checkAllTeam"
                   @change="organizeAll">全选
      </el-checkbox>
      <div slot="footer" class="dialog-footer center">
        <el-button type="primary" @click="organizeSubmit">确 定</el-button>

        <el-button @click="resetOrganize">重  置</el-button>
        <el-button @click="dialogVisibleTeam = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    activityOutSystemEnum,
    activityProductList,
    performanceSearchOrg,
    activityAdd,
    activityInfo,
    activityAudit,
    activityDelete,
  } from '../../api/api'

  export default {
    data() {
      var vue = this
      return {
        radiodisabled:false,
        typesDetele:false,
        typestatus:false,
        hideBtn:true,
        isDisable: false,
        hasChoosePro: [],
        labelPosition: 'top',
        radio1: '活动类',
        dateTimeStart: '',
        dateTime: '',
        dateCash: '',
        checkedProduct: [],
        checkedOrganize: [],
        productOption: [],
        checkAll: true,
        checked: true,
        checkAllTeam: true,
        isIndeterminate: false,
        isIndeterminateTeam: false,
        dialogVisible: false,
        checkedHidden: false,
        checkedHiddenTeam: false,
        checkNum: [],
        checkNumTeam: [],
        dialogVisibleTeam: false,
        organizeList: [],
        organizerProduct: [],
        productOptionsList: [],
        idArr: [],
        orgIdArr: [],
        chooseTeam: {
          orgName: '',
        },
        formLabelAlign: {
          activityName: '',
          remark: '',
          endTimeStr: '',
          startTimeStr: '',
          profitRate: '',
          excludeOrgIdArr: [],
          productIdArr: [],
        },
        outerSystemList: [],
        organizerProduct: [],
        activityDialog: {
          productType: '',
          outerSystem: '',
          productName: '',
          valueDateStart: '',
          valueDateEnd: '',
          repayDateStart: '',
          repayDateEnd: '',
        },

        rules: {},
        pickerOptions: {
          disabledDate(time) {
            let timeOptionRange = vue.timeOptionRange;
            let secondNum = 60 * 60 * 24 * 60 * 1000;
            if (timeOptionRange) {
              return time.getTime() > timeOptionRange.getTime() + secondNum || time.getTime() < timeOptionRange.getTime() - secondNum;
            }
          },
          onPick(time) {
            //当第一时间选中才设置禁用
            if (time.minDate && !time.maxDate) {
              vue.timeOptionRange = time.minDate;
            }
            if (time.maxDate) {
              vue.timeOptionRange = null;
            }
          }
        }
      }
    },
    watch: {
      '$route': 'newpage',
      radio1(val, oldVal) {
        if (val != oldVal) {
         this.resetbtn()
        }
      }
    },
    methods: {
      newpage(){
        this.resetbtn()
        this.isDisable=false
        this.hideBtn=true
        this.radiodisabled=false
        this.radio1='活动类'
        this.typestatus=false

//        Object.assign(this.$data, this.$options.data())
      },
      getBack(){
        const type = this.$route.query.type

        if(type ==1 || type ==3 || type ==4) {
          this.actCommissionInfo()
        } else {
          this.$router.back(-1)
        }

      },
      resetbtn(){
        this.formLabelAlign.activityName = null
        this.formLabelAlign.productIdArr = []
        this.dateTimeStart = null
        this.formLabelAlign.excludeOrgIdArr = []
        this.formLabelAlign.profitRate = null
        this.formLabelAlign.remark = null
      },
      async getactivityOutSystemEnum() {
        const data = await  activityOutSystemEnum()
        const res = data.data
        this.outerSystemList = res
        this.activityDialog.outerSystem = res[0].value
      },
//      产品选择搜索
      getActivityProductList() {
        const _this = this.activityDialog
//        this.productOptionsList=[]
//        this.isIndeterminate= true
        let params = {
          productType: 'EXCHANGE',
          outerSystem: _this.outerSystem,
          productName: _this.productName,
          valueDateStart: this.dateTime ? this.dateTime[0] : '',
          valueDateEnd: this.dateTime ? this.dateTime[1] : '',
          repayDateStart: this.dateCash ? this.dateCash[0] : '',
          repayDateEnd: this.dateCash ? this.dateCash[1] : '',
        }
        this.checkNum = []
        this.productOption = []
        this.hasChoosePro = []
        activityProductList(params).then(res => {
          const data = res.data.data
          this.productOptionsList = data
          let list = []
          data.forEach((item) => {
//            this.checked=true
            list = item.id
            this.checkNum.push(list)
            this.productOption.push(list)
            this.checkedHidden = true
            this.hasChoosePro.push(list)
          })
        }, (reason) => {
        })
      },
      productAllChange(val) {
        this.productOption = val ? this.checkNum : []
        this.isIndeterminate = false
        this.hasChoosePro = this.checkNum;
      },
      productChange(value) {
        this.hasChoosePro = value
        let checkedCount = value.length
        this.checkAll = checkedCount === this.checkNum.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkNum.length;

      },
      chooseProduct() {
        this.checkedProduct = []
        this.hasChoosePro = []
        this.dialogVisible = true
        this.getactivityOutSystemEnum()
      },
      reset() {
        this.dateTime = null
        this.dateCash = null
        this.activityDialog.productName = null
        this.productOption = []
        this.productOptionsList = []
        this.checkedHidden = false
        this.checkedProduct = []
        this.isIndeterminate = false
        this.hasChoosePro = []
      },
      productSubmit() {
        this.checkedProduct = []
        this.productOptionsList.map(res => {
            var length = this.hasChoosePro.length
            for (var k = 0; k < length; k++) {
              if (res.id == this.hasChoosePro[k]) {
                this.checkedProduct.push(res)
              }
            }
          }
        )
        console.log(this.checkedProduct, '/***---')
        this.formLabelAlign.productIdArr = [];
        this.formLabelAlign.productIdArr = this.checkedProduct

        this.checkedProduct.forEach(item => {
          this.idArr.push(item.id)
          console.log(this.idArr, '-52')
        })
        this.dialogVisible = false
      },
      //组织选择
      openOrganize() {
        this.dialogVisibleTeam = true
        this.checkedOrganize = []
      },
      getPerformanceSearchOrg() {
        const params = {
          orgName: this.chooseTeam.orgName
        }
        this.checkNumTeam = []
        this.organizerProduct = []
        this.hasChooseOrganize = []
        performanceSearchOrg(params).then(res => {
          const data = res.data
          this.organizeList = data
          let list = []
          data.forEach(item => {
            list = item.id
            this.checkNumTeam.push(list)
            this.organizerProduct.push(list)
            this.hasChooseOrganize = this.checkNumTeam
            this.checkedHiddenTeam = true
          })
        }, (reason) => {
        })
      },
      organizeAll(val) {
        this.organizerProduct = val ? this.checkNumTeam : []
        this.isIndeterminateTeam = false
        this.hasChooseOrganize = this.checkNumTeam
      },
      organizeChange(value) {
        this.hasChooseOrganize = value;
        let checkedCount = value.length;
        this.checkAllTeam = checkedCount === this.checkNumTeam.length;
        this.isIndeterminateTeam = checkedCount > 0 && checkedCount < this.checkNumTeam.length;
      },
      //重置
      resetOrganize() {
        this.checkedHiddenTeam = false
        this.organizerProduct = []
        this.chooseTeam.orgName = null
        this.organizeList = []
      },
      organizeSubmit() {
        this.checkedOrganize = []
        this.organizeList.map((res) => {
            var length = this.hasChooseOrganize.length
            for (var k = 0; k < length; k++) {
              if (res.id == this.hasChooseOrganize[k]) {
                this.checkedOrganize.push(res)
              }
            }
          }
        )
        console.log(this.checkedOrganize, '////*')
        this.formLabelAlign.excludeOrgIdArr = []
        this.formLabelAlign.excludeOrgIdArr = this.checkedOrganize
        this.checkedOrganize.forEach(item => {
          this.orgIdArr.push(item.id)
        })
        this.dialogVisibleTeam = false

      },
      getActivityAdd(val) {
        let types = 'ACTIVE'
        if (val == '产品类') {
          types = 'PRODUCT_COMMISSION'
        } else {
          types = 'ACTIVE'
        }
        const _this = this.formLabelAlign
        let params = {
          type: types,
          productType: 'EXCHANGE',
          activityName: _this.activityName,
          productIdArr: this.idArr.toString(),
          excludeOrgIdArr: this.orgIdArr.toString(),
          profitRate: _this.profitRate,
          startTimeStr: this.dateTimeStart ? this.dateTimeStart[0] : '',
          endTimeStr: this.dateTimeStart ? this.dateTimeStart[1] : '',
          remark: _this.remark,
        }
        activityAdd(params).then(res => {
          if (res.statusCode == 200) {
            this.resetbtn()
            this.$message({
              type: 'success',
              message: '操作成功！'
            })

          }
        })
      },
//产品类提交
      produnctActivityAdd() {
        const _this = this.formLabelAlign
        let params = {
          type: 'ACTIVE',
          productType: 'EXCHANGE',
          activityName: _this.activityName,
          productIdArr: this.idArr.toString(),
          excludeOrgIdArr: this.orgIdArr.toString(),
          profitRate: _this.profitRate,
          startTimeStr: this.dateTimeStart ? this.dateTimeStart[0] : '',
          endTimeStr: this.dateTimeStart ? this.dateTimeStart[1] : '',
          remark: _this.remark,
        }
        activityAdd(params).then(res => {
          if (res.statusCode == 200) {
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
            this.resetbtn()
          }

        })
      },
      async actCommissionInfo() {
        const id = this.$route.query.id
        const type = this.$route.query.type
        const status = this.$route.query.status
        const selectType = this.$route.query.selectType
        if(selectType == 'PRODUCT_COMMISSION'){
          this.radio1 ='产品类'
        }
        if(type == 3 && status === 'ONCHECK' ) {
          this.typestatus=true
        }
        if(type == 4){
          this.typesDetele=true
        }
        if (type == 1 || type == 3 || type == 4) {
          this.isDisable = true
          this.hideBtn=false
          this.radiodisabled=true
          let params = {
            activityId: id
          }
          activityInfo(params).then(data => {
            const res = data.data.data
            const _this = this.formLabelAlign
            _this.activityName = res.activityName
            _this.profitRate = res.profitRate
            _this.productIdArr = res.exchangeProducts
            _this.excludeOrgIdArr = res.excludeOrgs
            this.dateTimeStart=[]
            this.dateTimeStart.push(res.startTimeStr)
            this.dateTimeStart.push(res.endTimeStr)
            _this.remark = res.remark
            console.log(res, '//***999*', res.activityName)
          })
        }
      },
      getActivityPass(){
        const status = 'PASS'
        let params = {
          id:this.$route.query.id,
          status:status
        }
        activityAudit(params).then(data=>{
          if (data.statusCode == 200) {
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
            this.getBack()
          }
        })
      },
      getActivityRefused(){
        const id = this.$route.query.id
        const status = 'REFUSED'
        let params = {
          id:id,
          status:status
        }
        this.$confirm('确认驳回吗?', '提示', {
          type: 'warning'
        }).then(() => {
          activityAudit(params).then((data) => {
            this.$message({
              message: '驳回成功',
              type: 'warning'
            });
            this.getBack()
          });
        })
      },
      //废弃
      getActivityDelete(){
        let params={
          id: this.$route.query.id
        }
        this.$confirm('确认废弃吗?', '提示', {
          type: 'warning'
        }).then(() => {
          activityDelete(params).then((data) => {
            this.$message({
              message: '成功废弃',
              type: 'warning'
            },2000);
            this.getBack()
          });
        })
      }
    },
    mounted() {
      this.actCommissionInfo()
    }
  }
</script>

<style lang='scss'>
  .el-radio-button__orig-radio:disabled:checked+.el-radio-button__inner{
    background: #409EFF;
    color: #fff;
  }
  .el-radio-button__inner {
    width: 100%;
    border-color: #409EFF;
  }

  .el-radio-button {
    width: 50%;
  }

  .hasChoosed {
    min-height: 75px;
    max-height: 150px;
    border: 1px solid #CCCCCC;
    list-style: none;
    margin: 0 !important;
    padding: 5px 10px;
    box-sizing: border-box;
    overflow: hidden;
    overflow: scroll;
    li {
      width: 45%;
      margin-right: 4.5%;
      float: left;
    }
    span {
      color: #354052;
      font-size: 14px;
      font-family: PingFangSC-Regular;

    }
    .icon-img {
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .chooseProduct, .chooseOrgnize {
    margin-top: 12px;
  }

  .submit {
    min-width: 20%;
  }

  .back, .reset {
    min-width: 16%;
  }
</style>
