<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>产品补录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :label-position="labelPosition" :rules="rules"
             ref="formLabelAlign" size="medium " :inline-message="true" :model="formLabelAlign" class="New-elFrom ">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="产品编号(必填):" prop="proNum">
            <el-input v-model="formLabelAlign.proNum" placeholder="产品编号" :readonly="dissble"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品名称(必填):" prop="proName">
            <el-input v-model="formLabelAlign.proName" placeholder="产品名称" :readonly="dissble"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="存续期(天):" prop="proTime">
            <el-input v-model="formLabelAlign.proTime" placeholder="存续期" type="number"
                      :readonly="proTimeTrue"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年利率:(%/必填):" prop="proRate">
            <el-input controls-position="right" v-model="formLabelAlign.proRate"
                      placeholder="年利率" type="number" :readonly="dissble"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="起投金额(元/必填):" prop="minMonely">
            <el-input v-model="formLabelAlign.minMonely" placeholder="起投金额(元)" type="number"
                      :readonly="dissble"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售渠道:" prop="outerSystem">
            <el-select v-model="formLabelAlign.outerSystem" :disabled="dissble">
              <el-option
                v-for="item in outerSystemList"
                :key="item.code"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发行规模(元):" prop="proScale">
            <el-input v-model="formLabelAlign.proScale" placeholder="发行规模(元)" type="number"
                      :readonly="proScaleTrue"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间(必填):" prop="creatTime">
            <el-date-picker
              :readonly="dissble"
              v-model="formLabelAlign.creatTime"
              type="date"
              value-format="yyyy-MM-dd" format="yyyy-MM-dd"
              placeholder="创建时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="募集开始日期(必填):" prop="startTime">
            <el-date-picker
              :readonly="dissble"
              v-model="formLabelAlign.startTime"
              type="date"
              :picker-options="startTimeBefore"
              placeholder="募集开始日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="募集结束日期(必填):" prop="endTime">
            <el-date-picker
              :readonly="dissble"
              v-model="formLabelAlign.endTime"
              type="date"
              :picker-options="endTimeAfter"
              placeholder="募集结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="产品起息日(必填):" prop="proStartDate">
            <el-date-picker
              :readonly="dissble"
              v-model="formLabelAlign.proStartDate"
              type="date"
              :picker-options="proEndDateBefore"
              placeholder="起息日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品到期日(必填):" prop="proEndDate">
            <el-date-picker
              v-model="formLabelAlign.proEndDate"
              type="date"
              :readonly="dissble"
              :picker-options="proStartDateAfter"
              placeholder="到期日">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="还款方式:" prop="repayment">
            <el-select v-model="formLabelAlign.repayment" :disabled="dissble">
              <el-option
                v-for="item in repayMethodList"
                :key="item.code"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="风险类型:" prop="riskType">
            <el-select v-model="formLabelAlign.riskType" :disabled="dissble">
              <el-option
                v-for="item in riskTypeList"
                :key="item.code"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="投资最高份额:" prop="maxInvestAmount">
            <el-input v-model="formLabelAlign.maxInvestAmount" :readonly="maxInvestAmountTrue" placeholder="投资最高份额"
                      type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="兑付日(必填):" prop="honour">
            <el-date-picker
              v-model="formLabelAlign.honour"
              type="date"
              :readonly="dissble"
              placeholder="兑付日">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="产品状态:" prop="status">
            <el-select v-model="formLabelAlign.status" :disabled="dissble">
              <el-option
                v-for="item in statusList"
                :key="item.code"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="渠道来源:" prop="source">
            <el-input v-model="formLabelAlign.source" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="el-form-item__content-btn">
        <el-button type="primary" @click="EditBtn('formLabelAlign')" v-if="btnHide">确认修改</el-button>
        <el-button type="primary" @click="submitForm('formLabelAlign')" v-else>确认补录</el-button>
        <el-button @click="goPrev">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import {
    getProductEnumsPatch,
    submitFormProductPach,
    submitFormCheckProCode,
    getProducteditInfo,
    getProductedit
  } from '../../api/api'

  export default {
    data() {
      return {
        btnHide: false,
        labelPosition: 'top',
        outerSystemList: [],
        repayMethodList: [],
        riskTypeList: [],
        statusList: [],
        getTime: null,
        dissble: false,
        proTimeTrue: false,
        outerSystemTrue: false,
        proScaleTrue: false,
        maxInvestAmountTrue: false,
        formLabelAlign: {
          proNum: '',
          proName: '',
          proTime: '',
          proRate: '',
          minMonely: '',
          outerSystem: '',
          proScale: '',
          creatTime: '',
          startTime: '',
          endTime: '',
          proStartDate: '',
          proEndDate: '',
          repayment: '',
          maxInvestAmount: '',
          honour: '',
          status: '',
          source: '补录'
        },
        rules: {
          proNum: [{required: true, message: '请输入产品编号', trigger: 'blur'}],
          proName: [{required: true, message: '请输入产品名称', trigger: 'blur'}],
          proRate: [{required: true, message: '请输入年利率', trigger: 'blur'}],
          minMonely: [{required: true, message: '请输入起投金额', trigger: 'blur'}],
          creatTime: [{required: true, message: '请输入创建时间', trigger: 'change'}],
          startTime: [{required: true, message: '请输入募集开始日期', trigger: 'change'}],
          endTime: [{required: true, message: '请输入募集结束日期', trigger: 'change'}],
          proStartDate: [{required: true, message: '请输入产品起息日', trigger: 'change'}],
          proEndDate: [{required: true, message: '请输入产品到息日', trigger: 'change'}],
          honour: [{required: true, message: '请输入兑付日', trigger: 'blur'}],
        },
        startTimeBefore: {
          disabledDate: (time) => {
            let beginDateVal = this.formLabelAlign.endTime;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        proEndDateBefore: {
          disabledDate: (time) => {
            let proEndDate = this.formLabelAlign.proEndDate
            if (proEndDate) {
              return time.getTime() > proEndDate;
            }
          }
        },
        endTimeAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.formLabelAlign.startTime;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        proStartDateAfter: {
          disabledDate: (time) => {
            let proStartDate = this.formLabelAlign.proStartDate
            if (proStartDate) {
              return time.getTime() < proStartDate;
            }
          }
        },
      }
    },
    watch: {
      '$route': 'newpage'
    },
    methods: {
      goPrev() {
        this.$router.go(-1)
      },
      newpage() {
        this.resetForm('formLabelAlign')
        this.selectOptions()
        this.dissble = false
        this.btnHide = false
      },
//      下拉
      selectOptions() {
        getProductEnumsPatch().then(data => {
          let res = data.data
          this.outerSystemList = res.outerSystemList
          this.formLabelAlign.outerSystem = res.outerSystemList[0].code
          this.repayMethodList = res.repayMethodList
          this.formLabelAlign.repayment = res.repayMethodList[0].code
          this.riskTypeList = res.riskTypeList
          this.formLabelAlign.riskType = res.riskTypeList[0].code
          this.statusList = res.statusList
          this.formLabelAlign.status = res.statusList[0].code
        })
      },
      checkProCode(value) {
        var param = {
          productCode: value
        }
        return new Promise(function (resolve, reject) {
          submitFormCheckProCode(param).then(res => {
              if (res.statusCode === 200) {
                resolve("编号合法")
              } else {
                reject(res.message)
              }
            },
            err => {
              alert(err.message)
            }
          ).catch(function (error) {
            console.log(error, '9999')
          })
        })
      },

      async getProducteditInfo() {
        const type = this.$route.query.type
        if (type == 1) {
          this.dissble=true
          this.btnHide = true
          const data = await getProducteditInfo(this.$route.query.id)
          const res = data.data
          this.formLabelAlign = {
            proNum: res.productCode,
            proName: res.productName,
            proTime: res.durationDays,
            proRate: res.interestRate,
            minMonely: res.minInvestAmount,
            outerSystem: res.outerSystem,
            proScale: res.totalAmount,
            creatTime: res.createDate,
            startTime: res.raiseStartDate,
            endTime: res.raiseEndDate,
            proStartDate: res.valueDate,
            proEndDate: res.dueDate,
            repayment: res.repayMethod,
            riskType: res.riskType,
            maxInvestAmount: res.maxInvestAmount,
            honour: res.repayDate,
            status: res.status,
            source: res.isManual == 'true' ? '' : '补录'
          }
          if (res.durationDays == '' || res.durationDays == null) {
            console.log('111')
            this.proTimeTrue = false
          }  if (res.totalAmount == '' || res.totalAmount == null) {
            console.log('222')
            this.proScaleTrue = false
          }  if (res.maxInvestAmount == '' || res.maxInvestAmount == null) {
            console.log('333')
            this.maxInvestAmountTrue = false
          } else {
            this.proTimeTrue = true
            this.proScaleTrue = true
            this.maxInvestAmountTrue = true
            console.log(res.raiseEndDate.substring(0,10),'522222')
          }

        }


      },
      EditBtn(formName) {
        this.$refs[formName].validate((valid) => {
          const _this=this.formLabelAlign
          let params = {
            id:this.$route.query.id,
            productCode: _this.proNum,
            productName:_this.proName,
            durationDays: _this.proTime,
            interestRate: _this.proRate,
            minInvestAmount:_this.minMonely,
            outerSystem: _this.outerSystem,
            totalAmount: _this.proScale,
            createDate: _this.creatTime.substring(0,10),
            raiseStartDate: _this.startTime.substring(0,10),
            raiseEndDate: _this.endTime.substring(0,10),
            valueDate: _this.proStartDate.substring(0,10),
            dueDate:_this.proEndDate.substring(0,10),
            repayMethod: _this.repayment,
            maxInvestAmount:_this.maxInvestAmount,
            repayDate: _this.honour.substring(0,10),
            status: _this.status,
            isManual: true,
          }
          console.log(params,'----')
            getProductedit(params).then(res => {
              if (res.statusCode == 200) {
                this.$message({
                  message: '修改信息成功,数据平台管理系统!',
                  type: 'success'
                })
                this.$router.go(-1)
                this.$refs[formName].resetFields();
              } else {
                this.$message.error(res.message);
              }
            })

        }, (reason) => {
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var param = {
            productCode: this.formLabelAlign.proNum
          }
          console.log(valid, 1)
          if (valid) {
            this.checkProCode(this.formLabelAlign.proNum).then(res => {
              const _this=this.formLabelAlign
                let params = {
                  productCode: _this.proNum,
                  productName: _this.proName,
                  durationDays: _this.proTime,
                  interestRate: _this.proRate,
                  minInvestAmount: _this.minMonely,
                  outerSystem:_this.outerSystem,
                  totalAmount:_this.proScale,
                  createDate: _this.creatTime,
                  raiseStartDate:_this.startTime,
                  raiseEndDate:_this.endTime,
                  valueDate: _this.proStartDate,
                  dueDate:_this.proEndDate,
                  repayMethod:_this.repayment,
                  maxInvestAmount:_this.maxInvestAmount,
                  repayDate:_this.honour,
                  status:_this.status,
                  isManual: true,
                }
                submitFormProductPach(params).then(res => {
                  if (res.statusCode == 200) {
                    this.$message({
                      message: '添加成功!","数据管理平台',
                      type: 'success'
                    })
                    this.$refs[formName].resetFields();
                  } else {
                    $.alert(res.message);
                  }
                }, (reason) => {
                })
              },
              err => {
                console.log(err)
              }
            ).catch(function (error) {
              console.log(error, 'catch-错误')
            })
          } else {
            console.log(2);
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      this.selectOptions()
      this.getProducteditInfo()
    }
  }
</script>
