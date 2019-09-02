<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>组织与人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{subTitle}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :label-position="labelPosition" :inline-message="true" :rules="rules" ref="formLabelAlign" size="medium "
             :model="formLabelAlign">
      <p class="el-titleText">订单信息</p>
      <el-row :gutter="20">
        <el-col :span="12"  >
          <el-form-item label="系统编号:" prop="usernumber">
            <el-input v-model="formLabelAlign.usernumber" placeholder="系统编号"  :disabled="forbidden"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="员工编号:" prop="salesNum">
            <el-input v-model="formLabelAlign.salesNum" placeholder="员工编号"  :disabled="inputStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="员工姓名(必填):" prop="salesName">
            <el-input v-model="formLabelAlign.salesName" placeholder="员工姓名" :disabled="inputStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位名称:" prop="position">
            <el-select v-model="formLabelAlign.position" :disabled="inputStatus">
            <el-option
              v-for="item in positionNameList"
              :key="item.value"
              :label="item.label"
              :readonly="inputStatus"
              :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="formLabelAlign.email" placeholder="邮箱" :disabled="inputStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码(必填):" prop="phoneNo">
            <el-input v-model="formLabelAlign.phoneNo" placeholder="手机号码" :disabled="inputStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="证件类型:" prop="idType">
            <el-select v-model="formLabelAlign.idType" :disabled="inputStatus">
              <el-option value="I" label="身份证" key="I"></el-option>
              <el-option value="T" label="临时身份证" key="T"></el-option>
              <el-option value="S" label="士兵证" key="S"></el-option>
              <el-option value="B" label="军官证" key="B"></el-option>
              <el-option value="P" label="护照" key="P"></el-option>
              <el-option value="L" label="营业执照" key="L"></el-option>
              <el-option value="O" label="其他有效证件" key="O"></el-option>
              <el-option value="R"  label="户口簿" key="R"></el-option>
              <el-option value="H" label="港澳居民来往内地通行证" key="H"></el-option>
              <el-option value="W" label="台湾同胞来往内地通行证" key="W"></el-option>
              <el-option value="F" label="外国人居留证" key="F"></el-option>
              <el-option value="C" label="警官证" key="C"></el-option>
              <el-option value="V" label="香港身份证" key="V"></el-option>
              <el-option value="X" label="澳门身份证" key="X"></el-option>
              <el-option value="Y" label="台湾身份证" key="Y"></el-option>
              <el-option value="Z" label="其他证件" key="Z"></el-option>
              >
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码(必填):" prop="idNumber">
            <el-input v-model="formLabelAlign.idNumber" placeholder="证件号码" :disabled="inputStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="入职时间:" prop="entryDate">
            <el-date-picker
              v-model="formLabelAlign.entryDate"
              type="date"
              format="yyyy-MM-dd"
              placeholder="入职时间" :disabled="inputStatus">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄:" prop="age">

            <el-input v-model="formLabelAlign.age" placeholder="年龄" :disabled="inputStatus"></el-input>
          </el-form-item>
            </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="在职状态:" prop="status">
            <el-select v-model="formLabelAlign.status" :disabled="inputStatus">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :readonly="inputStatus"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="毕业院校:" prop="graUniversity">
            <el-input v-model="formLabelAlign.graUniversity" placeholder="毕业院校" :disabled="inputStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="最高学历:" prop="maxEducation">
            <el-select v-model="formLabelAlign.maxEducation" :disabled="inputStatus">
              <el-option
                v-for="item in maxEducationoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最高学位:" prop="maxDegree">
            <el-input v-model="formLabelAlign.maxDegree" placeholder="最高学位" :disabled="inputStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="获奖经历:" prop="awardExperie">
            <el-input type="textarea" :disabled="forbidden" :rows="2" v-model="formLabelAlign.awardExperie" placeholder="获奖经历"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="擅长领域:" prop="adeptDomain">
            <el-input type="textarea" :disabled="forbidden" :rows="2" v-model="formLabelAlign.adeptDomain" placeholder="擅长领域"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="el-form-item__content-btn">
        <el-button type="primary" @click="managementEditBtn('formLabelAlign')"  v-show="btnHide">确认</el-button>
        <el-button type="primary" @click="managementAddBtn('formLabelAlign')"  v-show="btnAddHide">确认增加</el-button>
        <el-button @click="goPrev">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
  .el-form--label-top .el-form-item__label {
    padding: 0;
    line-height: 30px;
    font-size: 12px;
    color: #7F8FA4;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form {
    padding: 10px;
    background: #fff;
  }
  .el-form-item__content-btn {
    text-align: center;
    padding: 20px 0 10px;
  }
  .el-select {
    display: block;
  }
  .el-input-number .el-input__inner{
    text-align: left;
  }
  .el-date-editor.el-input, .el-input-number--medium {
    width: 100%;
  }
  .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner{
    color: #666;
  }
