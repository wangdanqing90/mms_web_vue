<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户信息修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :label-position="labelPosition"
      :rules="rules"
      ref="formLabelAlign"
      size="medium "
      :show-message="false"
      :inline-message="true"
      :model="formLabelAlign"
      class="New-elFrom"
    >
      <p class="el-titleText">用户信息</p>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="系统编号" prop="salesId">
            <el-input v-model="formLabelAlign.salesId" placeholder="订单编号" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="员工编号" prop="salesNum">
            <el-input v-model="formLabelAlign.salesNum" placeholder="员工编号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="员工姓名:" prop="salesName">
            <el-input v-model="formLabelAlign.salesName" placeholder="员工姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位名称:" prop="position">
            <el-select v-model="formLabelAlign.position">
              <el-option value="A" label="助理财富经理"></el-option>
              <el-option value="B" label="财富店长"></el-option>
              <el-option value="C" label="财富经理"></el-option>
              <el-option value="D" label="直营团队负责人"></el-option>
              <el-option value="E" label="高级财富经理"></el-option>
              <el-option value="F" label="渠道经理"></el-option>
              <el-option value="G" label="储备团队负责人"></el-option>
              <el-option value="H" label="储备店长"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="formLabelAlign.email" placeholder="邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码:" prop="phoneNo">
            <el-input v-model="formLabelAlign.phoneNo" placeholder="手机号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="证件类型:" prop="status">
            <el-select v-model="formLabelAlign.idType">
              <el-option value="I" label="身份证"></el-option>
              <el-option value="T" label="临时身份证"></el-option>
              <el-option value="S" label="士兵证"></el-option>
              <el-option value="B" label="军官证"></el-option>
              <el-option value="P" label="护照"></el-option>
              <el-option value="L" label="营业执照"></el-option>
              <el-option value="O" label="其他有效证件"></el-option>
              <el-option value="R" label="户口簿"></el-option>
              <el-option value="H" label="港澳居民来往内地通行证"></el-option>
              <el-option value="W" label="台湾同胞来往内地通行证"></el-option>
              <el-option value="F" label="外国人居留证"></el-option>
              <el-option value="C" label="警官证"></el-option>
              <el-option value="V" label="香港身份证"></el-option>
              <el-option value="X" label="澳门身份证"></el-option>
              <el-option value="Y" label="台湾身份证"></el-option>
              <el-option value="Z" label="其他证件"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码:" prop="idNumber">
            <el-input v-model="formLabelAlign.idNumber" placeholder="证件号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="入职时间:" prop="entryDate">
            <el-date-picker
              v-model="formLabelAlign.entryDate"
              type="date" placeholder="入职时间">
            </el-date-picker>
          </el-form-item>
        </el-col>


        <el-col :span="12">
          <el-form-item label="年龄:" prop="Age">
            <el-input v-model="formLabelAlign.Age" placeholder="年龄"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="在职状态:" prop="status">
            <el-select v-model="formLabelAlign.status">
              <el-option value="Z" label="在职"></el-option>
              <el-option value="L" label="离职"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="毕业院校:" prop="graUniversity">
            <el-input v-model="formLabelAlign.graUniversity" placeholder="毕业院校"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="最高学历:" prop="maxEducation">
            <el-select v-model="formLabelAlign.maxEducation">
              <el-option value="A" label="大学本科"></el-option>
              <el-option value="B" label="大专"></el-option>
              <el-option value="C" label="硕士研究生"></el-option>
              <el-option value="D" label="博士研究生"></el-option>
              <el-option value="E" label="高中"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最高学位:" prop="maxDegree">
            <el-input v-model="formLabelAlign.maxDegree" placeholder="最高学位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="获奖经历:" prop="awardExperie">
            <el-input type="textarea" v-model="formLabelAlign.awardExperie" placeholder="获奖经历"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="擅长领域:" prop="adeptDomain">
            <el-input type="textarea" v-model="formLabelAlign.adeptDomain" placeholder="擅长领域"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="el-form-item__content-btn">
        <el-button type="primary" @click="submitForm('formLabelAlign')">修改</el-button>
        <el-button @click="$router.replace({path: '/home'})">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { managementInfo,salesModifySales } from "../../api/api";
import { phone,Email } from "../../utils/formValidator";
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!phone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};

var validEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!Email(value)) {
    callback(new Error("请输入正确的邮箱"));
  } else {
    callback();
  }
};

export default {
  data() {
    return {
      labelPosition: "top",
      positionList: [],
      idTypeList: [],
      statusList: [],
      maxEducationList: [],
      disabled: true,
      dialogVisible: false,
      formLabelAlign: {
        salesId: "",
        salesNum: "",
        salesName: "",
        position: "",
        email: "",
        phoneNo: "",
        idType: "",
        idNumber: "",
        entryDate: "",
        Age: "",
        status: "",
        graUniversity: "",
        maxEducation: "",
        adeptDomain: "",
        awardExperie: "",
        maxDegree:''
      },
      rules: {
        salesNum: [{ required: true, message: "不能为空", trigger: "blur" }],
        salesName: [{ required: true, message: "不能为空", trigger: "blur" }],
        idNumber: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        phoneNo: [{ required: true, trigger: "blur", validator: validPhone }],
        email: [{ required: true, trigger: "blur", validator: validEmail }]
      }
    };
  },
  methods: {
    initUserInfo() {
      let param = {
        salesId: this.$store.state.user.salesId
      };
      managementInfo(param).then(
        data => {
          if (data.statusCode === 200 && data.data.length != 0) {
            let res = data.data;
            this.formLabelAlign.salesId = res.salesId;
            this.formLabelAlign.salesNum = res.salesNum;
            this.formLabelAlign.salesName = res.salesName;
            this.formLabelAlign.position = res.position;
            this.formLabelAlign.email = res.email;
            this.formLabelAlign.phoneNo = res.phoneNo;
            this.formLabelAlign.idType = res.idType;
            this.formLabelAlign.idNumber = res.idNumber;
            this.formLabelAlign.entryDate = res.entryDate;
            this.formLabelAlign.Age = res.age;
            this.formLabelAlign.status = res.status;
            this.formLabelAlign.maxEducation = res.maxEducation;
            this.formLabelAlign.adeptDomain = res.adeptDomain;
            this.formLabelAlign.awardExperie = res.awardExperie;
            this.formLabelAlign.maxDegree=res.maxDegree;
          }
        },
        reason => {}
      );
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        var param = {
          salesId: this.formLabelAlign.salesId,
          salesNum: this.formLabelAlign.salesNum,
          salesName:this.formLabelAlign.salesName,
          position: this.formLabelAlign.position,
          email: this.formLabelAlign.email,
          phoneNo: this.formLabelAlign.phoneNo,
          idType: this.formLabelAlign.idType,
          Age: this.formLabelAlign.Age,
          status: this.formLabelAlign.status,
          maxEducation: this.formLabelAlign.maxEducation,
          idNumber: this.formLabelAlign.idNumber,
          adeptDomain: this.formLabelAlign.adeptDomain,
          awardExperie: this.formLabelAlign.awardExperie,
          entryDate: this.formLabelAlign.entryDate,
          maxDegree: this.formLabelAlign.maxDegree
        };
        if (valid) {
          salesModifySales(param).then(
            res => {
              if (res.statusCode == 200) {
                this.$alert("修改用户信息成功", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {
                    this.$router.replace({path: '/home'});
                  }
                });
              } else {
                $.alert(res.message);
              }
            },
            reason => {}
          );
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.initUserInfo();
  }
};
</script>

<style scope="">
</style>
