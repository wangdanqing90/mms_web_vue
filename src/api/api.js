/**
 * 2019/4/2
 *
 */

//  默认post请求 fetch(url,param,post)
// get fetch(url,param,get)



/**
 * 登陆接口
 * @param {*} param
 */

import {fetch} from './http'
import { debug } from 'util';


export const loginApi = (param) => {
  return fetch('/login', param);
}

/**
 * 权限管理接口
 * 角色维护： role
 * 用户维护： user
 */

export const userQuerySales = (param) => {
  return fetch('sales/querySales', param);
}
export const userQueryRoles = (param) => {
  return fetch('sales/queryRoles', param);
}
// 授权
export const roleAdd = (roleId, salesId) => {
  return fetch(`sales/roleAdd/${roleId}`, {salesId: salesId});
}
// 禁止授权
export const roleCancel = (roleId, salesId) => {
  return fetch(`sales/roleCancel/${roleId}`, {salesId: salesId});
}
// 重置密码
export const resetPassword = (param) => {
  return fetch(`sales/resetPassword`, param);
}
// 角色维护table
export const roleManageList = params => {
  return fetch('roleManage/roleList', {params: params}, {method: 'get'});
}
// 角色维护-新增角色
export const roleManageAddNew = params => {
  return fetch('roleManage/addNew', params);
}
// 角色维护-禁用
export const roleManageRoleDisable = (roleId) => {
  return fetch(`roleManage/${roleId}/roleDisable`, {}, {method: 'get'});
}
// 角色维护-启用
export const roleManageRoleEnable = (roleId) => {
  return fetch(`roleManage/${roleId}/roleEnable`, {}, {method: 'get'});
}
// 角色维护-禁止
export const roleManageCancelAuthority = (roleId, funcId) => {
  return fetch(`roleManage/${roleId}/cancelAuthority/${funcId}`, {}, {method: 'get'});
}
// 角色维护-禁止
export const roleManageAddAuthority = (roleId, funcId) => {
  return fetch(`roleManage/${roleId}/addAuthority/${funcId}`, {}, {method: 'get'});
}




// 业绩管理 > 业绩转移 > 根据组织查询
export const searchOrg = params => {
  return fetch(`performance/searchOrg`, params);
}
// 业绩管理 > 业绩转移 > 根据组织查询-人员
export const childSales = (id) => {
  return fetch(`performance/${id}/childSales`,{});
}
// 业绩管理 > 业绩转移 > 根据人员查询
export const transferSearchSales = (params) => {
  return fetch(`performance/searchSales`,params);
}
// 业绩管理 > 业绩转移 > 根据组织查询-提交
export const submitTransfer = (params) => {
  return fetch(`performance/submitTransfer`,params);
}
// 业绩管理 > 业绩转移 > 获取业绩转移人或接收人信息
export const getTransferInfo = (id) => {
  return fetch(`performance/${id}/getTransferInfo`, {}, {method: 'get'});
}
// 业绩管理 > 业绩转移 > 订单类型
export const getOrderTypes = () => {
  return fetch(`performance/getOrderTypes`, {}, {method: 'get'});
}
// 业绩管理 > 组织提成-树   salesOrg/treeList
export const treeList = (parentId) => {
  return fetch(`salesOrg/treeList?parentId=${parentId}`, {}, {method: 'get'});
}
// 业绩管理-组织提成-添加提成
export const orgrateAdd = (params) => {
  return fetch(`orgRate/add`, params);
}

