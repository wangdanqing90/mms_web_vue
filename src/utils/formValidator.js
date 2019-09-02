// export default {
//   install(Vue, options) {
//   var phone = (rule, value, callback) => {
//       let regFormat = /^[1][3578][0-9]{9}$/; //正确手机号
//       console.log(value, '------')
//       if (!value) {
//         return callback(new Error('不能为空'));
//       }
//       if (!(regFormat.test(value))) {
//         callback(new Error('请输入正确手机号'));
//       }
//       else {
//         callback();
//       }
//     }
//   }
// }
export function phone(str) {
  const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
  return reg.test(str)
  }


export function Email(str) {
  const reg =/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return reg.test(str)
}
