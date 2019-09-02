/**
 * @Project Name: vue-admin
 * @Author: luichooy
 * @Date: 2017-11-20 10:19
 * @Email: luichooy@163.com
 * @Idea: WebStorm
 */

// export function formatDate (date, fmt) {
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
//   }
//   const o = {
//     'M+': date.getMonth() + 1,
//     'd+': date.getDate(),
//     'h+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds()
//   };
//   for (let k in o) {
//     if (new RegExp(`(${k})`).test(fmt)) {
//       let str = o[k] + '';
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
//     }
//   }
//   return fmt;
// };
//
//
// function padLeftZero (str) {
//   return ('00' + str).substr(str.length);
// }


import vue from 'vue'

var common = {
  // * 状态转换
convertStatus: function(code) {
    switch(code.status) {
      case 'ONCHECK':
        return '待审核';
      case 'PASS':
        return '通过';
      case 'REFUSED':
        return '驳回';
      case 'INVALID':
        return '废弃';
      default:
        return ''
    }
  },
  // 类型
  convertType: function(code) {
    switch(code.type) {
      case 'JOIN':
        return '加入组织';
      case 'TRANSFER':
        return '转移组织';
      case 'REMOVE':
        return '移除';
      case 'IMPORT':
        return '员工组织关系导入';
      default:
        return ''
    }
  },
   // 类型
   convertActOrPro: function(code) {
    switch(code.type) {
      case 'ACTIVE':
        return '活动';
      case 'PRODUCT_COMMISSION':
        return '产品';
      default:
        return ''
    }
   },
  // 组织类型
  organizType: function(code) {
    switch(code.type) {
      case 'ADD':
        return '新增';
      case 'OPENED':
        return '启用';
      case 'INVALID':
        return '禁用';
      case 'IMPORT':
        return '导入';
      default:
        return ''
    }
  },
   // 判断是否为空
  isNullOrBlank: function(strJudge) {
    return strJudge === null || strJudge === undefined || strJudge === '';
  },
  // 计算两个日期时间差
  DateDiff: function(sDate1, sDate2) {   // sDate1和sDate2是2002-12-18格式
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split('-')
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    aDate = sDate2.split('-')
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
    return iDays
  },
  errorHandle:function (result, successFunc,failFunc) {
  if (result && result.statusCode == 200) {
    successFunc && successFunc()
  }
  else {
    this.$message.error((result && result.message) || '接口错误')
  }
}
}

export default common
