<template>
  <div class="login">
    <div class="middle-wrapper">
      <div class="title-wrapper">
        <!-- <img src="../../images/login.png"> -->
        <div class="title">营销管理平台</div>
      </div>
      <div class="login-form">
        <el-form ref="loginForm" :model="form" :rules="rules">
          <el-form-item prop="username" label="用户名:">
            <el-input v-model="form.username" placeholder="请输入账号">
              <i slot="prefix" class="el-input__icon el-icon-adm-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="登录密码:">
            <el-input :type="passwordType" v-model="form.password" placeholder="请输入密码">
              <!--<i slot="prefix" class="el-input__icon el-icon-adm-password"></i>
               <i slot="suffix" class="el-input__icon el-icon-view" style="cursor: pointer;"
              @click="_togglePasswordType"></i>-->
            </el-input>
          </el-form-item>

          <el-form-item label="记住我" prop="remember">
            <el-switch
              class="switchStyle"
              v-model="form.remember"
              active-text="YES"
              inactive-text="NO"
            ></el-switch>
          </el-form-item>

          <el-form-item style="margin-bottom: 0;">
            <el-col>
              <el-form-item>
                <el-button
                  type="primary"
                  class="login-btn"
                  style="width: 100%;"
                  @click="loginHandle('loginForm')"
                >立即登录</el-button>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import str from "good-storage";
import validateCode from "src/components/ValidateCode/index";
import { loginApi } from "../../api/api";

export default {
  created() {},
  data() {
    return {
      passwordType: "password",
      checkCode: "",
      form: {
        username: "",
        password: "",
        remember: true
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    initRemember() {
      let loginName = str.get("loginName", null);
      let password = str.get("password", null);
      if(!this.common.isNullOrBlank(password)){
        password = this.CryptoJS.AES.decrypt(password, "secretkey123");
        password = password.toString(this.CryptoJS.enc.Utf8);
      }
      console.log(password)
      this.form.username = loginName;
      this.form.password = password;
    },
    _setCheckCode(value) {
      this.checkCode = value;
    },
    // _togglePasswordType () {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = 'text';
    //   } else {
    //     this.passwordType = 'password';
    //   }
    // },
    loginHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        }
      });
    },
    login() {
      const param = {
        phone: this.form.username,
        password: this.form.password
      };
      // debugger
      loginApi(param).then(
        res => {
          console.log(res, "123");
          if (res.data.result) {
            this.$message({
              duration: 2000,
              message: "登录成功!",
              type: "success"
            });

            //记住我
            if (this.form.remember) {
              str.set("loginName", this.form.username);
              let psw = this.form.password;
              var cipherText = this.CryptoJS.AES.encrypt( psw,"secretkey123").toString();
              str.set("password", cipherText);
            } else {
              str.remove("loginName");
              str.remove("password");
            }

            let token = res.data.token;
            let userId = res.data.userId;
            str.set("userId", userId);
            str.set("token", token);
            // this.$store.commit('SET_TOKEN_0', res.token);
            // this.$store.commit('SET_USER_ID_0', res.userId);
            // this.$store.commit('SET_FUNC', res.func);
            // str.set('salesId', res.data.salesId)
            // str.set('userName', res.data.userName)
            let user = {
              // userId: res.data.userId,
              // token: res.data.token,
              func: res.data.funcs,
              salesId: res.data.salesId,
              userName: res.data.userName,
              phone: this.form.username
            };
            str.set("user", user)
            this.SET_USER_INFO(user);
            this.SET_TOKEN_0(token);
            this.SET_USER_ID_0(userId);
            // this.$router.replace('home');
            this.$router.push("/");
          } else {
            this.$message({
              duration: 2000,
              message: res.data.message,
              type: "error"
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    // ...mapMutations(['SET_TOKEN_0', 'SET_USER_ID_0', 'SET_FUNC','SET_USERINFO_SALESID', 'SET_USERINFO_NAME', 'SET_USER_INFO'])
    ...mapMutations(["SET_TOKEN_0", "SET_USER_ID_0", "SET_USER_INFO"])
  },
  components: {
    validateCode
  },
  mounted() {
    window.vue = this;
    this.initRemember();
  }
};
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url(../../images/bg-3.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: inherit;

  .middle-wrapper {
    position: absolute;
    width: 360px;
    height: 100%;
    box-sizing: border-box;
    padding-left: 24px;
    background: rgba(255, 255, 255, 0.74);
    border-radius: 2px;

    .title-wrapper {
      margin-top: 50px;
      margin-bottom: 30px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: black;
    }
    .login-form {
      position: relative;
      margin: 0 auto;
      width: 100%;
      padding: 30px 50px;
      box-sizing: border-box;
      border-radius: 5px;

      .el-row {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        .login-btn {
          width: 100%;
        }
      }

      .check-code-wrapper {
        display: flex;
        justify-content: space-between;
        height: 40px;
        .validate-code-wrapper {
          flex: 0 0 160px;
        }
      }
    }
  }
}
</style>


<style lang="scss" >
.login-form {
  //switch设置
  .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }
  /*打开时文字位置设置*/
  .el-switch__label--right {
    z-index: 1;
    right: -3px;
  }
  /*关闭时文字位置设置*/
  .el-switch__label--left {
    z-index: 1;
    left: 39px;
  }
  /*显示文字*/
  .el-switch__label.is-active {
    display: block;
  }
  .el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 70px !important;
  }
}
</style>