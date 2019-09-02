import * as types from './mutation-types'

export const clearState = function({ commit }) {
  Object.keys(types).forEach(key => {
    if (key.indexOf('_0') !== -1) {
      commit(types[key], '')
    }
    // key === 'SET_PAGE_NUM' ? commit(types[key], 1) : commit(types[key], '')
  })
}
