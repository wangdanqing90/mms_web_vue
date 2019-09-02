// 用户名，清除cook
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户密码修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :label-position="labelPosition"
      :show-message="false"
      :rules="rules"
      ref="formLabelAlign"
      size="medium "
      :model="formLabelAlign"
      :inline-message="true" class="New-elFrom "
    >
    <p class="el-titleText">密码修改</p>
      <el-row :gutter="20" class>
        <el-col :span="12" :offset="6">
          <el-form-item label="用户名:" prop="userName">
            <el-input v-model="formLabelAlign.userName" placeholder :readonly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" class>
        <el-col :span="12" :offset="6">
          <el-form-item label="老密码:" prop="oldPassword">
            <el-input v-model="formLabelAlign.oldPassword" placeholder="请输入老密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" class>
        <el-col :span="12" :offset="6">
          <el-form-item label="新密码:" prop="password">
            <el-input v-model="formLabelAlign.password" placeholder="请输入新密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20" class="margin-top-30">
        <el-col :span="12" :offset="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm('formLabelAlign')">修改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  salesChangePassword
} from "../../api/api";

export default {
  data() {
    return {
      labelPosition: "top",
      formLabelAlign: {
        userName: this.$store.state.user.userName,
        oldPassword: "",
        password: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入老密码", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入新密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.changePassWord(formName);
        } else {
          return false;
        }
      });
    },
    changePassWord(formName) {
      var param = {
        oldPassword: this.formLabelAlign.oldPassword,
        password: this.formLabelAlign.password
      };

      salesChangePassword(param).then(
        res => {
          if (res.statusCode == 200) {
            this.$alert("修改密码成功.请重新登录", "提示", {
              confirmButtonText: "确定",
              showClose: false,
              callback: action => {
          str.set('userId', '')
          str.set('token', '')
          this.SET_USER_INFO('')
           this.SET_USER_ID_0('');
          this.SET_TOKEN_0('');
                this.$router.replace({path: '/login'});
              }
            });
          } else {
            $.alert(res.message);
          }
        },
        reason => {}
      );
    }
  },
  computed: {},
  mounted() {
  }
};
</script>


<style scope>
</style>