// 组织结构-组织人员详情操作
export const childList = (id) => {
  return fetch(`salesOrg/${id}/childList`, {}, {method: 'get'});
}
// 组织结构-人员删除
export const deletePerson = (id) => {
  return fetch(`salesOrg/${id}/delete`, {}, {method: 'get'})
}
//  组织结构-取消负责人
export const cancelAdmin = (id) => {
  return fetch(`salesOrg/${id}/cancelAdmin`, {})
}
//  组织结构-负责人
export const updateToAdmin = (id) => {
  return fetch(`salesOrg/${id}/updateToAdmin`, {})
}
//  组织结构-禁用
export const invalid = (id) => {
  return fetch(`salesOrg/${id}/invalid`, {}, {method: 'get'})
}
//  组织结构-启用
export const open = (id) => {
  return fetch(`salesOrg/${id}/open`, {}, {method: 'get'})
}
//  组织结构 - 修改组织
export const editInfo = (id) => {
  return fetch(`salesOrg/${id}/editInfo`, {}, {method: 'get'})
}
//  组织结构-检测信息
export const checkName = (params) => {
  return fetch(`salesOrg/checkName`, params)
}
//  组织结构-提交修改
export const edit = (params) => {
  return fetch(`salesOrg/edit`, params)
}
//   组织结构 - 人员转移-人员搜索
export const transferChildSales = (id) => {
  return fetch(`salesOrg/${id}/childSales`, {}, {method: 'get'})
}
//  组织结构 - 人员转移-组织选择
export const getOrgs = (id, params) => {
  return fetch(`salesOrg/${id}/getOrgs`, params)
}
//  组织结构 - 人员转移-转移按钮
export const transferSales = (params) => {
  return fetch(`salesOrg/transferSales`, params)
}
//  组织结构 - 加入人员-查询人员
export const addGetSales = (id, params) => {
  return fetch(`salesOrg/${id}/getSales`, params)
}
//  组织结构 - 加入人员- 加入提交   ///////////////////
export const addRef = (params) => {
  return fetch(`salesOrg/addRef`, params)
}
//  组织结构 - 新建组织
export const addNew = (params) => {
  return fetch(`salesOrg/addNew`, params)
}






//操作记录-修改列表
export const roleManageEdit =(roleId) =>{
  return fetch(`roleManage/${roleId}/edit`, {}, {method: 'get'});
}


// 操作记录 > 业绩变更记录

export const  getPerformance = (params) => {
  return fetch('performance/list', {params: params}, {method:'get'})
}
// 操作记录 > 系统操作记录
export const getSysLogSearch= (params) => {
  return fetch('sysLog/search', params);
}
// 操作记录-获取条件搜索枚举下拉框
export const getSearchEnums= () => {
  return fetch('sysLog/getSearchEnums',{} ,{method: 'get'});
}
//操作记录-详情
export const sysLogDetails =(nowId) =>{
  return fetch(`sysLog/${nowId}/details`, {}, {method: 'get'});
}
//业绩转移审核
export const performanceTransferCheckSearch =(params) =>{
  return fetch(`performanceTransferCheck/search`, params);
}
// 下拉状态 -业绩转移审核
export const getCheckTypesStatus= () => {
  return fetch('salesTransferCheck/getCheckTypes',{} ,{method: 'get'});
}
// 详情 -业绩转移审核
export const performanceTransferCheckDetails =(id) =>{
  return fetch(`performanceTransferCheck/${id}/details/`, {}, {method: 'get'});
}
// 业绩审核通过
export const PerformanceAuditPass= (id) => {
  return fetch(`performanceTransferCheck/${id}/pass`,{});
}
// 业绩审核驳回
export const PerformanceAuditReject = (id) => {
  return fetch(`performanceTransferCheck/${id}/refuse`,{});
}
// 审核管理 > 人员组织调整审核
export const getSalesTransferCheckSearch = (params) =>{
  return fetch(`salesTransferCheck/search`,params);
}
//审核管理-业务类型下拉
export const getSalesTransferCheckType =()=>{
   return fetch(`salesTransferCheck/getCheckTypes`,{},{method:'get'})
}
// 审核管理 > 人员组织调整审核详情
export const salesTransferCheckDetails =(id) =>{
  return fetch(`salesTransferCheck/${id}/details/`, {}, {method: 'get'});
}
// 人员组织调整审核详情-通过
export const salesTransferCheckPass= (id) => {
  return fetch(`salesTransferCheck/${id}/pass`,{});
}
// 人员组织调整审核详情-驳回
export const salesTransferCheckRefuse= (id) => {
  return fetch(`performanceTransferCheck/${id}/refuse`,{});
}


