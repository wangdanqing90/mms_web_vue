// const state = {
//   user: null,
//   token: '',
//   userId: '',
//   func: ''
// };

// export default state;


import storage from 'good-storage'
const state = {
  token: storage.get('token') ? storage.get('token') : '',
  userId: storage.get('userId') ? storage.get('userId') : '',
  user: storage.get('user') ? storage.get('user') : ''
  // user: ''
  // func: storage.get('func') ? storage.get('func') : '',
  // salesId: storage.get('salesId') ? storage.get('salesId') : '',
  // username: storage.get('username') ? storage.get('username') : ''
}

export default state