</style>
<script>
  import {managementInfo, managementEdit,managementAdd} from '../../api/api'
  import {phone,Email} from '../../utils/formValidator'
  var validPhone = (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入电话号码'))
    } else if (!phone(value)) {
      callback(new Error('请输入正确的11位手机号码'))
    } else {
      callback()
    }
  }
  var validEmail = (rule, value, callback) => {
    if(value !='' && !Email(value)){
        callback(new Error('请输入正确的邮箱格式'))
    }
    else{
      console.log(rule,'100')
      callback();
    }
  }

  export default {
    data() {
      return {
        labelPosition: 'top',
        inputStatus:false,
        subTitle:'人员新增',
        btnHide:false,
        forbidden:false,
        btnAddHide:true,
        positionNameList:[
          {value: 'A',label: '助理财富经理'},
          {value: 'B',label: '财富店长'},
          {value: 'C',label: '财富经理'},
          {value: 'D',label: '直营团队负责人'},
          {value: 'E',label: '高级财富经理'},
          {value: 'F',label: '渠道经理'},
          {value: 'G',label: '储备团队负责人'},
          {value: 'H',label: '储备店长'},
        ],
        statusList: [
          {value: 'Z', label: '在职'},
          {value: 'L', label: '离职'}],
        maxEducationoptions:[
          {value: 'A',label: '大学本科'},
          {value: 'B',label: '大专'},
          {value: 'C',label: '硕士研究生'},
          {value: 'D',label: '博士研究生'},
          {value: 'E',label: '高中'}],
        formLabelAlign: {
          usernumber: '',
          salesName: '',
          salesNum:'',
          positionName: '',
          position:'',
          email: '',
          phoneNo: '',
          idNumber: '',
          entryDate: '',
          age: '',
          status: 'Z',
          graUniversity: '',
          maxEducation: '',
          maxDegree: '',
          awardExperie: '',
          adeptDomain: '',
          qrCode :'',
          adeptDomain :''
        },
        rules: {
          phoneNo: [{required: true, trigger: 'blur', validator: validPhone}],
          email:[{trigger:'blur',required: false,  validator:validEmail,}],
          salesName: [{required: true, trigger: 'blur', message:'请输入员工姓名'}],
          salesNum: [{required: true, trigger: 'blur', message:'请输入员工编号'}],
          idNumber:[{required: true, trigger: 'blur', message:'请输对应的证件号码'}]
        },

      }
    },
    methods:{

      goPrev(){
        this.$router.go(-1)
      },
      getManagementDetail() {
        let param = {
          salesId : this.$route.query.id
        }
        let type =this.$route.query.type
        let formLabel = this.formLabelAlign
        if(type == 1) {
          this.btnAddHide=false
          this.inputStatus=true
          this.forbidden = true
          this.subTitle='人员详情'
        }
        if(type ==2) {
          this.forbidden = true
          this.btnHide=true
          this.btnAddHide=false
          this.subTitle='人员修改'
        }
        if(type == 1 || type == 2 ) {
          managementInfo(param).then(data =>{
           if(data.statusCode === 200 && data.data.length !=0) {
             let res = data.data
             formLabel.usernumber = res.salesCode
             formLabel.salesName = res.salesName
             formLabel.salesNum= res.salesNum
             formLabel.position = res.position
             formLabel.email = res.email
             formLabel.age = res.age
             formLabel.phoneNo = res.phoneNo
             formLabel.idType = res.idType
             formLabel.idNumber = res.idNumber
             formLabel.entryDate = res.entryDate
             formLabel.status = res.statusName=='在职'? 'Z':'L'
             formLabel.graUniversity = res.graUniversity
             formLabel.maxEducation = res.maxEducation
             formLabel.maxDegree = res.maxDegree
             formLabel.awardExperie = res.awardExperie
             formLabel.adeptDomain = res.adeptDomain
             formLabel.qrCode =res.qrCode
             formLabel.adeptDomain =res.adeptDomain
           }
          }, (reason) => {
          })
        }
      },
      managementEditBtn(formName) {
        let _this = this.formLabelAlign
        let param = {
          salesId: this.$route.query.id,
          salesName: _this.salesName,
          salesNum: _this.salesNum,
          phoneNo: _this.phoneNo,
          idType: _this.idType,
          idNumber: _this.idNumber,
          status: _this.status,
          position: _this.position,
          email: _this.email,
          Age: _this.age,
          entryDate: _this.entryDate,
          graUniversity: _this.graUniversity,
          maxEducation: _this.maxEducation,
          maxDegree: _this.maxDegree,
          awardExperie: _this.awardExperie,
          adeptDomain: _this.adeptDomain,
          qrCode :'',
          adeptDomain :''
        }
        console.log(param,'999')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            managementEdit(param).then(res => {
              if (res.statusCode == 200) {
                this.$message({
                  message: '修改用户信息成功,数据平台管理系统!',
                  type: 'success'
                })
                this.$router.go(-1)
                this.$refs[formName].resetFields();
              } else {

                this.$message.error(res.message);
              }
            }, (reason) => {
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      managementAddBtn(formName) {
        let _this = this.formLabelAlign
        let param = {
          salesId: this.$route.query.id,
          salesName: _this.salesName,
          phoneNo: _this.phoneNo,
          idType: _this.idType,
          idNumber: _this.idNumber,
          status: _this.status,
          position: _this.positionName,
          email: _this.email,
          Age: _this.age,
          entryDate: _this.entryDate,
          graUniversity: _this.graUniversity,
          maxEducation: _this.maxEducation,
          maxDegree: _this.maxDegree,
          awardExperie: _this.awardExperie,
          adeptDomain: _this.adeptDomain,
          qrCode :'',
          adeptDomain :''
        }
        this.$refs[formName].validate((valid) => {
            if (valid) {
              managementAdd(param).then(res => {
                if (res.statusCode == 200) {
                  this.$message({
                    message: '添加成功,数据平台管理系统!',
                    type: 'success'
                  })
                  this.$router.go(-1)
                  this.$refs[formName].resetFields();
                } else {
                  this.$message.error(res.message);
                }
              }, (reason) => {
              })
            }
        })
      }
    },
    mounted() {
      this.getManagementDetail()
    }
  }
</script>
