/**
 * @Project Name: vue-admin
 * @Author: luichooy
 * @Date: 2018-01-17 15:01
 * @Email: luichooy@163.com
 * @Idea: WebStorm
 */

import Layout from 'src/pages/layout/layout';

// 不作为main组件子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('src/pages/login/login')
};



// 错误页面
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error'
  },
  component: () =>
    import('src/pages/error/index')
};

// 作为main组件子页面展示  但不在左侧菜单显示的路由卸载otherRoter里
export const otherRouter = {
  path: '',
  name: 'home',
  redirect: '/home',
  component: Layout,
  children: [
    {
      path: 'home',
      name: 'home_home',
      title: '首页',
      component: () => import('src/pages/home/home')
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      title: '修改密码',
      component: () => import('src/pages/home/changePassword')
    },
    {
      path: '/userUpdate',
      name: 'userUpdate',
      title: '用户修改',
      component: () => import('src/pages/home/userUpdate')
    }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/PrivilegeManagement',
    name: 'PrivilegeManagement',
    title: '权限管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'RoleMaintenance',
        name: 'PrivilegeManagement_RoleMaintenance',
        title: '角色维护',
        component: () => import('src/pages/PrivilegeManagement/RoleMaintenance')
      },
      {
        path: 'UserMaintenance',
        name: 'PrivilegeManagement_UserMaintenance',
        title: '用户维护',
        component: () => import('src/pages/PrivilegeManagement/UserMaintenance')
      }
    ]
  },
  {
    path: '/organizationPerson',
    name: 'organizationPerson',
    title: '组织与人员管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'structure',
        name: 'organizationPerson_structure',
        title: '组织结构',
        component: () => import('src/pages/organizationPerson/structure')
      },
      {
        path: 'management',
        name: 'organizationPerson_management',
        title: '人员列表',
        component: () => import('src/pages/organizationPerson/management')
      },
      {
        path: '/listDetail',
        name: 'listDetail',
        component: () => import('src/pages/organizationPerson/listDetail')
      }
    ]
  },
  {
    path: '/performanceManagement',
    name: 'performanceManagement',
    title: '业绩管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'transfer',
        name: 'performanceManagement_transfer',
        title: '业绩转移',
        component: () => import('src/pages/performanceManagement/transfer')
      }
      ,
      {
        path: 'addActCommission',
        name: 'performanceManagement_addActCommission',
        title: '活动提成',
        component: () => import('src/pages/performanceManagement/addActCommission')
      }
      ,
      {
        path: 'orgRoyalty',
        name: 'performanceManagement_orgRoyalty',
        title: '组织提成',
        component: () => import('src/pages/performanceManagement/orgRoyalty')
      }
      ,
      {
        path: 'achievement',
        name: 'performanceManagement_achievement',
        title: '员工业绩提成',
        component: () => import('src/pages/performanceManagement/achievement')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    title: '销售订单管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'orderPatch',
        name: 'order_orderPatch',
        title: '订单补录',
        component: () => import('src/pages/order/orderPatch')
      },
      {
        path: 'orderList',
        name: 'order_orderList',
        title: '理财订单列表',
        component: () => import('src/pages/order/orderList')
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    title: '产品管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'productPatch',
        name: 'product_productPatch',
        title: '产品补录',
        component: () => import('src/pages/product/productPatch')
      },  {
        path: 'productList',
        name: 'product_productList',
        title: '产品补录',
        component: () => import('src/pages/product/productList')
      }
    ]
  },
  {
    path: '/auditManagement',
    name: 'auditManagement',
    title: '审核管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'organizCheck',
        name: 'auditManagement_organizCheck',
        title: '组织审核',
        component: () => import('src/pages/auditManagement/organizCheck')
      },
      {
        path: 'orgCheck',
        name: 'auditManagement_orgCheck',
        title: '组织提成审核',
        component: () => import('src/pages/auditManagement/orgCheck')
      },
      {
        path: 'manCheck',
        name: 'auditManagement_manCheck',
        title: '人员组织调整审核',
        component: () => import('src/pages/auditManagement/manCheck')
      }, {
        path: 'royalty',
        name: 'auditManagement_royalty',
        title: '活动提成审核',
        component: () => import('src/pages/auditManagement/royalty')
      }, {
        path: 'perfCheck',
        name: 'auditManagement_perfCheck',
        title: '业绩转移审核',
        component: () => import('src/pages/auditManagement/perfCheck')
      }
    ]
  },

  {
    path: '/operationNote',
    name: 'operationNote',
    title: '操作记录',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'transferRecord',
        name: 'operationNote_transferRecord',
        title: '业绩变更记录',
        component: () => import('src/pages/operationNote/transferRecord')
      },
      {
        path: 'systemRecord',
        name: 'operationNote_systemRecord',
        title: '系统操作记录',
        component: () => import('src/pages/operationNote/systemRecord')
      }

    ]
  },

];

export const routers = [
  loginRouter,
  errorRouter,
  otherRouter,
  ...appRouter
];
