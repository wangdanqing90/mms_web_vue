// import { sessionStorage } from 'src/assets/js/storage';

// const mutations = {
//   SET_USER_ID_0 (state, user) {
//     state.user = user;
//     sessionStorage.setItem('user', user);
//   },
//   SET_TOKEN (state, token) {
//     state.token = token;
//     sessionStorage.setItem('token', token);
//   },
//   SET_ID (state, userId) {
//     state.userId = userId;
//     sessionStorage.setItem('userId', userId);
//   },
//   SET_FUNC (state, func) {
//     state.func = func;
//     sessionStorage.setItem('func', func);
//   }
// };

// export default mutations;

import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_INFO](state, user) {
    state.user = user
  },
  [types.SET_USER_ID_0](state, userId) {
    state.userId = userId
  },
  [types.SET_TOKEN_0](state, token) {
    state.token = token
  }
  // [types.SET_FUNC](state, func) {
  //   state.func = func
  // },
  // [types.SET_USERINFO_SALESID](state, salesId) {
  //   state.salesId = salesId
  // },
  // [types.SET_USERINFO_NAME](state, username) {
  //   state.username = username
  // }
}
export default mutations