// 审核管理 > 活动提成审核-table
export const getActivityList = (params) => {
  return fetch(`activity/list`, params);
}
// 审核管理 > 活动提成审核-批量审核
export const getActivityAudits = (params) => {
  return fetch(`activity/audits`, params);
}
// 审核管理 > 组织提成审核-table
export const getOrgList = (params) => {
  return fetch(`orgRate/checkList`, params);
}
// 审核管理 > 组织提成审核-通过
export const updateStatus = (params) => {
  return fetch('orgRate/updateStatus', params);
}
//产品补录
export const getProductEnumsPatch =() =>{
  return fetch(`product/getProductEnums`, {}, {method: 'get'});
}
//产品编辑
export const getProducteditInfo =(id) =>{
  return fetch(`product/${id}/editInfo`, {}, {method: 'get'});
}
export const getProductedit =(params) =>{
  return fetch(`product/edit`, params);
}
// 补录提交成功
export const submitFormCheckProCode = (value) => {
  return fetch(`product/checkProductCode`, value);
}

export const submitFormProductPach = (params) =>{
  return fetch('product/addNew',  params);

}
// 产品列表-销售列表下拉框
export const orderGetEnums = () => {
  return fetch('/order/getEnums', {}, {method: 'get'});
}
// 产品管理- 产品列表-销售列表下拉框
export const productGetProductEnums = () => {
  return fetch('/product/getProductEnums', {}, {method: 'get'});
}
// 产品管理-产品列表-table搜索
export const productSearch = (params) => {
  return fetch('/product/search', params);
}

// 产品管理-产品列表-table初始化
export const getProductList = (params) => {
  return fetch('/product/list', {params: params}, {method: 'get'});
}
// 销售订单管理管理 - 理财订单列表-table初始化
export const getOrderList = (params) => {
  return fetch('/order/list', {params: params}, {method: 'get'});
}
// 销售订单管理管理 - 理财订单列表-table搜索
export const orderSearch = (params) => {
  return fetch('/order/search', params);
}

//订单补录
// 下拉
export const orderPatchSelect = () => {
  return fetch('/order/getEnums', {}, {method: 'get'});
}
// 订单补录 -产品编号
export const getOrderListProductNum = (params) => {

  return fetch('/order/getProduct', params);
}
// 订单补录 -提交
export const submitFormOrderPach = (params) =>{
  return fetch('order/addNew',  params);
}
//组织审核
export const organizCheckSelect=() =>{
  return fetch('orgCheck/getCheckTypes',{},{method:'get'});
}
export const organizCheckSearch= (params) =>{
  return fetch('orgCheck/search', params);
}
export const organizCheckDetails=(id) =>{
  return fetch(`orgCheck/${id}/details`,{},{method:'get'});
}
// 组织审核-通过
export const orgCheckCheckPass= (id) => {
  return fetch(`orgCheck/${id}/pass`,{});
}
// 组织审核-驳回
export const orgCheckCheckRefuse= (id) => {
  return fetch(`orgCheck/${id}/refuse`,{});
}

//组织与人员管理 > 人员列表
export const managementList=(params) =>{
  return fetch('sales/querySales', params);
}
export const managementLeave=(params) =>{
  return fetch('sales/modifyStatus', params);
}
export const managementEdit=(params) =>{
  return fetch('sales/modifySales', params);
}
export const managementInfo=(params) =>{
  return fetch('sales/info', params);
}
export const managementAdd=(params) =>{
  return fetch(`sales/addSales`, params);
}
// 员工业绩统计
export const getStaffPerformance=(params) => {
  return fetch(`sales/getStaffPerformance`, params);
}
//修改密码
export const salesChangePassword=(params) => {
  return fetch(`sales/changePassword`, params);
}
//修改用户信息
export const salesModifySales=(params) => {
  return fetch(`sales/modifySales`, params);
}


//活动提成
export const activityOutSystemEnum=()=>{
  return fetch(`activity/outSystemEnum`, {});
}
export const activityProductList=(params)=>{
  return fetch(`activity/productList`, params);
}
export const performanceSearchOrg=(params) =>{
  return fetch(`performance/searchOrg`,params)
}
export const activityAdd=(params) =>{
  return fetch(`activity/add`,params)
}
//详情 复核 废弃
export const activityInfo=(params) =>{
  return fetch(`activity/info`,params)
}
export const activityAudit=(params) =>{
  return fetch(`activity/audit`,params)
}

export const activityDelete=(params) =>{
  return fetch(`activity/delete`,params)
}
