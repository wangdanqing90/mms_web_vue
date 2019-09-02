<template>
  <div class="layout">
    <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'64px':'180px'}">
      <el-menu
        background-color="#262935"
        text-color="#7F8FA4"
        active-text-color="#fff"
        class="menu-wrapper"
        router
        unique-opened
        :collapse="isCollapsed"
        :default-active="$route.path"
      >
        <div class="logo-wrapper" @click="$router.push({path: '/home'})">
          <img src="../../images/logo2.png">
          <span v-show="titleHide">营销管理平台</span>
        </div>
        <template v-for="(item, index) in sider_menu_data" :collapse="isCollapsed">
          <!-- 没有children -->
          <el-menu-item
            class="menu-item"
            style="padding-left: 0;font-size: 14px;"
            v-if="item.childMenuBOList.lenght<=0?true:false"
            :index="item.path"
            :key="index"
          >
            <template style="padding-left: 10px;text-indent: 0">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
          </el-menu-item>
          <!-- 有children -->
          <el-submenu v-else :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>

            <div
              class="menu-item"
              v-for="(sub_item, sub_index) in item.childMenuBOList"
              :index="sub_item.path"
              :key="sub_index"
            >
              <!-- 没有children -->
              <el-menu-item
                class="menu-item"
                :index="sub_item.path"
                :key="index"
              >
                <template slot="title">
                  <i :class="sub_item.icon"></i>
                  <span slot="title">{{sub_item.title}}</span>
                </template>
              </el-menu-item>
              <!-- 有children -->
              <!-- <el-submenu v-else :index="sub_item.path">
                <template slot="title">
                  <i :class="sub_item.icon"></i>
                  <span slot="title">{{sub_item.title}}</span>
                </template>
                <el-menu-item
                  class="menu-item"
                  v-for="(third_item, third_index) in item.childMenuBOList"
                  :index="third_item.path"
                  :key="third_index"
                >
                  <span slot="title" style="margin-left:12px;">{{third_item.title}}</span>
                </el-menu-item>
              </el-submenu> -->
            </div>
          </el-submenu>
          <!-- <el-submenu v-else :index="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item class="menu-item" v-for="(sub_item, sub_index) in item.children" :index="sub_item.path"
                          :key="sub_index">
              <span slot="title" style="margin-left:12px;">{{sub_item.title}}</span>
            </el-menu-item>
          </el-submenu>-->
        </template>
      </el-menu>
    </div>
    <div class="topbar-wrapper" :style="{left: this.isCollapsed?'64px':'180px'}">
      <div class="menu-collapse-wrapper float-left" @click="toggleMenu">
        <i
          class="el-icon-adm-menu"
          :style="{transform: 'rotateZ(' + (this.isCollapsed ? '90' : '0') + 'deg)'}"
        ></i>
      </div>
      <div class="title float-left">{{title || ''}}</div>
      <ul class="menu-list float-right">
        <li v-if="user" class="menu-item" style="padding: 0;">
          <el-dropdown
            :show-timeout="10"
            :hide-timeout="10"
            @command="handleCommand"
            trigger="click"
            style="padding: 0 15px;"
          >
            <div class="dropdown-content el-dropdown-link">
              <i class="icon el-icon-adm-usersetup"></i>
              <span class="text">{{user.userName}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="用户修改">用户修改</el-dropdown-item>
              <el-dropdown-item command="修改密码">修改密码</el-dropdown-item>
              <el-dropdown-item command="退出登录" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="menu-item" @click="exit">
          <i class="icon iconfont el-icon-adm-exit"></i>
        </li>
      </ul>
    </div>
    <div
      class="content-wrapper"
      ref="content-wrapper"
      :style="{left: this.isCollapsed?'64px':'180px'}"
    >
      <div class="content">
        <router-view @chanegTitle="chanegTitle"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { sessionStorage } from "src/assets/js/storage";
import str from "good-storage";
import { mapMutations } from "vuex";

export default {
  created() {
    // this.checkAuth();
  },
  data() {
    return {
      title: "",
      titleHide: true,
      sider_menu_data: [],
      // sider_menu_data: [
      //   {
      //     path: "/home",
      //     title: "首页",
      //     icon: "el-icon-adm-home"
      //   },
      //   {
      //     path: "/PrivilegeManagement",
      //     title: "权限管理",
      //     icon: "el-icon-adm-organization",
      //     children: [
      //       { path: "/PrivilegeManagement/RoleMaintenance", title: "角色维护" },
      //       { path: "/PrivilegeManagement/UserMaintenance", title: "用户维护" }
      //     ]
      //   },
      //   {
      //     path: "/organizationPerson",
      //     title: "组织与人员管理",
      //     icon: "el-icon-adm-linechart",
      //     children: [
      //       { path: "/organizationPerson/structure", title: "组织结构" },
      //       { path: "/organizationPerson/management", title: "人员列表" }
      //     ]
      //   },
      //   {
      //     path: "/performanceManagement",
      //     title: "业绩管理",
      //     icon: "el-icon-adm-statistics",
      //     children: [
      //       { path: "/performanceManagement/transfer", title: "业绩转移" },
      //       {
      //         path: "/performanceManagement/addActCommission",
      //         title: "活动提成"
      //       },
      //       { path: "/performanceManagement/orgRoyalty", title: "组织提成" },
      //       {
      //         path: "/performanceManagement/achievement",
      //         title: "员工业绩统计"
      //       }
      //     ]
      //   },
      //   {
      //     path: "/order",
      //     title: "销售订单管理",
      //     icon: "el-icon-adm-form",
      //     children: [
      //       { path: "/order/orderPatch", title: "订单补录" },
      //       { path: "/order/orderList", title: "理财订单列表" }
      //     ]
      //   },
      //   {
      //     path: "/product",
      //     title: "产品管理",
      //     icon: "el-icon-adm-project",
      //     children: [
      //       { path: "/product/productPatch", title: "产品补录" },
      //       { path: "/product/productList", title: "产品列表" }
      //     ]
      //   },
      //   {
      //     path: "/auditManagement",
      //     title: "审核管理",
      //     icon: "el-icon-adm-user",
      //     children: [
      //       { path: "/auditManagement/organizCheck", title: "组织审核" },
      //       { path: "/auditManagement/orgCheck", title: "组织提成审核" },
      //       { path: "/auditManagement/manCheck", title: "人员组织调整审核" },
      //       { path: "/auditManagement/royalty", title: "活动提成审核" },
      //       { path: "/auditManagement/perfCheck", title: "业绩转移审核" }
      //     ]
      //   },

      //   {
      //     path: "/operationNote",
      //     title: "操作记录",
      //     icon: "el-icon-adm-log",
      //     children: [
      //       { path: "/operationNote/transferRecord", title: "业绩变更记录" },
      //       { path: "/operationNote/systemRecord", title: "系统操作记录" }
      //     ]
      //   }
      // ],
      isCollapsed: false,
      adminMenuShow: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    chanegTitle(msg) {
      this.title = msg;
    },
    checkAuth() {
      let token = this.$store.state.token || sessionStorage.getItem("token");
      if (!token) {
        this.$router.replace("/login");
      } else {
        // this.getUser();
      }
    },
    //       getUser() {
    //         let User = {
    //           id: this.$store.state.id,
    //           salesId: this.$store.state.salesId,
    //           username: this.$store.state.username,
    //           phone: str.get('phone')
    //         };
    //         // debugger
    // //      this.$store.commit('SET_USER_INFO', User);
    // 				// this.SET_USER_INFO(User);
    //       },
    handleCommand(command) {
      if (command == "用户修改") {
        this.$router.replace({ path: "/userUpdate" });
      } else if (command == "修改密码") {
        this.$router.replace({ path: "/changePassword" });
      } else if (command == "退出登录") {
        this.exit();
      }
    },
    toggleMenu() {
      this.titleHide = !this.titleHide;
      this.isCollapsed = !this.isCollapsed;
    },
    exit() {
      this.$confirm("即将退出系统登陆，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$store.commit('SET_TOKEN_0', '');
          // this.$store.commit('SET_USER_ID_0', '');
          str.set("userId", "");
          str.set("token", "");
          // this.$store.commit('SET_USER_ID_0', '');
          this.SET_USER_INFO("");
          this.SET_USER_ID_0("");
          this.SET_TOKEN_0("");
          this.$router.replace({ path: "/login" });
        })
        .catch(() => {
          return false;
        });
    },
    initLeftData() {
      this.sider_menu_data = this.$store.state.user.func ||'';
      console.log(this.sider_menu_data,'---');
      this.shouNavList(this.sider_menu_data);
    },
    shouNavList(traget) {
      console.log(traget.length)
      if (traget.length <= 0) {
        this.$message.error('您没有登录或是权限不够哦');
        return false;
      }
      traget.forEach((item, index) => {
        item.title = item.funcName;
        if (item.funcId == "A000000000") {
          item.path = "/PrivilegeManagement";
          item.icon = "el-icon-adm-organization";
        }else if(item.funcId == "A000000001"){
          item.path = "/PrivilegeManagement/RoleMaintenance";
        }else if(item.funcId == "A000000002"){
          item.path = "/PrivilegeManagement/UserMaintenance";
        }else if(item.funcId == "B000000000"){
          item.path = "/organizationPerson";
          item.icon = "el-icon-adm-linechart";
        }else if(item.funcId == "B000000001"){
          item.path = "/organizationPerson/structure";
        }else if(item.funcId == "B000000002"){
          item.path = "/organizationPerson/management";
        }else if(item.funcId == "C000000000"){
          item.path = "/performanceManagement";
          item.icon = "el-icon-adm-statistics";
        }else if(item.funcId == "C000000001"){
          item.path = "/performanceManagement/transfer";
        }else if(item.funcId == "C000000002"){
          item.path = "/performanceManagement/addActCommission";
        }else if(item.funcId == "C000000003"){
          item.path = "/performanceManagement/orgRoyalty";
        }else if(item.funcId == "C000000005"){
          item.path = "/performanceManagement/achievement";
        }else if(item.funcId == "D000000000"){
          item.path = "/order";
          item.icon = "el-icon-adm-form";
        }else if(item.funcId == "D000000001"){
          item.path = "/order/orderPatch";
        }else if(item.funcId == "D000000002"){
          item.path = "/order/orderList";
        }else if(item.funcId == "E000000000"){
          item.path = "/product";
          item.icon = "el-icon-adm-project";
        }else if(item.funcId == "E000000001"){
          item.path = "/product/productPatch";
        }else if(item.funcId == "E000000002"){
          item.path = "/product/productList";
        }else if(item.funcId == "F000000000"){
          item.path = "/auditManagement";
          item.icon = "el-icon-adm-user";
        }else if(item.funcId == "F000000001"){
          item.path = "/auditManagement/organizCheck";
        }else if(item.funcId == "F000000002"){
          item.path = "/auditManagement/manCheck";
        }else if(item.funcId == "F000000003"){
          item.path = "/auditManagement/royalty";
        }else if(item.funcId == "F000000004"){
          item.path = "/auditManagement/perfCheck";
        }else if(item.funcId == "F000000005"){
          item.path = "/auditManagement/orgCheck";
        }else if(item.funcId == "G000000000"){
          item.path = "/operationNote";
          item.icon = "el-icon-adm-log";
        }else if(item.funcId == "G000000002"){
          item.path = "/operationNote/transferRecord";
        }else if(item.funcId == "G000000001"){
          item.path = "/operationNote/systemRecord";
        }

        if (item.childMenuBOList .length>0 ) {
          return this.shouNavList(item.childMenuBOList);
        } else {
          return false;
        }
      });
    },
    //  ...mapMutations(['SET_USER_ID_0','SET_USERINFO_SALESID', 'SET_USERINFO_NAME', 'SET_USER_INFO', 'SET_TOKEN_0'])
    ...mapMutations(["SET_USER_ID_0", "SET_USER_INFO", "SET_TOKEN_0"])
  },
  mounted() {
    window.vue = this;
    this.initLeftData();
  }
};
</script>
<style lang="scss">
@import "../../assets/styles/variable";
.siderbar-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: $siderbarWidth;
  z-index: 11;
  background-color: $siderbarBackgroundColor;
  transition: all 0.3s ease-in-out;

  .logo-wrapper {
    padding: 15px 0 20px 10px;
    white-space: nowrap;
    span {
      font-size: 18px;
      color: #ffffff;
      line-height: 18px;
      vertical-align: -5px;
      padding-left: 5px;
    }
    img {
      width: 30px;
      vertical-align: middle;
    }
  }
  .el-menu--collapse {
    .logo-wrapper {
      span {
        display: none;
      }
    }
    .el-tooltip {
      padding: 0 !important;
    }
  }
  .menu-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    border-right: none;
    transition: all 0.13s ease-in-out;

    &:not(.el-menu--collapse) {
      overflow-y: auto;
      overflow-x: hidden;
    }

    i {
      color: #7f8fa4;
    }

    .menu-item {
      font-size: 12px;
      height: 44px;
      line-height: 44px;
      text-indent: 5px;
      &.is-active,
      &:hover {
        /*background-color: #353F4F !important;*/
        background: none;
        color: #fff !important;
        i {
          color: #fff !important;
        }
      }
    }

    .el-submenu__title:hover {
      color: #65cea7 !important;

      i {
        color: #65cea7 !important;
      }
    }

    .el-submenu,
    .el-menu-item {
      width: 100%;
      /*min-width: 180px;*/
      padding-right: 0;

      line-height: 44px;
    }
  }
  .el-submenu__title {
    height: 50px;
    line-height: 50px;
    padding-left: 10px !important;
  }
}
.el-submenu.is-active .el-submenu__title {
  color: #fff !important;
  background: #131720 !important;
}
.el-submenu.is-active .el-submenu__title i {
  color: #fff !important;
}
.topbar-wrapper {
  position: fixed;
  left: $siderbarWidth;
  right: 0;
  top: 0;
  height: $topbarHeight;
  line-height: $topbarHeight;
  padding: 0 24px 0 0;
  background-color: $topbarBackgroundColor;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-in-out;
  z-index: 12;

  .menu-collapse-wrapper {
    height: 100%;
    width: 48px;
    text-align: center;
    cursor: pointer;

    i {
      transition: all 0.1s ease-in-out;
    }
  }

  .title {
    height: 100%;
    font-weight: bold;
  }

  .menu-list {
    .menu-item {
      position: relative;
      float: left;
      padding: 0 15px;
      min-width: 45px;
      height: 48px;
      text-align: center;
      font-size: 0px;

      &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
      }

      .icon {
        vertical-align: middle;
        font-size: 24px;
      }

      .text {
        display: inline-block;
        vertical-align: middle;
        margin-left: 4px;
        font-size: 16px;
      }
    }
  }
}

.content-wrapper {
  position: fixed;
  left: $siderbarWidth;
  right: 0;
  top: $topbarHeight;
  bottom: 0;
  padding: 16px;
  overflow: auto;
  transition: all 0.3s ease-in-out;
  // width: 100%;
  // height: 100%;

  .content {
    position: relative;
    // width: 100%;
    // height: 100%;
  }
}
</style>
